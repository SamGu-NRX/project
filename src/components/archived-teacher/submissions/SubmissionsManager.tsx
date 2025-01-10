"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface Submission {
  id: string;
  studentName: string;
  assignmentTitle: string;
  submittedAt: Date;
  status: "pending" | "graded" | "in_review";
  grade?: number;
  feedback?: string;
}

export function SubmissionsManager() {
  const [submissions, setSubmissions] = React.useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = React.useState<Submission | null>(null);
  const [filter, setFilter] = React.useState<"all" | "pending" | "graded" | "in_review">("all");

  const filteredSubmissions = submissions.filter(
    (submission) => filter === "all" || submission.status === filter
  );

  const handleGrade = (submissionId: string, grade: number, feedback: string) => {
    setSubmissions(
      submissions.map((s) =>
        s.id === submissionId
          ? {
              ...s,
              grade,
              feedback,
              status: "graded",
            }
          : s
      )
    );
    setSelectedSubmission(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Submissions</h2>
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Submissions</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_review">In Review</SelectItem>
            <SelectItem value="graded">Graded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Assignment</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.studentName}</TableCell>
                <TableCell>{submission.assignmentTitle}</TableCell>
                <TableCell>
                  {formatDistanceToNow(submission.submittedAt, {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      submission.status === "graded"
                        ? "default"
                        : submission.status === "in_review"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {submission.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {submission.grade !== undefined
                    ? `${submission.grade}%`
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {selectedSubmission && (
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-medium">Review Submission</h3>
          <div className="space-y-4">
            <div>
              <p className="mb-2 font-medium">Student</p>
              <p>{selectedSubmission.studentName}</p>
            </div>
            <div>
              <p className="mb-2 font-medium">Assignment</p>
              <p>{selectedSubmission.assignmentTitle}</p>
            </div>
            <div>
              <p className="mb-2 font-medium">Grade</p>
              <Input
                type="number"
                min="0"
                max="100"
                value={selectedSubmission.grade || ""}
                onChange={(e) =>
                  setSelectedSubmission({
                    ...selectedSubmission,
                    grade: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <p className="mb-2 font-medium">Feedback</p>
              <Textarea
                value={selectedSubmission.feedback || ""}
                onChange={(e) =>
                  setSelectedSubmission({
                    ...selectedSubmission,
                    feedback: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedSubmission(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() =>
                  handleGrade(
                    selectedSubmission.id,
                    selectedSubmission.grade || 0,
                    selectedSubmission.feedback || ""
                  )
                }
              >
                Save Grade
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}