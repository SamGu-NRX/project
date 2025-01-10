export interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  type: "exit_ticket" | "quiz" | "test";
  course: string;
  totalSubmissions: number;
  gradedSubmissions: number;
  questions: AssignmentQuestion[];
}

export interface AssignmentQuestion {
  id: number;
  type: "multiple_choice" | "short_response" | "file_upload";
  question: string;
  options?: string[];
  correctAnswer?: string;
}

export interface Submission {
  id: number;
  studentName: string;
  submissionDate: string;
  status: "to_be_graded" | "graded" | "returned";
  score?: number;
  answers: SubmissionAnswer[];
}

export interface SubmissionAnswer {
  questionId: number;
  answer: string;
  score?: number;
  feedback?: string;
}
