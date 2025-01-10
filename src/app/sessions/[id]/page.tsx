"use client";

import React from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { VideoPlayer } from "@/components/sessions/VideoPlayer";
import { ExitTicket } from "@/components/sessions/ExitTicket";
import { Discussion } from "@/components/sessions/Discussion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Lock, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SessionPage() {
  const params = useParams();
  const [session, setSession] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [progress, setProgress] = React.useState({
    videoCompleted: false,
    exitTicketCompleted: false,
    discussionUnlocked: false,
  });

  const supabase = createClient(); // fix, needs to be await/async

  React.useEffect(() => {
    const loadSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      try {
        // Fetch session data
        const { data: sessionData } = await supabase
          .from("sessions")
          .select(
            `
            *,
            course:courses(*),
            progress:session_progress(*)
          `,
          )
          .eq("id", params.id)
          .single();

        if (sessionData) {
          setSession(sessionData);

          // Check existing progress
          const hasProgress = sessionData.progress?.length > 0;
          if (hasProgress) {
            setProgress({
              videoCompleted: true,
              exitTicketCompleted: true,
              discussionUnlocked: true,
            });
          }
        }
      } catch (error) {
        console.error("Error loading session:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, [params.id]);

  const handleVideoComplete = async () => {
    setProgress((prev) => ({ ...prev, videoCompleted: true }));
  };

  const handleExitTicketComplete = async (score: number) => {
    if (score >= 70) {
      setProgress((prev) => ({
        ...prev,
        exitTicketCompleted: true,
        discussionUnlocked: true,
      }));

      // Update progress in database
      try {
        await supabase.from("session_progress").upsert({
          session_id: params.id,
          completed: true,
        });
      } catch (error) {
        console.error("Error updating progress:", error);
      }
    }
  };

  const handlePost = async (content: string, parentId?: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      await supabase.from("discussion_posts").insert({
        session_id: params.id,
        user_id: user.id,
        content,
        parent_id: parentId,
      });

      // Refresh posts
      // Implementation depends on your data structure
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Session not found</div>;
  }

  const progressPercentage =
    (Number(progress.videoCompleted) + Number(progress.exitTicketCompleted)) *
    50;

  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{session.title}</h1>
          <p className="mt-2 text-muted-foreground">{session.description}</p>
        </div>
        <div className="text-right">
          <div className="mb-2 flex items-center gap-2">
            <Progress value={progressPercentage} className="w-32" />
            <span className="text-sm text-muted-foreground">
              {progressPercentage}% Complete
            </span>
          </div>
          {progress.exitTicketCompleted && (
            <Button asChild size="sm">
              <Link href={`/sessions/${Number(params.id) + 1}`}>
                Next Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-8">
        <section>
          <h2 className="mb-4 text-xl font-semibold">Video Lecture</h2>
          <VideoPlayer
            videoUrl={session.video_url}
            onComplete={handleVideoComplete}
          />
          {progress.videoCompleted && (
            <div className="mt-2 flex items-center gap-2 text-green-500">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm">Video completed</span>
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Exit Ticket</h2>
          {progress.videoCompleted ? (
            <ExitTicket
              questions={[
                {
                  id: "1",
                  text: "What is the main concept covered in this video?",
                  options: [
                    { id: "a", text: "Option A", isCorrect: true },
                    { id: "b", text: "Option B", isCorrect: false },
                    { id: "c", text: "Option C", isCorrect: false },
                  ],
                },
              ]}
              onComplete={handleExitTicketComplete}
            />
          ) : (
            <Card className="flex items-center gap-4 p-6">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <p className="text-muted-foreground">
                Watch the video to unlock the exit ticket
              </p>
            </Card>
          )}
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Discussion</h2>
          <Discussion
            posts={[]}
            onPost={handlePost}
            isLocked={!progress.discussionUnlocked}
          />
        </section>
      </div>
    </div>
  );
}
