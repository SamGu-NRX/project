"use client"

import { motion } from "framer-motion"

export default function LoadingSkeleton() {
  // Example skeleton with subtle animation
  return (
    <div className="space-y-6">
      {/* Title Bar Skeleton */}
      <div className="flex justify-between items-center">
        <div className="w-32 h-6 bg-gray-200 rounded" />
        <div className="w-40 h-10 bg-gray-200 rounded" />
      </div>

      {/* Filter section skeleton */}
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1 h-10 bg-gray-200 rounded" />
          <div className="w-40 h-10 bg-gray-200 rounded" />
          <div className="w-40 h-10 bg-gray-200 rounded" />
          <div className="w-40 h-10 bg-gray-200 rounded" />
        </div>
        <div className="flex justify-end space-x-2">
          <div className="w-10 h-10 bg-gray-200 rounded" />
          <div className="w-28 h-10 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Card grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example: Show 6 skeleton cards */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="p-4 border rounded-md space-y-4 bg-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="w-3/4 h-4 bg-gray-200 rounded" />
            <div className="w-1/2 h-3 bg-gray-200 rounded" />
            <div className="w-1/2 h-3 bg-gray-200 rounded" />
            <div className="w-1/3 h-3 bg-gray-200 rounded" />
            <div className="w-full h-2 bg-gray-200 rounded" />
            <div className="w-full h-2 bg-gray-200 rounded" />
            <div className="flex space-x-2">
              <div className="w-16 h-6 bg-gray-200 rounded" />
              <div className="w-16 h-6 bg-gray-200 rounded" />
              <div className="w-16 h-6 bg-gray-200 rounded" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
