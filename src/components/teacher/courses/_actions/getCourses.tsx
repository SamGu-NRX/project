import { db } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { Course } from ".."


// Example server action for fetching courses
export async function getCourses(): Promise<Course[]> {
  // For example, if you have a `courses` table in Prisma:
  // (Pseudo-code, adapt to your schema)
  const supabase = await createClient();

  // If you need user session checks, do it here.
  // const { data: { session } } = await supabase.auth.getSession()
  // if (!session) { /* handle not logged in */ }

  const allCourses = await db.course.findMany({
    orderBy: {
      title: "asc",
    },
  })

  // Return them in the shape your React components expect
  return allCourses.map((course: Course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    bootcampName: course.bootcampName,
    session: course.session,
    cohort: course.cohort,
    students: course.students,
    progress: course.progress,
  }))
}
