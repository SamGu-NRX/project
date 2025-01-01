// Dashboard types
export interface TodoItem {
  id: string;
  title: string;
  dueDate: string;
  type: "assignment" | "session";
  status: "pending" | "completed" | "overdue";
}

export interface CourseProgress {
  completed: number;
  total: number;
  nextSession: {
    title: string;
    id: string;
  };
}

export interface Session {
  id: string;
  title: string;
  description: string;
  isLocked: boolean;
  isCompleted: boolean;
  videoUrl?: string;
}

export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  type: "multiple_choice" | "file_upload" | "mixed";
  status: "draft" | "submitted" | "graded" | "returned";
  grade?: number;
}
