'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ForumCard from './ForumCard';
import ForumListItem from './ForumListItem';
import ForumTableView from './ForumTableView';
import ForumViewDialog from './ForumViewDialog';
import FilterSortSection from '@/components/filterSort';
import ViewSwitcher, { ViewType } from '@/components/filterSort/ViewSwitcher';

interface ForumClientProps {
  serverPosts: ForumPost[];
}

export interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string; // or Date, depending on your usage
  course: string;
  isFlagged: boolean;
  isLocked: boolean;
}

export default function ForumClient({ serverPosts }: ForumClientProps) {
  const [posts, setPosts] = useState<ForumPost[]>(serverPosts);
  const [currentPost, setCurrentPost] = useState<ForumPost | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Filter / sort / view state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewType, setViewType] = useState<ViewType>('card');

  // Unique courses for filter
  const uniqueCourses = Array.from(new Set(posts.map((p) => p.course)));

  // Toggling functions
  const handleToggleFlag = (id: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, isFlagged: !post.isFlagged } : post
      )
    );
  };
  const handleToggleLock = (id: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, isLocked: !post.isLocked } : post
      )
    );
  };

  // Filter + Sort logic
  const filteredAndSortedPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const matchesSearch = post.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCourse = filterCourse
          ? post.course === filterCourse
          : true;
        let matchesStatus = true;
        if (filterStatus === 'flagged') matchesStatus = post.isFlagged;
        else if (filterStatus === 'locked') matchesStatus = post.isLocked;
        else if (filterStatus === 'normal')
          matchesStatus = !post.isFlagged && !post.isLocked;

        return matchesSearch && matchesCourse && matchesStatus;
      })
      .sort((a, b) => {
        const aVal = a[sortBy as keyof ForumPost];
        const bVal = b[sortBy as keyof ForumPost];
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [posts, searchTerm, filterCourse, filterStatus, sortBy, sortOrder]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold">Forum</h2>
      </motion.div>

      {/* Filter + Sort Section */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* You can replace this entire block with your FilterSortSection
              or integrate your existing custom components. Below is an example. */}
          <FilterSortSection
            // search
            searchLabel="Search"
            searchPlaceholder="Search posts..."
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            // We can define one filter for course
            filters={[
              {
                id: 'course',
                label: 'Course',
                placeholder: 'All Courses',
                value: filterCourse,
                onValueChange: setFilterCourse,
                options: [
                  { label: 'All Courses', value: 'select' },
                  ...uniqueCourses.map((c) => ({ label: c, value: c }))
                ]
              },
              {
                id: 'status',
                label: 'Status',
                placeholder: 'All Status',
                value: filterStatus,
                onValueChange: setFilterStatus,
                options: [
                  { label: 'All Status', value: 'select' },
                  { label: 'Normal', value: 'normal' },
                  { label: 'Flagged', value: 'flagged' },
                  { label: 'Locked', value: 'locked' }
                ]
              }
            ]}
            // Sort
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            sortOptions={[
              { label: 'Title', value: 'title' },
              { label: 'Author', value: 'author' },
              { label: 'Date', value: 'date' },
              { label: 'Course', value: 'course' }
            ]}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-between"
        >
          {/* View Switcher */}
          <ViewSwitcher viewType={viewType} setViewType={setViewType} />
        </motion.div>
      </div>

      {/* Content: Card/List/Table */}
      <AnimatePresence mode="wait">
        {viewType === 'card' && (
          <motion.div
            key="card-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredAndSortedPosts.map((post) => (
              <ForumCard
                key={post.id}
                post={post}
                onView={() => {
                  setCurrentPost(post);
                  setIsViewModalOpen(true);
                }}
                onToggleFlag={handleToggleFlag}
                onToggleLock={handleToggleLock}
              />
            ))}
          </motion.div>
        )}

        {viewType === 'list' && (
          <motion.div
            key="list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {filteredAndSortedPosts.map((post) => (
              <ForumListItem
                key={post.id}
                post={post}
                onView={() => {
                  setCurrentPost(post);
                  setIsViewModalOpen(true);
                }}
                onToggleFlag={handleToggleFlag}
                onToggleLock={handleToggleLock}
              />
            ))}
          </motion.div>
        )}

        {viewType === 'table' && (
          <ForumTableView
            key="table-view"
            posts={filteredAndSortedPosts}
            onView={(post) => {
              setCurrentPost(post);
              setIsViewModalOpen(true);
            }}
            onToggleFlag={handleToggleFlag}
            onToggleLock={handleToggleLock}
          />
        )}
      </AnimatePresence>

      {/* Modal for "View" */}
      <ForumViewDialog
        isOpen={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        post={currentPost}
      />
    </div>
  );
}
