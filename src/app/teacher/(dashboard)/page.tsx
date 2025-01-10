import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Users, FileText, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome back, Teacher!</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <Link href="/teacher/course-analytics" className="block p-4">
            <div className="flex items-start space-x-4">
              <BarChart className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Course Analytics</h3>
                <p className="text-sm text-gray-500">View detailed stats</p>
              </div>
            </div>
          </Link>
        </Card>
        <Card>
          <Link href="/teacher/students" className="block p-4">
            <div className="flex items-start space-x-4">
              <Users className="h-6 w-6 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold">Students</h3>
                <p className="text-sm text-gray-500">Manage enrollments</p>
              </div>
            </div>
          </Link>
        </Card>
        <Card>
          <Link href="/teacher/assignments" className="block p-4">
            <div className="flex items-start space-x-4">
              <FileText className="h-6 w-6 text-yellow-500" />
              <div>
                <h3 className="text-lg font-semibold">Assignments</h3>
                <p className="text-sm text-gray-500">Create and grade</p>
              </div>
            </div>
          </Link>
        </Card>
        <Card>
          <Link href="/teacher/forum" className="block p-4">
            <div className="flex items-start space-x-4">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <div>
                <h3 className="text-lg font-semibold">Forum</h3>
                <p className="text-sm text-gray-500">Moderate discussions</p>
              </div>
            </div>
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="p-4">
            <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>New assignment submission</span>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Forum post needs moderation</span>
                <span className="text-sm text-gray-500">5 hours ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span>New student enrolled</span>
                <span className="text-sm text-gray-500">1 day ago</span>
              </li>
            </ul>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/teacher/assignments/create">
                <Button className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Create New Assignment
                </Button>
              </Link>
              <Link href="/teacher/students">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  View Student Progress
                </Button>
              </Link>
              <Link href="/teacher/course-analytics">
                <Button className="w-full justify-start" variant="outline">
                  <BarChart className="mr-2 h-4 w-4" />
                  Generate Course Report
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
