"use client"

import { FC } from "react"
import type { Course } from "."
import CourseCard from "./CourseCard"

interface CourseGridProps {
  courses: Course[]
  viewType: "card" | "list" | "table"
  onEdit: (course: Course) => void
  onView: (course: Course) => void
  onDelete: (id: number) => void
}

const CourseGrid: FC<CourseGridProps> = ({
  courses,
  viewType,
  onEdit,
  onView,
  onDelete,
}) => {
  if (viewType === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEdit={onEdit}
            onView={onView}
            onDelete={onDelete}
          />
        ))}
      </div>
    )
  }

  // You can add your "list" or "table" render logic here
  // to accommodate different layouts.
  if (viewType === "list") {
    return (
      <div className="space-y-2">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-500">{course.bootcampName}</p>
            </div>
            <div className="space-x-2">
              {/* You can replicate the same action buttons here */}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (viewType === "table") {
    return (
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Bootcamp</th>
            <th className="p-2 text-left">Session</th>
            <th className="p-2 text-left">Cohort</th>
            <th className="p-2 text-left">Students</th>
            <th className="p-2 text-left">Progress</th>
            <th className="p-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b">
              <td className="p-2">{course.title}</td>
              <td className="p-2">{course.bootcampName}</td>
              <td className="p-2">{course.session}</td>
              <td className="p-2">{course.cohort}</td>
              <td className="p-2">{course.students}</td>
              <td className="p-2">{course.progress}%</td>
              <td className="p-2">
                {/* Action buttons: edit, view, delete */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  // Default fallback (shouldn't happen normally)
  return null
}

export default CourseGrid
