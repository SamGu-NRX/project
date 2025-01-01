// 'use client'

// import { useEffect, useState } from 'react'
// import { createClient } from '@/lib/supabase/client'
// import { TodoItem, CourseProgress, Session } from '@/lib/types/dashboard'
// import { TodoList } from '@/components/dashboard/todo-list'
// import { CourseProgressCard } from '@/components/dashboard/course-progress'
// import { SessionList } from '@/components/dashboard/session-list'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { Skeleton } from '@/components/ui/skeleton'

// export default function DashboardPage() {
//   const [loading, setLoading] = useState(true)
//   const [todoItems, setTodoItems] = useState<TodoItem[]>([])
//   const [courseProgress, setCourseProgress] = useState<CourseProgress>({
//     completed: 0,
//     total: 0,
//     nextSession: { title: '', id: '' }
//   })
//   const [sessions, setSessions] = useState<Session[]>([])
//   const supabase = createClient()

//   useEffect(() => {
//     const loadDashboardData = async () => {
//       const { data: { user } } = await supabase.auth.getUser()
//       if (!user) return

//       // Fetch todo items (upcoming assignments and sessions)
//       const { data: assignments } = await supabase
//         .from('assignments')
//         .select('id, title, due_date, type, submissions(status)')
//         .order('due_date', { ascending: true })
//         .limit(5)

//       // Fetch course progress
//       const { data: progress } = await supabase
//         .from('session_progress')
//         .select('session_id')
//         .eq('student_id', user.id)

//       // Fetch sessions
//       const { data: sessionData } = await supabase
//         .from('sessions')
//         .select('*')
//         .order('sequence_order', { ascending: true })

//       if (assignments) {
//         setTodoItems(assignments.map(assignment => ({
//           id: assignment.id,
//           title: assignment.title,
//           dueDate: assignment.due_date,
//           type: 'assignment',
//           status: assignment.submissions?.[0]?.status || 'pending'
//         })))
//       }

//       if (progress && sessionData) {
//         const completedCount = progress.length
//         const totalCount = sessionData.length
//         const nextIncompleteSession = sessionData.find(session =>
//           !progress.some(p => p.session_id === session.id)
//         )

//         setCourseProgress({
//           completed: completedCount,
//           total: totalCount,
//           nextSession: nextIncompleteSession
//             ? { title: nextIncompleteSession.title, id: nextIncompleteSession.id }
//             : { title: 'All sessions completed!', id: '' }
//         })

//         setSessions(sessionData.map((session, index) => ({
//           id: session.id,
//           title: session.title,
//           description: session.description || '',
//           videoUrl: session.video_url,
//           isCompleted: progress.some(p => p.session_id === session.id),
//           isLocked: index > 0 && !progress.some(p => p.session_id === sessionData[index - 1].id)
//         })))
//       }

//       setLoading(false)
//     }

//     loadDashboardData()
//   }, [])

//   if (loading) {
//     return (
//       <div className="space-y-6">
//         <Skeleton className="h-12 w-[250px]" />
//         <div className="grid gap-6 md:grid-cols-2">
//           {[1, 2].map((i) => (
//             <Skeleton key={i} className="h-[200px]" />
//           ))}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-8">
//       <div className="grid gap-6 md:grid-cols-2">
//         <CourseProgressCard progress={courseProgress} />
//         <div className="space-y-4">
//           <h3 className="font-semibold">Upcoming Tasks</h3>
//           <TodoList items={todoItems} />
//         </div>
//       </div>

//       <Tabs defaultValue="sessions" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="sessions">Sessions</TabsTrigger>
//           <TabsTrigger value="assignments">Assignments</TabsTrigger>
//         </TabsList>
//         <TabsContent value="sessions" className="space-y-4">
//           <SessionList sessions={sessions} />
//         </TabsContent>
//         <TabsContent value="assignments">
//           <p className="text-muted-foreground text-center py-8">
//             Assignment view coming soon...
//           </p>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// (Server Component Example)
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Now let's query our RLS-protected "users" table
  // If RLS says "id = auth.uid()", user will only get their row
  const { data: userRows, error } = await supabase.from("users").select("*");

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <pre>{JSON.stringify(userRows, null, 2)}</pre>
    </div>
  );
}
