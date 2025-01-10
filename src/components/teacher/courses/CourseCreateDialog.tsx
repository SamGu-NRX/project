"use client"

import { FC, useState } from "react"
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

import type { Course } from "."

// The props for creating a new course
interface CourseCreateDialogProps {
  onCreate: (
    course: Omit<Course, "id" | "students" | "progress">
  ) => void
}

const CourseCreateDialog: FC<CourseCreateDialogProps> = ({ onCreate }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [bootcampName, setBootcampName] = useState("")
  const [session, setSession] = useState("")
  const [cohort, setCohort] = useState("")

  const handleCreate = () => {
    onCreate({
      title,
      description,
      bootcampName,
      session,
      cohort,
    })
    // Clear the fields
    setTitle("")
    setDescription("")
    setBootcampName("")
    setSession("")
    setCohort("")
  }

  return (
    <>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Course
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>
            Enter the details for the new course.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="bootcampName">Bootcamp Name</Label>
            <Input
              id="bootcampName"
              value={bootcampName}
              onChange={(e) => setBootcampName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="session">Session</Label>
            <Input
              id="session"
              value={session}
              onChange={(e) => setSession(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="cohort">Cohort</Label>
            <Input
              id="cohort"
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate}>Create Course</Button>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

export default CourseCreateDialog;
