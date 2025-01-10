import { Suspense } from "react"
import { Metadata } from "next"
import { motion } from "framer-motion"

import { getStudents } from "@/components/teacher/students/_actions/getStudents"
import StudentsClient from "@/components/teacher/students"
import LoadingSkeleton from "./loading"

// Optional metadata
export const metadata: Metadata = {
  title: "Students",
  description: "Manage students in the AI Bootcamp or other courses",
}

export default async function StudentsPage() {
  // Fetch your students data on the server side (SSR)
  const students = await getStudents()

  return (
    // Suspense boundary can show a fallback skeleton while data loads
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
      <StudentsClient serverStudents={students} />
    </Suspense>
  )
}
