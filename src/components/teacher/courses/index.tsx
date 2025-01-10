"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Dialog } from "@/components/ui/dialog"
import FilterSortSection from "@/components/filterSort"
import ViewSwitcher from "@/components/filterSort/ViewSwitcher"
import CourseCreateDialog from "./CourseCreateDialog"
import CourseEditDialog from "./CourseEditDialog"
import CourseViewDialog from "./CourseViewDialog"
import CourseGrid from "./CourseGrid"

// ---------- Define your Course type ----------
// URGENT TODO: align with prisma schema that is generated in "data" folder
export interface Course {
  id: number
  title: string
  description: string
  bootcampName: string
  session: string
  cohort: string
  students: number
  progress: number
}

// ---------- Props for the client component ----------
interface CoursesClientProps {
  serverCourses: Course[]
}

export default function CoursesClient({ serverCourses }: CoursesClientProps) {
  // Local state
  const [courses, setCourses] = useState<Course[]>(serverCourses)
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  // Filter / Sorting
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBootcamp, setFilterBootcamp] = useState("")
  const [filterSession, setFilterSession] = useState("")
  const [filterCohort, setFilterCohort] = useState("")
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // View type state (card, list, table, etc.) if you want to switch layouts
  const [viewType, setViewType] = useState<"card" | "list" | "table">("card")

  // Unique filter values
  const uniqueBootcamps = Array.from(new Set(courses.map((c) => c.bootcampName)))
  const uniqueSessions = Array.from(new Set(courses.map((c) => c.session)))
  const uniqueCohorts = Array.from(new Set(courses.map((c) => c.cohort)))

  // -------------------------
  // Filtering + Sorting Logic
  // -------------------------
  const filteredAndSortedCourses = useMemo(() => {
    // Filtering
    let temp = courses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesBootcamp = filterBootcamp
        ? course.bootcampName === filterBootcamp
        : true
      const matchesSession = filterSession
        ? course.session === filterSession
        : true
      const matchesCohort = filterCohort ? course.cohort === filterCohort : true

      return matchesSearch && matchesBootcamp && matchesSession && matchesCohort
    })

    // Sorting
    temp.sort((a, b) => {
        const aVal = a[sortBy as keyof Course];
        const bVal = b[sortBy as keyof Course];
        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0
    })

    return temp
  }, [
    courses,
    searchTerm,
    filterBootcamp,
    filterSession,
    filterCohort,
    sortBy,
    sortOrder,
  ])

  // -------------------------
  // CRUD Handlers (client-side for now)
  // Eventually swap with server actions or API calls
  // -------------------------
  const handleCreateCourse = (course: Omit<Course, "id" | "students" | "progress">) => {
    const newCourse: Course = {
      id: courses.length + 1, // or use actual DB ID from server
      ...course,
      students: 0,
      progress: 0,
    }
    setCourses([...courses, newCourse])
    setCreateDialogOpen(false)
  }

  const handleEditCourse = (updated: Course) => {
    const updatedCourses = courses.map((c) => (c.id === updated.id ? updated : c))
    setCourses(updatedCourses)
    setEditDialogOpen(false)
  }

  const handleDeleteCourse = (id: number) => {
    const updatedCourses = courses.filter((course) => course.id !== id)
    setCourses(updatedCourses)
  }

  // ---------------
  // Render
  // ---------------
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header + Create Dialog */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Courses</h2>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <CourseCreateDialog onCreate={handleCreateCourse} />
        </Dialog>
      </div>

      {/* Filter & Sort + View Switcher Section */}
      <div className="flex flex-col gap-4">
        {/* You already have FilterSortSection which includes search and sorting, or you can integrate directly */}
        <FilterSortSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchLabel="Search"
          searchPlaceholder="Search courses..."
          filters={[
            {
              id: "bootcamp",
              label: "Bootcamp",
              placeholder: "All Bootcamps",
              value: filterBootcamp,
              onValueChange: setFilterBootcamp,
              options: [
                { label: "All Bootcamps", value: "select" },
                ...uniqueBootcamps.map((b) => ({ label: b, value: b })),
              ],
            },
            {
              id: "session",
              label: "Session",
              placeholder: "All Sessions",
              value: filterSession,
              onValueChange: setFilterSession,
              options: [
                { label: "All Sessions", value: "select" },
                ...uniqueSessions.map((s) => ({ label: s, value: s })),
              ],
            },
            {
              id: "cohort",
              label: "Cohort",
              placeholder: "All Cohorts",
              value: filterCohort,
              onValueChange: setFilterCohort,
              options: [
                { label: "All Cohorts", value: "select" },
                ...uniqueCohorts.map((c) => ({ label: c, value: c })),
              ],
            },
          ]}
          sortBy={sortBy}
          setSortBy={(value: string) => setSortBy(value as keyof Course)}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          sortOptions={[
            { label: "Title", value: "title" },
            { label: "Bootcamp", value: "bootcampName" },
            { label: "Session", value: "session" },
            { label: "Cohort", value: "cohort" },
            { label: "Students", value: "students" },
            { label: "Progress", value: "progress" },
          ]}
        />

        {/* View Switcher (Card / List / Table, etc.) */}
        <div className="flex">
          <ViewSwitcher viewType={viewType} setViewType={setViewType} />
        </div>
      </div>

      {/* Actual rendered Courses */}
      <CourseGrid
        viewType={viewType}
        courses={filteredAndSortedCourses}
        onEdit={(course) => {
          setCurrentCourse(course)
          setEditDialogOpen(true)
        }}
        onView={(course) => {
          setCurrentCourse(course)
          setViewDialogOpen(true)
        }}
        onDelete={handleDeleteCourse}
      />

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        {currentCourse && (
          <CourseEditDialog
            course={currentCourse}
            onSave={handleEditCourse}
          />
        )}
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        {currentCourse && <CourseViewDialog course={currentCourse} />}
      </Dialog>
    </motion.div>
  )
}
