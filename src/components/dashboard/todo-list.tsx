"use client";

import { TodoItem } from "@/lib/types/dashboard";
import { Card } from "@/components/ui/card";
import { CalendarClock, CheckCircle2, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TodoListProps {
  items: TodoItem[];
}

export function TodoList({ items }: TodoListProps) {
  if (items.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">No upcoming tasks!</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="p-4">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              {item.status === "completed" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : item.status === "overdue" ? (
                <Clock className="h-5 w-5 text-red-500" />
              ) : (
                <CalendarClock className="h-5 w-5 text-blue-500" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-muted-foreground">
                Due{" "}
                {formatDistanceToNow(new Date(item.dueDate), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
