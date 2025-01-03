-- /*
--   # Enhanced Schema for AI BootCamp LMS

--   1. New Tables
--     - courses
--       - id (uuid, primary key)
--       - title (text)
--       - description (text)
--       - thumbnail_url (text)
--       - created_at, updated_at (timestamps)
    
--     - sessions
--       - id (uuid, primary key)
--       - course_id (uuid, foreign key)
--       - title (text)
--       - description (text)
--       - sequence_order (integer)
--       - video_url (text)
--       - is_published (boolean)
--       - created_at, updated_at (timestamps)
    
--     - assignments
--       - id (uuid, primary key)
--       - session_id (uuid, foreign key)
--       - title (text)
--       - instructions (text)
--       - type (enum)
--       - due_date (timestamp)
--       - max_score (integer)
--       - created_at, updated_at (timestamps)
    
--     - assignment_questions
--       - id (uuid, primary key)
--       - assignment_id (uuid, foreign key)
--       - question_text (text)
--       - order (integer)
--       - created_at, updated_at (timestamps)
    
--     - assignment_options
--       - id (uuid, primary key)
--       - question_id (uuid, foreign key)
--       - option_text (text)
--       - is_correct (boolean)
--       - created_at, updated_at (timestamps)
    
--     - submissions
--       - id (uuid, primary key)
--       - assignment_id (uuid, foreign key)
--       - student_id (uuid, foreign key)
--       - file_url (text)
--       - status (enum)
--       - grade (integer)
--       - feedback (text)
--       - submitted_at (timestamp)
--       - created_at, updated_at (timestamps)
    
--     - submission_answers
--       - id (uuid, primary key)
--       - submission_id (uuid, foreign key)
--       - question_id (uuid, foreign key)
--       - selected_option_id (uuid, foreign key)
--       - created_at (timestamp)
    
--     - certificates
--       - id (uuid, primary key)
--       - student_id (uuid, foreign key)
--       - course_id (uuid, foreign key)
--       - image_url (text)
--       - grade (integer)
--       - issued_at (timestamp)
--       - created_at (timestamp)
    
--     - session_progress
--       - id (uuid, primary key)
--       - student_id (uuid, foreign key)
--       - session_id (uuid, foreign key)
--       - completed_at (timestamp)
--       - created_at (timestamp)
    
--     - announcements
--       - id (uuid, primary key)
--       - course_id (uuid, foreign key)
--       - teacher_id (uuid, foreign key)
--       - title (text)
--       - content (text)
--       - created_at (timestamp)

--   2. Security
--     - Enable RLS on all tables
--     - Add policies for data access based on user roles
-- */

-- -- Create enums for various status types
-- CREATE TYPE assignment_type AS ENUM ('multiple_choice', 'file_upload', 'mixed');
-- CREATE TYPE submission_status AS ENUM ('draft', 'submitted', 'graded', 'returned');

-- -- Courses table
-- CREATE TABLE IF NOT EXISTS courses (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   title text NOT NULL,
--   description text,
--   thumbnail_url text,
--   created_at timestamptz NOT NULL DEFAULT now(),
--   updated_at timestamptz NOT NULL DEFAULT now()
-- );

-- -- Sessions/Lectures table
-- CREATE TABLE IF NOT EXISTS sessions (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
--   title text NOT NULL,
--   description text,
--   sequence_order integer NOT NULL,
--   video_url text,
--   is_published boolean DEFAULT false,
--   created_at timestamptz NOT NULL DEFAULT now(),
--   updated_at timestamptz NOT NULL DEFAULT now(),
--   UNIQUE(course_id, sequence_order)
-- );

-- -- Assignments table
-- CREATE TABLE IF NOT EXISTS assignments (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
--   title text NOT NULL,
--   instructions text,
--   type assignment_type NOT NULL,
--   due_date timestamptz,
--   max_score integer NOT NULL DEFAULT 100,
--   created_at timestamptz NOT NULL DEFAULT now(),
--   updated_at timestamptz NOT NULL DEFAULT now()
-- );

-- -- Assignment Questions table (for multiple choice)
-- CREATE TABLE IF NOT EXISTS assignment_questions (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   assignment_id uuid NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
--   question_text text NOT NULL,
--   order integer NOT NULL,
--   created_at timestamptz NOT NULL DEFAULT now(),
--   updated_at timestamptz NOT NULL DEFAULT now(),
--   UNIQUE(assignment_id, order)
-- );

-- -- Assignment Options table (answers for multiple choice)
-- CREATE TABLE IF NOT EXISTS assignment_options (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   question_id uuid NOT NULL REFERENCES assignment_questions(id) ON DELETE CASCADE,
--   option_text text NOT NULL,
--   is_correct boolean NOT NULL DEFAULT false,
--   created_at timestamptz NOT NULL DEFAULT now(),
--   updated_at timestamptz NOT NULL DEFAULT now()
-- );

-- -- Submissions table
-- CREATE TABLE IF NOT EXISTS submissions (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   assignment_id uuid NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
--   student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   file_url text,
--   status submission_status NOT NULL DEFAULT 'draft',
--   grade integer,
--   feedback text,
--   submitted_at timestamptz,
--   created_at timestamptz NOT NULL DEFAULT now(),
--   updated_at timestamptz NOT NULL DEFAULT now(),
--   CONSTRAINT valid_grade CHECK (grade IS NULL OR (grade >= 0 AND grade <= 100))
-- );

-- -- Submission Answers table (for multiple choice responses)
-- CREATE TABLE IF NOT EXISTS submission_answers (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   submission_id uuid NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
--   question_id uuid NOT NULL REFERENCES assignment_questions(id) ON DELETE CASCADE,
--   selected_option_id uuid NOT NULL REFERENCES assignment_options(id) ON DELETE CASCADE,
--   created_at timestamptz NOT NULL DEFAULT now(),
--   UNIQUE(submission_id, question_id)
-- );

-- -- Certificates table
-- CREATE TABLE IF NOT EXISTS certificates (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
--   image_url text NOT NULL,
--   grade integer NOT NULL,
--   issued_at timestamptz NOT NULL DEFAULT now(),
--   created_at timestamptz NOT NULL DEFAULT now(),
--   UNIQUE(student_id, course_id)
-- );

-- -- Session Progress table (for tracking completion and unlocking)
-- CREATE TABLE IF NOT EXISTS session_progress (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
--   completed_at timestamptz NOT NULL DEFAULT now(),
--   created_at timestamptz NOT NULL DEFAULT now(),
--   UNIQUE(student_id, session_id)
-- );

-- -- Announcements table
-- CREATE TABLE IF NOT EXISTS announcements (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
--   teacher_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   title text NOT NULL,
--   content text NOT NULL,
--   created_at timestamptz NOT NULL DEFAULT now()
-- );

-- -- Create indexes for better query performance
-- CREATE INDEX IF NOT EXISTS idx_sessions_course_order ON sessions(course_id, sequence_order);
-- CREATE INDEX IF NOT EXISTS idx_assignments_session ON assignments(session_id);
-- CREATE INDEX IF NOT EXISTS idx_submissions_student ON submissions(student_id);
-- CREATE INDEX IF NOT EXISTS idx_submissions_assignment ON submissions(assignment_id);
-- CREATE INDEX IF NOT EXISTS idx_session_progress_student ON session_progress(student_id);
-- CREATE INDEX IF NOT EXISTS idx_announcements_course ON announcements(course_id);

-- -- Enable Row Level Security
-- ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE assignment_questions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE assignment_options ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE submission_answers ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE session_progress ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- -- Create policies for courses
-- CREATE POLICY "Anyone can view published courses"
--   ON courses FOR SELECT
--   USING (true);

-- -- Create policies for sessions
-- CREATE POLICY "Anyone can view published sessions"
--   ON sessions FOR SELECT
--   USING (is_published = true);

-- CREATE POLICY "Teachers can manage sessions"
--   ON sessions FOR ALL
--   USING (
--     auth.uid() IN (
--       SELECT id FROM users 
--       WHERE role = 'teacher'
--     )
--   );

-- -- Create policies for submissions
-- CREATE POLICY "Students can view and create their own submissions"
--   ON submissions FOR ALL
--   USING (auth.uid() = student_id);

-- CREATE POLICY "Teachers can view all submissions"
--   ON submissions FOR SELECT
--   USING (
--     auth.uid() IN (
--       SELECT id FROM users 
--       WHERE role = 'teacher'
--     )
--   );

-- -- Create policies for session progress
-- CREATE POLICY "Students can view their own progress"
--   ON session_progress FOR SELECT
--   USING (auth.uid() = student_id);

-- CREATE POLICY "Students can update their own progress"
--   ON session_progress FOR INSERT
--   WITH CHECK (auth.uid() = student_id);

-- -- Create policies for announcements
-- CREATE POLICY "Anyone can view announcements"
--   ON announcements FOR SELECT
--   USING (true);

-- CREATE POLICY "Teachers can manage announcements"
--   ON announcements FOR ALL
--   USING (
--     auth.uid() IN (
--       SELECT id FROM users 
--       WHERE role = 'teacher'
--     )
--   );