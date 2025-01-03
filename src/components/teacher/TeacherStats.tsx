"use client";

import { Card } from "@/components/ui/card";
import { 
  Users, 
  BookOpen, 
  FileCheck, 
  GraduationCap 
} from "lucide-react";

export function TeacherStats({ courseData }) {
  const stats = [
    {
      title: "Total Students",
      value: courseData?.enrollments?.[0]?.count || 0,
      icon: Users,
      description: "Active enrollments",
    },
    {
      title: "Total Sessions",
      value: courseData?.sessions?.[0]?.count || 0,
      icon: BookOpen,
      description: "Course content",
    },
    {
      title: "Assignments",
      value: courseData?.assignments?.[0]?.count || 0,
      icon: FileCheck,
      description: "Total assignments",
    },
    {
      title: "Submissions",
      value: courseData?.submissions?.[0]?.count || 0,
      icon: GraduationCap,
      description: "Pending review",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}