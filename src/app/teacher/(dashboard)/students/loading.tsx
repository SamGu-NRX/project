"use client"

import { motion } from "framer-motion"

export default function LoadingSkeleton() {
  const skeletonItems = Array.from({ length: 6 }, (_, i) => i)

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-6 w-32 bg-gray-200 rounded" />
      </motion.div>

      <motion.div
        key="card-skeleton"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {skeletonItems.map((item) => (
          <div
            key={item}
            className="p-4 border rounded-md space-y-3 animate-pulse"
          >
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
            <div className="h-2.5 w-full bg-gray-200 rounded" />
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
            <div className="flex justify-between mt-2">
              <div className="h-8 w-24 bg-gray-200 rounded" />
              <div className="h-8 w-24 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
