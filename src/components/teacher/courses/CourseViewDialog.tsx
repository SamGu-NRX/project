"use client"

import { FC } from "react"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import type { Course } from "."

interface CourseViewDialogProps {
  course: Course
}

const CourseViewDialog: FC<CourseViewDialogProps> = ({ course }) => {
  return (
    <>
      {/* We do NOT provide <DialogTrigger> here because we handle it from the parent */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Course Details</DialogTitle>
          <DialogDescription>
            View course information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label>Title</Label>
            <p>{course.title}</p>
          </div>
          <div>
            <Label>Description</Label>
            <p>{course.description}</p>
          </div>
          <div>
            <Label>Bootcamp Name</Label>
            <p>{course.bootcampName}</p>
          </div>
          <div>
            <Label>Session</Label>
            <p>{course.session}</p>
          </div>
          <div>
            <Label>Cohort</Label>
            <p>{course.cohort}</p>
          </div>
          <div>
            <Label>Students</Label>
            <p>{course.students}</p>
          </div>
          <div>
            <Label>Progress</Label>
            <p>{course.progress}%</p>
          </div>
        </div>
      </DialogContent>
    </>
  )
}

export default CourseViewDialog
