'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import FilterSortSection, {
  FilterOption,
  SortOption
} from '@/components/filterSort';
import CreateAssignmentDialog from './CreateAssignmentDialog';
import EditAssignmentDialog from './EditAssignmentDialog';
import ViewAssignmentDialog from './ViewAssignmentDialog';
import GradeSubmissionDialog from './GradeSubmissionDialog';
import AssignmentCard from './AssignmentCard';
import {
  Assignment,
  Submission,
  SubmissionAnswer,
  AssignmentQuestion
} from './types';

interface AssignmentsClientProps {
  // Data fetched by server component in page.tsx
  serverAssignments: Assignment[];
  serverSubmissions?: Submission[]; // optional if you pass them in
}

export default function AssignmentsClient({
  serverAssignments,
  serverSubmissions = []
}: AssignmentsClientProps) {
  // ---------------------------------------------
  // State
  // ---------------------------------------------
  const [assignments, setAssignments] =
    useState<Assignment[]>(serverAssignments);
  const [submissions, setSubmissions] =
    useState<Submission[]>(serverSubmissions);

  // Dialog states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);

  // Current selection
  const [currentAssignment, setCurrentAssignment] = useState<Assignment | null>(
    null
  );
  const [currentSubmission, setCurrentSubmission] = useState<Submission | null>(
    null
  );

  // Creating a new assignment
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    title: '',
    description: '',
    dueDate: '',
    type: 'quiz',
    course: ''
  });

  // ---------------------------------------------
  // Filtering & Sorting
  // ---------------------------------------------
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [sortBy, setSortBy] = useState('dueDate'); // default sort
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Prepare Filter Options
  const typeOptions: FilterOption[] = [
    { label: 'All Types', value: 'select' },
    { label: 'Exit Ticket', value: 'exit_ticket' },
    { label: 'Quiz', value: 'quiz' },
    { label: 'Test', value: 'test' }
  ];

  // For course filter, dynamically build list
  const uniqueCourses = useMemo(
    () => Array.from(new Set(assignments.map((a) => a.course))),
    [assignments]
  );
  const courseOptions: FilterOption[] = [
    { label: 'All Courses', value: 'select' },
    ...uniqueCourses.map((course) => ({ label: course, value: course }))
  ];

  // Prepare Sort Options
  const sortOptions: SortOption[] = [
    { label: 'Title', value: 'title' },
    { label: 'Due Date', value: 'dueDate' },
    { label: 'Type', value: 'type' },
    { label: 'Course', value: 'course' }
  ];

  // Filter + Sort Logic
  const filteredAndSortedAssignments = useMemo(() => {
    return assignments
      .filter((assignment) => {
        const matchesSearch = assignment.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesType = filterType ? assignment.type === filterType : true;
        const matchesCourse = filterCourse
          ? assignment.course === filterCourse
          : true;

        return matchesSearch && matchesType && matchesCourse;
      })
      .sort((a, b) => {
        if ((a as any)[sortBy] < (b as any)[sortBy]) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if ((a as any)[sortBy] > (b as any)[sortBy]) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
  }, [assignments, searchTerm, filterType, filterCourse, sortBy, sortOrder]);

  // ---------------------------------------------
  // Handlers
  // ---------------------------------------------
  const handleCreateAssignment = () => {
    // You'd likely call an API or server action here
    const nextId = assignments.length
      ? Math.max(...assignments.map((a) => a.id)) + 1
      : 1;
    const assignment: Assignment = {
      id: nextId,
      title: newAssignment.title ?? '',
      description: newAssignment.description ?? '',
      dueDate: newAssignment.dueDate ?? '',
      type: newAssignment.type ?? 'quiz',
      course: newAssignment.course ?? '',
      totalSubmissions: 0,
      gradedSubmissions: 0,
      questions: []
    };
    setAssignments((prev) => [...prev, assignment]);

    // reset form
    setNewAssignment({
      title: '',
      description: '',
      dueDate: '',
      type: 'quiz',
      course: ''
    });
    setIsCreateModalOpen(false);
  };

  const handleEditAssignment = () => {
    if (!currentAssignment) return;

    // In real app, call an API to update in DB
    setAssignments((prev) =>
      prev.map((a) => (a.id === currentAssignment.id ? currentAssignment : a))
    );
    setIsEditModalOpen(false);
  };

  const handleDeleteAssignment = (id: number) => {
    // In real app, call an API to delete from DB
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleGradeSubmission = () => {
    if (!currentSubmission) return;

    // Update local submission’s state
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === currentSubmission.id
          ? { ...currentSubmission, status: 'graded' }
          : sub
      )
    );
    setIsGradeModalOpen(false);
  };

  // ---------------------------------------------
  // Render
  // ---------------------------------------------
  return (
    <div className="space-y-6">
      {/* Header row: Title + Create button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Assignments</h2>

        {/* Create Assignment Dialog */}
        <CreateAssignmentDialog
          isOpen={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          newAssignment={newAssignment}
          setNewAssignment={setNewAssignment}
          onCreateAssignment={handleCreateAssignment}
        />
      </div>

      {/* Filter + Sort Section */}
      <FilterSortSection
        // Search
        searchLabel="Search"
        searchPlaceholder="Search assignments..."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        // Filters
        filters={[
          {
            id: 'filterType',
            label: 'Type',
            placeholder: 'All Types',
            value: filterType,
            onValueChange: setFilterType,
            options: typeOptions
          },
          {
            id: 'filterCourse',
            label: 'Course',
            placeholder: 'All Courses',
            value: filterCourse,
            onValueChange: setFilterCourse,
            options: courseOptions
          }
        ]}
        // Sorter
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortOptions={sortOptions}
      />

      {/* Assignment Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredAndSortedAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onEdit={() => {
                setCurrentAssignment(assignment);
                setIsEditModalOpen(true);
              }}
              onView={() => {
                setCurrentAssignment(assignment);
                setIsViewModalOpen(true);
              }}
              onDelete={() => handleDeleteAssignment(assignment.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Edit Assignment Dialog */}
      <EditAssignmentDialog
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        currentAssignment={currentAssignment}
        setCurrentAssignment={setCurrentAssignment}
        onEditAssignment={handleEditAssignment}
      />

      {/* View Assignment Dialog (includes submissions) */}
      <ViewAssignmentDialog
        isOpen={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        currentAssignment={currentAssignment}
        setCurrentAssignment={setCurrentAssignment}
        submissions={submissions}
        setIsGradeModalOpen={setIsGradeModalOpen}
        setCurrentSubmission={setCurrentSubmission}
      />

      {/* Grade Submission Dialog */}
      <GradeSubmissionDialog
        isOpen={isGradeModalOpen}
        onOpenChange={setIsGradeModalOpen}
        currentSubmission={currentSubmission}
        setCurrentSubmission={setCurrentSubmission}
        currentAssignment={currentAssignment}
        onGradeSubmission={handleGradeSubmission}
      />
    </div>
  );
}
