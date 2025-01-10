"use client"

import { FC } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { User, Eye } from "lucide-react"
import { Student } from "."

interface StudentCardProps {
  student: Student
  onView: () => void
}

const StudentCard: FC<StudentCardProps> = ({ student, onView }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center space-x-4">
        <User className="h-12 w-12 text-gray-400" />
        <div>
          <h3 className="font-semibold text-lg">{student.name}</h3>
          <p className="text-sm text-gray-500">{student.email}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Course: {student.course}</p>
        <p className="text-sm text-gray-500">Enrolled: {student.enrollmentDate}</p>
        <div className="mt-2">
          <Label className="text-sm text-gray-500">Progress</Label>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${student.progress}%` }}
            />
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {student.progress}%
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Button variant="outline" size="sm" onClick={onView}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </div>
    </Card>
  )
}

export default StudentCard
