"use client"

import { FC, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus } from "lucide-react"

interface AddStudentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddStudent: (newStudent: {
    name: string
    email: string
    course: string
    enrollmentDate: string
  }) => void
}

const AddStudentDialog: FC<AddStudentDialogProps> = ({
  open,
  onOpenChange,
  onAddStudent,
}) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [course, setCourse] = useState("")
  const [enrollmentDate, setEnrollmentDate] = useState("")

  const handleAdd = () => {
    onAddStudent({ name, email, course, enrollmentDate })
    // Reset fields
    setName("")
    setEmail("")
    setCourse("")
    setEnrollmentDate("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Student
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Enter the details for the new student.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="course">Course</Label>
            <Input
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="enrollmentDate">Enrollment Date</Label>
            <Input
              id="enrollmentDate"
              type="date"
              value={enrollmentDate}
              onChange={(e) => setEnrollmentDate(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleAdd}>Add Student</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddStudentDialog
