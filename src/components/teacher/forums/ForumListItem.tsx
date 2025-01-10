"use client"

import { FC } from "react"
import { Button } from "@/components/ui/button"
import { Flag, Lock, Unlock, MessageSquare } from "lucide-react"
import { ForumPost } from "."

interface ForumListItemProps {
  post: ForumPost
  onView: () => void
  onToggleFlag: (id: number) => void
  onToggleLock: (id: number) => void
}

const ForumListItem: FC<ForumListItemProps> = ({
  post,
  onView,
  onToggleFlag,
  onToggleLock,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div>
        <h3 className="font-semibold text-lg">{post.title}</h3>
        <p className="text-sm text-gray-500">
          Author: {post.author} | Date: {post.date} | Course: {post.course}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={onView}>
          <MessageSquare className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => onToggleFlag(post.id)}>
          <Flag className={`h-4 w-4 ${post.isFlagged ? "text-red-500" : ""}`} />
        </Button>
        <Button variant="outline" size="sm" onClick={() => onToggleLock(post.id)}>
          {post.isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}

export default ForumListItem
