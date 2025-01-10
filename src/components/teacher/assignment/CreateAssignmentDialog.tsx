import { FC } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Plus } from "lucide-react";
import { Assignment } from "./types";

interface CreateAssignmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newAssignment: Partial<Assignment>;
  setNewAssignment: React.Dispatch<React.SetStateAction<Partial<Assignment>>>;
  onCreateAssignment: () => void;
}

const CreateAssignmentDialog: FC<CreateAssignmentDialogProps> = ({
  isOpen,
  onOpenChange,
  newAssignment,
  setNewAssignment,
  onCreateAssignment,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Assignment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Assignment</DialogTitle>
          <DialogDescription>
            Enter the details for the new assignment.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newAssignment.title}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, title: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newAssignment.description}
              onChange={(e) =>
                setNewAssignment({
                  ...newAssignment,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={newAssignment.dueDate}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, dueDate: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="type">Assignment Type</Label>
            <Select
              value={newAssignment.type}
              onValueChange={(value) =>
                setNewAssignment({
                  ...newAssignment,
                  type: value as "exit_ticket" | "quiz" | "test",
                })
              }
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exit_ticket">Exit Ticket</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="test">Test</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="course">Course</Label>
            <Input
              id="course"
              value={newAssignment.course}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, course: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onCreateAssignment}>Create Assignment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssignmentDialog;
