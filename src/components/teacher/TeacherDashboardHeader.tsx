"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Settings } from "lucide-react";

export function TeacherDashboardHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Course Settings
          </Button>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Session
          </Button>
        </div>
      </div>
    </header>
  );
}