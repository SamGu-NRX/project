import { Suspense } from "react"
import { Metadata } from "next"
import { motion } from "framer-motion"

import { getForumPosts } from "@/components/teacher/forums/_actions/getForumPosts"
import LoadingSkeleton from "./loading"
import ForumClient from "@/components/teacher/forums"

export const metadata: Metadata = {
  title: "Forum",
  description: "Forum page for user discussions",
}

export default async function ForumPage() {
  // Fetch your data on the server side
  const posts = await getForumPosts()

  return (
    <Suspense
      fallback={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <LoadingSkeleton />
        </motion.div>
      }
    >
      <ForumClient serverPosts={posts} />
    </Suspense>
  )
}
