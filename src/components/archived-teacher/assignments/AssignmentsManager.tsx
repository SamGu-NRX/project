"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

interface Assignment {
  id: string;
  title: string;
  instructions: string;
  type: "multiple_choice" | "file_upload" | "mixed";
  dueDate: string;
  maxScore: number;
  isPublished: boolean;
  questions: Question[];
}

export function AssignmentsManager() {
  const [assignments, setAssignments] = React.useState<Assignment[]>([]);
  const [editingAssignment, setEditingAssignment] = React.useState<Assignment | null>(null);
  const [editingQuestion, setEditingQuestion] = React.useState<Question | null>(null);

  const handleAddAssignment = () => {
    const newAssignment: Assignment = {
      id: crypto.randomUUID(),
      title: "",
      instructions: "",
      type: "multiple_choice",
      dueDate: "",
      maxScore: 100,
      isPublished: false,
      questions: [],
    };
    setEditingAssignment(newAssignment);
  };

  const handleAddQuestion = () => {
    if (!editingAssignment) return;

    const newQuestion: Question = {
      id: crypto.randomUUID(),
      text: "",
      options: [
        {
          id: crypto.randomUUID(),
          text: "",
          isCorrect: false,
        },
      ],
    };

    setEditingQuestion(newQuestion);
  };

  const handleSaveQuestion = () => {
    if (!editingAssignment || !editingQuestion) return;

    const updatedQuestions = editingAssignment.questions.find(
      (q) => q.id === editingQuestion.id
    )
      ? editingAssignment.questions.map((q) =>
          q.id === editingQuestion.id ? editingQuestion : q
        )
      : [...editingAssignment.questions, editingQuestion];

    setEditingAssignment({
      ...editingAssignment,
      questions: updatedQuestions,
    });
    setEditingQuestion(null);
  };

  const handleSaveAssignment = () => {
    if (!editingAssignment) return;

    if (!assignments.find((a) => a.id === editingAssignment.id)) {
      setAssignments([...assignments, editingAssignment]);
    } else {
      setAssignments(
        assignments.map((a) =>
          a.id === editingAssignment.id ? editingAssignment : a
        )
      );
    }

    setEditingAssignment(null);
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    setAssignments(assignments.filter((a) => a.id !== assignmentId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Assignments</h2>
        <Button onClick={handleAddAssignment}>
          <Plus className="mr-2 h-4 w-4" />
          Add Assignment
        </Button>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-medium">{assignment.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={assignment.isPublished}
                    onCheckedChange={(checked) => {
                      setAssignments(
                        assignments.map((a) =>
                          a.id === assignment.id
                            ? { ...a, isPublished: checked }
                            : a
                        )
                      );
                    }}
                  />
                  <span className="text-sm">
                    {assignment.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingAssignment(assignment)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteAssignment(assignment.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {editingAssignment && (
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-medium">
            {assignments.find((a) => a.id === editingAssignment.id)
              ? "Edit Assignment"
              : "New Assignment"}
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editingAssignment.title}
                onChange={(e) =>
                  setEditingAssignment({
                    ...editingAssignment,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                value={editingAssignment.instructions}
                onChange={(e) =>
                  setEditingAssignment({
                    ...editingAssignment,
                    instructions: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={editingAssignment.type}
                onValueChange={(value: "multiple_choice" | "file_upload" | "mixed") =>
                  setEditingAssignment({
                    ...editingAssignment,
                    type: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                  <SelectItem value="file_upload">File Upload</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="datetime-local"
                value={editingAssignment.dueDate}
                onChange={(e) =>
                  setEditingAssignment({
                    ...editingAssignment,
                    dueDate: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="maxScore">Max Score</Label>
              <Input
                id="maxScore"
                type="number"
                value={editingAssignment.maxScore}
                onChange={(e) =>
                  setEditingAssignment({
                    ...editingAssignment,
                    maxScore: parseInt(e.target.value),
                  })
                }
              />
            </div>

            {(editingAssignment.type === "multiple_choice" ||
              editingAssignment.type === "mixed") && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-medium">Questions</h4>
                  <Button onClick={handleAddQuestion}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                </div>

                <DragDropContext onDragEnd={() => {}}>
                  <Droppable droppableId="questions">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-4"
                      >
                        {editingAssignment.questions.map((question, index) => (
                          <Draggable
                            key={question.id}
                            draggableId={question.id}
                            index={index}
                          >
                            {(provided) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="p-4"
                              >
                                <div className="flex items-center gap-4">
                                  <div
                                    {...provided.dragHandleProps}
                                    className="cursor-move"
                                  >
                                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">
                                      {question.text || "Untitled Question"}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {question.options.length} options
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setEditingQuestion(question)}
                                  >
                                    Edit
                                  </Button>
                                </div>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setEditingAssignment(null)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveAssignment}>Save</Button>
            </div>
          </div>
        </Card>
      )}

      {editingQuestion && (
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-medium">
            {editingAssignment?.questions.find((q) => q.id === editingQuestion.id)
              ? "Edit Question"
              : "New Question"}
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="questionText">Question Text</Label>
              <Textarea
                id="questionText"
                value={editingQuestion.text}
                onChange={(e) =>
                  setEditingQuestion({
                    ...editingQuestion,
                    text: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Options</Label>
              {editingQuestion.options.map((option, index) => (
                <div key={option.id} className="flex items-center gap-2">
                  <Input
                    value={option.text}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        options: editingQuestion.options.map((o) =>
                          o.id === option.id
                            ? { ...o, text: e.target.value }
                            : o
                        ),
                      })
                    }
                  />
                  <Switch
                    checked={option.isCorrect}
                    onCheckedChange={(checked) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        options: editingQuestion.options.map((o) =>
                          o.id === option.id
                            ? { ...o, isCorrect: checked }
                            : o
                        ),
                      })
                    }
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setEditingQuestion({
                        ...editingQuestion,
                        options: editingQuestion.options.filter(
                          (o) => o.id !== option.id
                        ),
                      })
                    }
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() =>
                  setEditingQuestion({
                    ...editingQuestion,
                    options: [
                      ...editingQuestion.options,
                      {
                        id: crypto.randomUUID(),
                        text: "",
                        isCorrect: false,
                      },
                    ],
                  })
                }
              >
                Add Option
              </Button>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setEditingQuestion(null)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveQuestion}>Save</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}