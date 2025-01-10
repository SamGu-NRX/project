'use client';

import Link from 'next/link';
import {
  Home,
  BookOpen,
  FileText,
  MessageSquare,
  Users,
  Award,
  Settings
} from 'lucide-react';

export function Sidebar() {
  return (
    <div className="absolute inset-y-0 left-0 w-64 -translate-x-full transform space-y-6 bg-white px-2 py-7 transition duration-200 ease-in-out md:relative md:translate-x-0">
      <nav>
        <Link
          href="/teacher"
          className="flex items-center space-x-2 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/teacher/courses"
          className="flex items-center space-x-2 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <BookOpen className="h-5 w-5" />
          <span>Courses</span>
        </Link>
        <Link
          href="/teacher/assignments"
          className="flex items-center space-x-2 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <FileText className="h-5 w-5" />
          <span>Assignments</span>
        </Link>
        <Link
          href="/teacher/forum"
          className="flex items-center space-x-2 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <MessageSquare className="h-5 w-5" />
          <span>Forum</span>
        </Link>
        <Link
          href="/teacher/students"
          className="flex items-center space-x-2 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Users className="h-5 w-5" />
          <span>Students</span>
        </Link>
        <Link
          href="/teacher/certificates"
          className="flex items-center space-x-2 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Award className="h-5 w-5" />
          <span>Certificates</span>
        </Link>
        <Link
          href="/teacher/settings"
          className="flex items-center space-x-2 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
}
