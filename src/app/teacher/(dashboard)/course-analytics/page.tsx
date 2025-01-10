'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface CourseAnalytics {
  id: number
  name: string
  enrollments: number
  completionRate: number
  averageGrade: number
  studentEngagement: number
  assignmentSubmissionRate: number
  quizPerformance: number
}

const courseAnalytics: CourseAnalytics[] = [
  {
    id: 1,
    name: 'AI Bootcamp 2024',
    enrollments: 50,
    completionRate: 85,
    averageGrade: 88,
    studentEngagement: 75,
    assignmentSubmissionRate: 92,
    quizPerformance: 86
  },
  {
    id: 2,
    name: 'Machine Learning Fundamentals',
    enrollments: 40,
    completionRate: 78,
    averageGrade: 82,
    studentEngagement: 70,
    assignmentSubmissionRate: 88,
    quizPerformance: 80
  },
  {
    id: 3,
    name: 'Deep Learning with PyTorch',
    enrollments: 35,
    completionRate: 72,
    averageGrade: 85,
    studentEngagement: 68,
    assignmentSubmissionRate: 90,
    quizPerformance: 83
  }
]

export default function CourseAnalyticsPage() {
  const [selectedCourse, setSelectedCourse] = useState<CourseAnalytics>(courseAnalytics[0])

  const chartData = [
    { name: 'Completion Rate', value: selectedCourse.completionRate },
    { name: 'Average Grade', value: selectedCourse.averageGrade },
    { name: 'Student Engagement', value: selectedCourse.studentEngagement },
    { name: 'Assignment Submission', value: selectedCourse.assignmentSubmissionRate },
    { name: 'Quiz Performance', value: selectedCourse.quizPerformance },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Course Analytics</h2>

      <div className="w-full max-w-xs">
        <Label htmlFor="course-select">Select Course</Label>
        <Select 
          onValueChange={(value) => setSelectedCourse(courseAnalytics.find(course => course.id === parseInt(value)) || courseAnalytics[0])}
        >
          <SelectTrigger id="course-select">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            {courseAnalytics.map((course) => (
              <SelectItem key={course.id} value={course.id.toString()}>{course.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-2">Enrollments</h3>
          <p className="text-3xl font-bold">{selectedCourse.enrollments}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-2">Completion Rate</h3>
          <p className="text-3xl font-bold">{selectedCourse.completionRate}%</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-2">Average Grade</h3>
          <p className="text-3xl font-bold">{selectedCourse.averageGrade}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-xl mb-4">Course Performance Metrics</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-2">Student Engagement</h3>
          <p className="text-3xl font-bold">{selectedCourse.studentEngagement}%</p>
          <p className="text-sm text-gray-500 mt-2">Based on forum activity and resource access</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-2">Assignment Submission Rate</h3>
          <p className="text-3xl font-bold">{selectedCourse.assignmentSubmissionRate}%</p>
          <p className="text-sm text-gray-500 mt-2">Percentage of assignments submitted on time</p>
        </Card>
      </div>
    </div>
  )
}

