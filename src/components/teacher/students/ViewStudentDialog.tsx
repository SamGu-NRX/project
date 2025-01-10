"use client"

import { FC } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Student } from "."

interface ViewStudentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: Student | null
}

const ViewStudentDialog: FC<ViewStudentDialogProps> = ({
  open,
  onOpenChange,
  student,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
        </DialogHeader>
        {student && (
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <p>{student.name}</p>
            </div>
            <div>
              <Label>Email</Label>
              <p>{student.email}</p>
            </div>
            <div>
              <Label>Course</Label>
              <p>{student.course}</p>
            </div>
            <div>
              <Label>Enrollment Date</Label>
              <p>{student.enrollmentDate}</p>
            </div>
            <div>
              <Label>Progress</Label>
              <p>{student.progress}%</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ViewStudentDialog
