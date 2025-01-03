"use client";

import { CourseProgress } from "@/lib/types/dashboard";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CourseProgressProps {
  progress: CourseProgress;
}

export function CourseProgressCard({ progress }: CourseProgressProps) {
  const percentage = Math.round((progress.completed / progress.total) * 100);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold">Course Progress</h3>
          <Progress value={percentage} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {progress.completed} of {progress.total} sessions completed
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Next Up</h4>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {progress.nextSession.title}
            </p>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/sessions/${progress.nextSession.id}`}>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
