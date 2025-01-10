"use client"

import { FC } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Trash } from "lucide-react"

import type { Course } from "."

interface CourseCardProps {
  course: Course
  onEdit: (course: Course) => void
  onView: (course: Course) => void
  onDelete: (id: number) => void
}

const CourseCard: FC<CourseCardProps> = ({ course, onEdit, onView, onDelete }) => {
  return (
    <Card className="p-4 space-y-2">
      <h3 className="font-semibold text-lg">{course.title}</h3>
      <p className="text-sm text-gray-500">Bootcamp: {course.bootcampName}</p>
      <p className="text-sm text-gray-500">Session: {course.session}</p>
      <p className="text-sm text-gray-500">Cohort: {course.cohort}</p>
      <p className="text-sm text-gray-500">Students: {course.students}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${course.progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-500">Progress: {course.progress}%</p>

      <div className="mt-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(course)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(course)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(course.id)}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </Card>
  )
}

export default CourseCard
