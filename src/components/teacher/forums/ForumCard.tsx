"use client"

import { FC } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flag, Lock, Unlock, MessageSquare } from "lucide-react"
import { ForumPost } from "."

interface ForumCardProps {
  post: ForumPost
  onView: () => void
  onToggleFlag: (id: number) => void
  onToggleLock: (id: number) => void
}

const ForumCard: FC<ForumCardProps> = ({
  post,
  onView,
  onToggleFlag,
  onToggleLock,
}) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
      <p className="text-sm text-gray-500 mb-1">Author: {post.author}</p>
      <p className="text-sm text-gray-500 mb-1">Date: {post.date}</p>
      <p className="text-sm text-gray-500 mb-4">Course: {post.course}</p>
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={onView}>
          <MessageSquare className="mr-2 h-4 w-4" />
          View
        </Button>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => onToggleFlag(post.id)}>
            <Flag className={`h-4 w-4 ${post.isFlagged ? "text-red-500" : ""}`} />
          </Button>
          <Button variant="outline" size="sm" onClick={() => onToggleLock(post.id)}>
            {post.isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ForumCard
