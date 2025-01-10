"use client"

import { FC } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ForumPost } from "."

interface ForumViewDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  post: ForumPost | null
}

const ForumViewDialog: FC<ForumViewDialogProps> = ({
  isOpen,
  onOpenChange,
  post,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{post?.title}</DialogTitle>
          <DialogDescription>View post details</DialogDescription>
        </DialogHeader>
        {post && (
          <div className="space-y-4">
            <div>
              <Label>Author</Label>
              <p>{post.author}</p>
            </div>
            <div>
              <Label>Date</Label>
              <p>{post.date}</p>
            </div>
            <div>
              <Label>Course</Label>
              <p>{post.course}</p>
            </div>
            <div>
              <Label>Content</Label>
              <p>{post.content}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ForumViewDialog
