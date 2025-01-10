import  { db } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { Student } from ".."

// Example server action for SSR
export async function getStudents(): Promise<Student[]> {
  // For example, if you need session checks:
  const supabase = await createClient();
  // const { data: { session } } = await supabase.auth.getSession()
  // if (!session) throw new Error("Not authenticated")

  // Suppose you have a "student" model/table in Prisma
  const allStudents = await db.student.findMany({
    orderBy: { name: "asc" },
  })

  // Return in the shape your UI expects
  return allStudents.map((s: Student) => ({
    id: s.id,
    name: s.name,
    email: s.email,
    course: s.course,
    enrollmentDate: s.enrollmentDate?.split("T")[0] ?? "",
    progress: s.progress ?? 0,
  }))
}
