// app/register/route.ts
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { email, password, fullName, role } = await req.json()
  
  // This will sign up the user as an "anonymous" caller, 
  // but if you configured your RLS insert policy to allow it, 
  // it can still create a user record.
  // Or you can do supabase.auth.signUp(...) from a client component directly.
  // 1) Create the user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  // 2) Insert into your Prisma-managed table
  try {
    if (data.user) {
      await db.user.create({
        data: {
          id: data.user.id, // ensure this matches the Supabase Auth user
          email,
          role,      // 'student' | 'teacher' | 'admin'
          fullName,  // etc.
        },
      })
    } else {
      return NextResponse.json({ error: 'User data is null' }, { status: 400 })
    }
  } catch (err) {
    // if we fail, optionally delete the user from Supabase Auth
    if (data.user) {
      await supabase.auth.admin.deleteUser(data.user.id)
    }
    return NextResponse.json({ error: (err as Error).message }, { status: 400 })
  }
  return NextResponse.json({ message: 'User created successfully', data }, { status: 200 })
}
