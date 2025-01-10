// app/teacher/certificates/loading.tsx

"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * This loading skeleton is displayed while data is being fetched
 * on the server side. It approximates the actual Certificates
 * page layout for a smooth transition.
 */
export default function LoadingSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Title + Optional Button/Action */}
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Skeleton for "Certificates" title */}
        <Skeleton className="h-6 w-40 rounded-md" />
        {/* Optional: If the real UI might have a button here */}
        <Skeleton className="h-8 w-24 rounded-md" />
      </motion.div>

      {/* Search + Filter Row */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.05 }}
      >
        {/* Row with search and filter selects */}
        <div className="flex space-x-4">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 w-36 rounded-md" />
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>

        {/* Sort row skeleton (aligned right) */}
        <div className="flex justify-between items-center">
          {/* View Switcher (3 small buttons) */}
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
          {/* Sorter: asc/desc button + select */}
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-36 rounded-md" />
          </div>
        </div>
      </motion.div>

      {/* Grid of Card Skeletons (approx. 6 or 9, up to you) */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <SkeletonCertificateCard key={i} />
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Represents how each certificate card might look in skeleton form.
 */
function SkeletonCertificateCard() {
  return (
    <motion.div
      className="border border-muted rounded-lg p-4 flex flex-col justify-between space-y-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Top: Student Name + Icon */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-3 w-24 rounded-md" />
        </div>
        {/* Icon placeholder */}
        <Skeleton className="h-7 w-7 rounded-full" />
      </div>

      {/* Middle lines */}
      <Skeleton className="h-3 w-3/4 rounded-md" />
      <Skeleton className="h-3 w-2/3 rounded-md" />

      {/* Button placeholder */}
      <div className="mt-auto">
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </motion.div>
  );
}
