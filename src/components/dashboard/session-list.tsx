"use client";

import { Session } from "@/lib/types/dashboard";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Lock, Play } from "lucide-react";
import Link from "next/link";

interface SessionListProps {
  sessions: Session[];
}

export function SessionList({ sessions }: SessionListProps) {
  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card
          key={session.id}
          className={`p-4 transition-colors ${
            session.isLocked ? "opacity-50" : "hover:bg-accent"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="mt-1">
              {session.isCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : session.isLocked ? (
                <Lock className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Play className="h-5 w-5 text-blue-500" />
              )}
            </div>

            <div className="flex-1">
              {session.isLocked ? (
                <div>
                  <h4 className="font-medium">{session.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete previous sessions to unlock
                  </p>
                </div>
              ) : (
                <Link href={`/sessions/${session.id}`} className="block">
                  <h4 className="font-medium">{session.title}</h4>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {session.description}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
