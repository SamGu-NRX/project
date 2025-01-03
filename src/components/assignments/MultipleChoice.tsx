"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
}

interface MultipleChoiceProps {
  questions: Question[];
  onSubmit: (answers: Record<string, string>) => void;
  isSubmitting?: boolean;
}

export function MultipleChoice({
  questions,
  onSubmit,
  isSubmitting = false,
}: MultipleChoiceProps) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-6">
        <div key={questions[currentQuestion].id}>
          <h3 className="mb-4 text-lg font-medium">
            {questions[currentQuestion].text}
          </h3>
          <RadioGroup
            value={answers[questions[currentQuestion].id]}
            onValueChange={(value) =>
              setAnswers((prev) => ({
                ...prev,
                [questions[currentQuestion].id]: value,
              }))
            }
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-3 rounded-lg border p-4"
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0 || isSubmitting}
          >
            Previous
          </Button>
          {currentQuestion < questions.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!answers[questions[currentQuestion].id] || isSubmitting}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={
                !answers[questions[currentQuestion].id] ||
                Object.keys(answers).length !== questions.length ||
                isSubmitting
              }
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}