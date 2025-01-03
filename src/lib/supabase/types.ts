export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: "student" | "teacher";
          created_at: string;
          updated_at: string;
          full_name: string | null;
        };
        Insert: {
          id: string;
          email: string;
          role?: "student" | "teacher";
          created_at?: string;
          updated_at?: string;
          full_name?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          role?: "student" | "teacher";
          created_at?: string;
          updated_at?: string;
          full_name?: string | null;
        };
      };
      course_progress: {
        Row: {
          id: string;
          user_id: string;
          module_id: string;
          completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          module_id: string;
          completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          module_id?: string;
          completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
