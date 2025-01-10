import { FC } from "react";
import { motion } from "framer-motion";
import { Assignment } from "./types";
import { Edit, Eye, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AssignmentCardProps {
  assignment: Assignment;
  onEdit: () => void;
  onView: () => void;
  onDelete: () => void;
}

const AssignmentCard: FC<AssignmentCardProps> = ({
  assignment,
  onEdit,
  onView,
  onDelete,
}) => {
  const progress =
    assignment.totalSubmissions === 0
      ? 0
      : (assignment.gradedSubmissions / assignment.totalSubmissions) * 100;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">{assignment.title}</h3>
        <p className="text-sm text-gray-500 mb-1">Type: {assignment.type}</p>
        <p className="text-sm text-gray-500 mb-1">
          Course: {assignment.course}
        </p>
        <p className="text-sm text-gray-500 mb-4">Due: {assignment.dueDate}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Submissions</span>
          <span className="text-sm">
            {assignment.gradedSubmissions} / {assignment.totalSubmissions}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 space-x-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={onView}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
          <Button variant="outline" size="sm" onClick={onDelete}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default AssignmentCard;
