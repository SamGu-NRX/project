import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { CourseProgressCard } from "@/components/dashboard/course-progress";
import { SessionList } from "@/components/dashboard/session-list";
import { TodoList } from "@/components/dashboard/todo-list";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1) Check auth on the server
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2) Fetch data from Supabase
  const { data: assignments } = await supabase
    .from("assignments")
    .select(
      `
      id,
      title,
      dueDate,
      assignmentType,
      submissions (
        status
      )
    `,
    )
    .order("dueDate", { ascending: true })
    .limit(5);

  const { data: progress } = await supabase
    .from("session_progress")
    .select("sessionId")
    .eq("studentId", user.id);

  const { data: sessionData } = await supabase
    .from("sessions")
    .select("*")
    .order("sequenceOrder", { ascending: true });

  // 3) Transform data for UI
  // -- Prepare Todo Items
  const todoItems =
    assignments?.map((assignment) => ({
      id: assignment.id,
      title: assignment.title,
      dueDate: assignment.dueDate,
      type: "assignment",
      status: assignment.submissions?.[0]?.status || "pending",
    })) || [];

  // -- Prepare course progress
  let courseProgress = {
    completed: 0,
    total: 0,
    nextSession: { title: "", id: "" },
  };

  // -- Prepare sessions
  let sessions = [];

  if (progress && sessionData) {
    const completedCount = progress.length;
    const totalCount = sessionData.length;
    const nextIncompleteSession = sessionData.find(
      (session) => !progress.some((p) => p.sessionId === session.id),
    );

    courseProgress = {
      completed: completedCount,
      total: totalCount,
      nextSession: nextIncompleteSession
        ? {
            title: nextIncompleteSession.title,
            id: nextIncompleteSession.id,
          }
        : { title: "All sessions completed!", id: "" },
    };

    sessions = sessionData.map((session, index) => ({
      id: session.id,
      title: session.title,
      description: session.description || "",
      videoUrl: session.videoUrl,
      isCompleted: progress.some((p) => p.sessionId === session.id),
      isLocked:
        index > 0 &&
        !progress.some((p) => p.sessionId === sessionData[index - 1].id),
    }));
  }

  // 4) Return final UI
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <Button variant="outline" size="sm" className="gap-2">
          <GraduationCap className="h-4 w-4" />
          View Course Catalog
        </Button>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <CourseProgressCard progress={courseProgress} />
        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Upcoming Tasks</h3>
          <TodoList items={todoItems} />
        </Card>
      </div>

      <Tabs defaultValue="sessions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
        <TabsContent value="sessions" className="space-y-4">
          <SessionList sessions={sessions} />
        </TabsContent>
        <TabsContent value="assignments">
          <Card className="p-6">
            <p className="py-8 text-center text-muted-foreground">
              Assignment view coming soon...
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
