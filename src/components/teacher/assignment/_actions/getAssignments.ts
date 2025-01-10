import { db } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { Assignment } from '..';

export async function getAssignments() {
  // Example: Using a supabase client for session or user checks
  const supabase = await createClient();
  // const { data: { session } } = await supabase.auth.getSession()
  // if (!session) { throw new Error("Not authenticated") }

  // Retrieve from your Prisma model "forumPost" or similar
  const forumPosts = await db.assignment.findMany({
    orderBy: {
      date: 'desc'
    }
  });

  // Return in the shape your UI expects
  return forumPosts.map((post: ForumPost) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    author: post.author,
    date: post.date.split('T')[0],
    course: post.course,
    isFlagged: post.isFlagged,
    isLocked: post.isLocked
  }));
}
