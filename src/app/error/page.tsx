"use client";

import React from "react";
import Link from "next/link";
import { RiEmotionSadLine } from "react-icons/ri";
import { motion } from "framer-motion";

const ErrorPage: React.FC = () => {
  return (
    // center the page vertically
    <div className="mt-6 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-extrabold text-gray-800 dark:text-gray-200">
          404
        </h1>
        <p className="mt-4 text-2xl text-gray-600 dark:text-gray-400">
          Oops! You seem to be lost.
        </p>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
          Don't worry, even the best navigators get lost sometimes.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md transition-colors duration-300 hover:bg-blue-700"
        >
          Go Back Home
        </Link>
        <div className="mt-10">
          {/* Heroicons Illustration */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
          >
            <RiEmotionSadLine
              className="mx-auto h-24 w-24 animate-bounce text-gray-500 dark:text-gray-400"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
