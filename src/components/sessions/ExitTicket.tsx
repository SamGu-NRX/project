"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

interface ExitTicketProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export function ExitTicket({ questions, onComplete }: ExitTicketProps) {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [score, setScore] = React.useState(0);

  const handleSubmit = () => {
    const totalQuestions = questions.length;
    let correctAnswers = 0;

    questions.forEach((question) => {
      const selectedOption = question.options.find(
        (opt) => opt.id === answers[question.id]
      );
      if (selectedOption?.isCorrect) {
        correctAnswers++;
      }
    });

    const finalScore = (correctAnswers / totalQuestions) * 100;
    setScore(finalScore);
    setSubmitted(true);
    onComplete(finalScore);
  };

  return (
    <Card className="p-6">
      <h3 className="mb-6 text-xl font-semibold">Exit Ticket</h3>
      <div className="space-y-8">
        {questions.map((question) => (
          <div key={question.id} className="space-y-4">
            <p className="text-lg font-medium">{question.text}</p>
            <RadioGroup
              disabled={submitted}
              value={answers[question.id]}
              onValueChange={(value) =>
                setAnswers((prev) => ({ ...prev, [question.id]: value }))
              }
            >
              {question.options.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center space-x-3 rounded-lg border p-4 ${
                    submitted &&
                    option.isCorrect &&
                    "border-green-500 bg-green-50 dark:bg-green-950"
                  } ${
                    submitted &&
                    answers[question.id] === option.id &&
                    !option.isCorrect &&
                    "border-red-500 bg-red-50 dark:bg-red-950"
                  }`}
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label
                    htmlFor={option.id}
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {option.text}
                  </Label>
                  {submitted && option.isCorrect && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                  {submitted &&
                    answers[question.id] === option.id &&
                    !option.isCorrect && <X className="h-5 w-5 text-red-500" />}
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}

        {!submitted && (
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== questions.length}
          >
            Submit
          </Button>
        )}

        {submitted && (
          <div className="rounded-lg bg-muted p-4 text-center">
            <p className="text-lg font-medium">
              Score: {score.toFixed(0)}%
            </p>
            <p className="text-sm text-muted-foreground">
              {score >= 70
                ? "Great job! You can now proceed to the next section."
                : "Review the material and try again to unlock the next section."}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}