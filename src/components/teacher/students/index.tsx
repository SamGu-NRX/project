"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import StudentCard from "./StudentCard"
import AddStudentDialog from "./AddStudentDialog"
import ViewStudentDialog from "./ViewStudentDialog"

export interface Student {
  id: number
  name: string
  email: string
  course: string
  enrollmentDate: string
  progress: number
}


interface StudentsClientProps {
  serverStudents: Student[]
}

export default function StudentsClient({ serverStudents }: StudentsClientProps) {
  const [students, setStudents] = useState<Student[]>(serverStudents)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null)

  // For adding a new student
  const handleAddStudent = (newStudent: Omit<Student, "id" | "progress">) => {
    const student: Student = {
      id: students.length + 1,
      progress: 0,
      ...newStudent,
    }
    setStudents((prev) => [...prev, student])
    setIsAddModalOpen(false)
  }

  // For opening the “view” modal
  const handleViewStudent = (student: Student) => {
    setCurrentStudent(student)
    setIsViewModalOpen(true)
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header + Add Dialog */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Students</h2>
        <AddStudentDialog
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onAddStudent={handleAddStudent}
        />
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onView={() => handleViewStudent(student)}
          />
        ))}
      </div>

      {/* View Dialog */}
      <ViewStudentDialog
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        student={currentStudent}
      />
    </motion.div>
  )
}
