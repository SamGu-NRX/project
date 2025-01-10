import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/prisma";

import { TodoItem, CourseProgress } from "@/lib/types/dashboard";

import { CourseProgressCard } from "@/components/dashboard/course-progress";
import { SessionList } from "@/components/dashboard/session-list";
import { TodoList } from "@/components/dashboard/todo-list";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";

export default async function DashboardPage() {
  // (1) Supabase Auth Check
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // No logged-in user → redirect
  if (!user) {
    redirect("/login");
  }
  // Error retrieving user session
  if (userError && user) {
    console.error("Error fetching existing user session:", userError);
    throw new Error(userError.message);
  }

  // (2) Fetch “assignments” + “submissions” status using Prisma
  //     - This requires the “Assignment” & “Submission” models from your schema
  let assignments = [];
  try {
    assignments = await db.assignment.findMany({
      include: {
        submissions: {
          // Only want the status field for the first submission belonging to this user?
          where: {
            studentId: user.id,
          },
          select: { status: true },
        },
      },
      orderBy: {
        dueDate: "asc",
      },
      take: 5,
    });
  } catch (err) {
    console.error("Error fetching assignments via Prisma:", err);
    throw err;
  }

  // (3) Fetch “session progress” for the logged-in student
  //     - Prisma “SessionProgress” model.
  let progress = [];
  try {
    progress = await db.sessionProgress.findMany({
      where: {
        studentId: user.id,
      },
      select: {
        sessionId: true,
      },
    });
  } catch (err) {
    console.error("Error fetching session progress via Prisma:", err);
    throw err;
  }

  // (4) Fetch “sessions” from DB
  let sessionData = [];
  try {
    sessionData = await db.session.findMany({
      orderBy: {
        sequenceOrder: "asc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        videoUrl: true,
        sequenceOrder: true,
      },
    });
  } catch (err) {
    console.error("Error fetching sessions via Prisma:", err);
    throw err;
  }

  // (5) Transform data for UI
  // (5a) Build the “todoItems” array from the assignment data
  const todoItems: TodoItem[] = assignments.map((assignment) => {
    const firstSubmission = assignment.assignmentStatus[0];
    return {
      id: assignment.id,
      title: assignment.title,
      dueDate: assignment.dueDate?.toISOString() || "",
      type: "assignment",
      status: assignment.assignmentStatus,
    };
  });

  // (5b) Build the course progress
  //      completed = number of sessionProgress rows for this user
  //      total = total sessions in the DB
  //      nextSession = first session that is not in user’s progress
  let courseProgress: CourseProgress = {
    completed: progress.length,
    total: sessionData.length,
    nextSession: { title: "", id: "" },
  };

  const nextIncompleteSession = sessionData.find(
    (session) => !progress.some((p) => p.sessionId === session.id),
  );

  if (nextIncompleteSession) {
    courseProgress.nextSession = {
      title: nextIncompleteSession.title,
      id: nextIncompleteSession.id,
    };
  } else {
    courseProgress.nextSession = {
      title: "All sessions completed!",
      id: "",
    };
  }

  // (5c) Sessions in UI-friendly shape
  const sessions = sessionData.map((session, index) => {
    const isCompleted = progress.some((p) => p.sessionId === session.id);
    // For “isLocked,” you might want to check if the previous session is completed, etc.
    const isLocked =
      index > 0 &&
      !progress.some((p) => p.sessionId === sessionData[index - 1].id);

    return {
      id: session.id,
      title: session.title,
      description: session.description || "",
      videoUrl: session.videoUrl,
      isCompleted,
      isLocked,
    };
  });

  // Debugging logs
  console.log("==== DASHBOARD DATA (PRISMA + SUPABASE AUTH) ====");
  console.log("User ID:", user.id);
  console.log("Assignments:", assignments);
  console.log("Session progress:", progress);
  console.log("Sessions:", sessionData);
  console.log("Todo items:", todoItems);
  console.log("Course progress:", courseProgress);
  console.log("================================================");

  // (6) Render final UI
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
