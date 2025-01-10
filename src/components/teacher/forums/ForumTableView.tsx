"use client"

import { FC } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Flag, Lock, Unlock, MessageSquare } from "lucide-react"
import { ForumPost } from "."
import { motion } from "framer-motion"

interface ForumTableViewProps {
  posts: ForumPost[]
  onView: (post: ForumPost) => void
  onToggleFlag: (id: number) => void
  onToggleLock: (id: number) => void
}

const ForumTableView: FC<ForumTableViewProps> = ({
  posts,
  onView,
  onToggleFlag,
  onToggleLock,
}) => {
  return (
    <motion.div
      key="table-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.date}</TableCell>
              <TableCell>{post.course}</TableCell>
              <TableCell>
                {post.isFlagged && (
                  <Flag className="h-4 w-4 text-red-500 inline mr-2" />
                )}
                {post.isLocked && <Lock className="h-4 w-4 inline" />}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onView(post)}>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggleFlag(post.id)}
                  >
                    <Flag
                      className={`h-4 w-4 ${post.isFlagged ? "text-red-500" : ""}`}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggleLock(post.id)}
                  >
                    {post.isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  )
}

export default ForumTableView
