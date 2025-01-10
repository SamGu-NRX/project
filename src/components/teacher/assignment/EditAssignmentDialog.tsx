import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Assignment } from "./types";

interface EditAssignmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentAssignment: Assignment | null;
  setCurrentAssignment: React.Dispatch<React.SetStateAction<Assignment | null>>;
  onEditAssignment: () => void;
}

const EditAssignmentDialog: FC<EditAssignmentDialogProps> = ({
  isOpen,
  onOpenChange,
  currentAssignment,
  setCurrentAssignment,
  onEditAssignment,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Assignment</DialogTitle>
          <DialogDescription>Update the assignment details.</DialogDescription>
        </DialogHeader>
        {currentAssignment && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={currentAssignment.title}
                onChange={(e) =>
                  setCurrentAssignment({
                    ...currentAssignment,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={currentAssignment.description}
                onChange={(e) =>
                  setCurrentAssignment({
                    ...currentAssignment,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-dueDate">Due Date</Label>
              <Input
                id="edit-dueDate"
                type="date"
                value={currentAssignment.dueDate}
                onChange={(e) =>
                  setCurrentAssignment({
                    ...currentAssignment,
                    dueDate: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-type">Assignment Type</Label>
              <Select
                value={currentAssignment.type}
                onValueChange={(value) =>
                  setCurrentAssignment({
                    ...currentAssignment,
                    type: value as "exit_ticket" | "quiz" | "test",
                  })
                }
              >
                <SelectTrigger id="edit-type">
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
              <Label htmlFor="edit-course">Course</Label>
              <Input
                id="edit-course"
                value={currentAssignment.course}
                onChange={(e) =>
                  setCurrentAssignment({
                    ...currentAssignment,
                    course: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button onClick={onEditAssignment}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAssignmentDialog;
