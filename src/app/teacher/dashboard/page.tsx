"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { TeacherDashboardHeader } from "@/components/teacher/TeacherDashboardHeader";
import { TeacherStats } from "@/components/teacher/TeacherStats";
import { CourseOverview } from "@/components/teacher/CourseOverview";
import { TeacherTabs } from "@/components/teacher/TeacherTabs";
import { DashboardSkeleton } from "@/components/teacher/DashboardSkeleton";

export default function TeacherDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const loadTeacherDashboard = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        // Fetch teacher's course data
        const { data: teacherData } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

        if (teacherData?.role !== "teacher") {
          router.push("/dashboard");
          return;
        }

        // Fetch course overview data
        const { data: course } = await supabase
          .from("courses")
          .select(`
            *,
            enrollments:course_enrollments(count),
            sessions(count),
            assignments(count),
            submissions:assignments(submissions(count))
          `)
          .single();

        setCourseData(course);
      } catch (error) {
        console.error("Error loading teacher dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTeacherDashboard();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      <TeacherDashboardHeader />
      
      <main className="container mx-auto p-6 space-y-6">
        <TeacherStats courseData={courseData} />
        <CourseOverview courseData={courseData} />
        <TeacherTabs />
      </main>
    </div>
  );
}