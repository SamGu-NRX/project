import { Metadata } from "next"
import { Suspense } from "react"
import { motion } from "framer-motion"

import CoursesClient from "@/components/teacher/courses"
import { getCourses } from "@/components/teacher/courses/_actions/getCourses"

import LoadingSkeleton from "./loading"

// Optionally define some meta tags, etc.
export const metadata: Metadata = {
  title: "Courses",
  description: "Manage your courses in the AI Bootcamp",
}

// This is your main entry point (Server Component)
export default async function CoursesPage() {
  // Fetch data on the server side via Prisma + Supabase
  const courses = await getCourses()

  return (
    // We can wrap the client component in Suspense to show
    // a skeleton if the fetching takes a bit
    <Suspense
      fallback={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <LoadingSkeleton />
        </motion.div>
      }
    >
      <CoursesClient serverCourses={courses} />
    </Suspense>
  )
}
