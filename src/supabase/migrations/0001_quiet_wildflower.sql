-- /*
--   # Initial Schema Setup for AI BootCamp LMS

--   1. Tables
--     - users
--       - id (uuid, primary key)
--       - email (text, unique)
--       - role (enum: student/teacher)
--       - full_name (text)
--       - created_at (timestamp)
--       - updated_at (timestamp)
    
--     - course_progress
--       - id (uuid, primary key)
--       - user_id (uuid, foreign key)
--       - module_id (text)
--       - completed (boolean)
--       - created_at (timestamp)
--       - updated_at (timestamp)

--   2. Security
--     - Enable RLS on all tables
--     - Add policies for user data access
-- */

-- -- Create enum type for user roles
-- CREATE TYPE user_role AS ENUM ('student', 'teacher');

-- -- Create users table
-- CREATE TABLE IF NOT EXISTS users (
--   id uuid PRIMARY KEY REFERENCES auth.users(id),
--   email text UNIQUE NOT NULL,
--   role user_role DEFAULT 'student',
--   full_name text,
--   created_at timestamptz DEFAULT now(),
--   updated_at timestamptz DEFAULT now()
-- );

-- -- Create course_progress table
-- CREATE TABLE IF NOT EXISTS course_progress (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   user_id uuid REFERENCES users(id) ON DELETE CASCADE,
--   module_id text NOT NULL,
--   completed boolean DEFAULT false,
--   created_at timestamptz DEFAULT now(),
--   updated_at timestamptz DEFAULT now()
-- );

-- -- Enable Row Level Security
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE course_progress ENABLE ROW SECURITY;

-- -- Create policies for users table
-- CREATE POLICY "Users can view own profile"
--   ON users
--   FOR SELECT
--   USING (auth.uid() = id);

-- CREATE POLICY "Users can update own profile"
--   ON users
--   FOR UPDATE
--   USING (auth.uid() = id);

-- -- Create policies for course_progress table
-- CREATE POLICY "Users can view own progress"
--   ON course_progress
--   FOR SELECT
--   USING (auth.uid() = user_id);

-- CREATE POLICY "Users can update own progress"
--   ON course_progress
--   FOR ALL
--   USING (auth.uid() = user_id);

-- -- Create function to handle user creation
-- CREATE OR REPLACE FUNCTION handle_new_user()
-- RETURNS trigger AS $$
-- BEGIN
--   INSERT INTO public.users (id, email, role)
--   VALUES (new.id, new.email, 'student');
--   RETURN new;
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

-- -- Create trigger for new user creation
-- CREATE OR REPLACE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION handle_new_user();