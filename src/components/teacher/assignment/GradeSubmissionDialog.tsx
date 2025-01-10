import { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Assignment, Submission } from "./types";

interface GradeSubmissionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentSubmission: Submission | null;
  setCurrentSubmission: React.Dispatch<React.SetStateAction<Submission | null>>;
  currentAssignment: Assignment | null;
  onGradeSubmission: () => void;
}

const GradeSubmissionDialog: FC<GradeSubmissionDialogProps> = ({
  isOpen,
  onOpenChange,
  currentSubmission,
  setCurrentSubmission,
  currentAssignment,
  onGradeSubmission,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Grade Submission</DialogTitle>
        </DialogHeader>
        {currentSubmission && currentAssignment && (
          <div className="space-y-4">
            <div>
              <Label>Student</Label>
              <p>{currentSubmission.studentName}</p>
            </div>
            <div>
              <Label>Submission Date</Label>
              <p>{currentSubmission.submissionDate}</p>
            </div>
            {currentSubmission.answers.map((answer, index) => {
              const question = currentAssignment.questions.find(
                (q) => q.id === answer.questionId
              );
              return (
                <div key={answer.questionId} className="border p-4 rounded-md">
                  <Label>Question {index + 1}</Label>
                  <p className="mb-2">{question?.question}</p>
                  <Label>Student's Answer</Label>
                  <p className="mb-2">{answer.answer}</p>
                  {question?.type === "multiple_choice" && (
                    <div className="mb-2">
                      <Label>Correct Answer</Label>
                      <p>{question.correctAnswer}</p>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`score-${answer.questionId}`}>Score</Label>
                    <Input
                      id={`score-${answer.questionId}`}
                      type="number"
                      value={answer.score || ""}
                      onChange={(e) => {
                        const newScore = parseInt(e.target.value);
                        setCurrentSubmission({
                          ...currentSubmission,
                          answers: currentSubmission.answers.map((a) =>
                            a.questionId === answer.questionId
                              ? { ...a, score: newScore }
                              : a
                          ),
                        });
                      }}
                      className="w-20"
                    />
                  </div>
                  <div className="mt-2">
                    <Label htmlFor={`feedback-${answer.questionId}`}>
                      Feedback
                    </Label>
                    <Textarea
                      id={`feedback-${answer.questionId}`}
                      value={answer.feedback || ""}
                      onChange={(e) => {
                        setCurrentSubmission({
                          ...currentSubmission,
                          answers: currentSubmission.answers.map((a) =>
                            a.questionId === answer.questionId
                              ? { ...a, feedback: e.target.value }
                              : a
                          ),
                        });
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <div>
              <Label htmlFor="total-score">Total Score</Label>
              <Input
                id="total-score"
                type="number"
                value={currentSubmission.score || ""}
                onChange={(e) => {
                  setCurrentSubmission({
                    ...currentSubmission,
                    score: parseInt(e.target.value),
                  });
                }}
                className="w-20"
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button onClick={onGradeSubmission}>Save Grading</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GradeSubmissionDialog;
