"use client"

import { FC, useState, useEffect } from "react"
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Course } from "."

interface CourseEditDialogProps {
  course: Course
  onSave: (course: Course) => void
}

const CourseEditDialog: FC<CourseEditDialogProps> = ({ course, onSave }) => {
  // Local copies of the course fields
  const [localCourse, setLocalCourse] = useState<Course>(course)

  // If course changes externally, sync it
  useEffect(() => {
    setLocalCourse(course)
  }, [course])

  const handleSave = () => {
    onSave(localCourse)
  }

  return (
    <>
      {/* We do NOT provide <DialogTrigger> here because we handle it from the parent */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>Update the course details.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={localCourse.title}
              onChange={(e) =>
                setLocalCourse({ ...localCourse, title: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={localCourse.description}
              onChange={(e) =>
                setLocalCourse({ ...localCourse, description: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="edit-bootcampName">Bootcamp Name</Label>
            <Input
              id="edit-bootcampName"
              value={localCourse.bootcampName}
              onChange={(e) =>
                setLocalCourse({ ...localCourse, bootcampName: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="edit-session">Session</Label>
            <Input
              id="edit-session"
              value={localCourse.session}
              onChange={(e) =>
                setLocalCourse({ ...localCourse, session: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="edit-cohort">Cohort</Label>
            <Input
              id="edit-cohort"
              value={localCourse.cohort}
              onChange={(e) =>
                setLocalCourse({ ...localCourse, cohort: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

export default CourseEditDialog
