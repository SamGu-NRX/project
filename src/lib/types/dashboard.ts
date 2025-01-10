// Dashboard types
import { AssignmentType, SubmissionStatus, AssignmentStatus } from "@prisma/client";

// processing if something is todo server-side, not storing in DB
// if an assignment is yet to be done, it is TODO
// currently, every assignment is a TODO --> URGENT FIX
export interface TodoItem {
  id: string;
  title: string;
  dueDate: string;
  type: "assignment" | "session";
  status: AssignmentStatus
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
  type: AssignmentType;
  status: SubmissionStatus;
  grade?: number;
}
