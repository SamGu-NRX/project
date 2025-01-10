import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Assignment, Submission } from "./types";

interface ViewAssignmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentAssignment: Assignment | null;
  setCurrentAssignment: React.Dispatch<React.SetStateAction<Assignment | null>>;
  submissions: Submission[];
  setIsGradeModalOpen: (open: boolean) => void;
  setCurrentSubmission: React.Dispatch<React.SetStateAction<Submission | null>>;
}

const ViewAssignmentDialog: FC<ViewAssignmentDialogProps> = ({
  isOpen,
  onOpenChange,
  currentAssignment,
  setCurrentAssignment,
  submissions,
  setIsGradeModalOpen,
  setCurrentSubmission,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Assignment Details</DialogTitle>
        </DialogHeader>
        {currentAssignment && (
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <p>{currentAssignment.title}</p>
                </div>
                <div>
                  <Label>Description</Label>
                  <p>{currentAssignment.description}</p>
                </div>
                <div>
                  <Label>Due Date</Label>
                  <p>{currentAssignment.dueDate}</p>
                </div>
                <div>
                  <Label>Type</Label>
                  <p>{currentAssignment.type}</p>
                </div>
                <div>
                  <Label>Course</Label>
                  <p>{currentAssignment.course}</p>
                </div>
                <div>
                  <Label>Questions</Label>
                  {currentAssignment.questions.map((question, index) => (
                    <div key={question.id} className="mt-2">
                      <p>
                        <strong>Question {index + 1}:</strong>{" "}
                        {question.question}
                      </p>
                      <p>
                        <strong>Type:</strong> {question.type}
                      </p>
                      {question.type === "multiple_choice" && (
                        <div>
                          <strong>Options:</strong>
                          <ul>
                            {question.options?.map((option, optionIndex) => (
                              <li key={optionIndex}>{option}</li>
                            ))}
                          </ul>
                          <p>
                            <strong>Correct Answer:</strong>{" "}
                            {question.correctAnswer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="submissions">
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <Card key={submission.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">
                        {submission.studentName}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {submission.submissionDate}
                      </span>
                    </div>
                    <p className="text-sm mt-2">
                      Status:{" "}
                      {submission.status === "to_be_graded"
                        ? "To Be Graded"
                        : submission.status === "graded"
                        ? "Graded"
                        : "Returned"}
                    </p>
                    {submission.score !== undefined && (
                      <p className="text-sm mt-1">Score: {submission.score}</p>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        setCurrentSubmission(submission);
                        setIsGradeModalOpen(true);
                      }}
                    >
                      {submission.status === "to_be_graded"
                        ? "Grade"
                        : "View/Edit Grade"}
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewAssignmentDialog;
