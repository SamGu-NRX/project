"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { LoginFormValues, RegisterFormValues } from "@/schema/auth";
import { loginSchema, registerSchema } from "@/schema/auth";

export async function registerAction(data: RegisterFormValues) {
  const supabase = await createClient();

  // Validate with Zod
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    return {
      error: result.error.errors[0].message,
      status: 400,
    };
  }

  const { firstName, lastName, email, password } = data;
  const fullName = `${firstName} ${lastName}`;

  try {
    // 1) Sign up with Supabase
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { error: error.message, status: 400 };
    }

    if (!authData?.user) {
      return { error: "No user returned from Supabase", status: 400 };
    }

    // 2) Create Prisma user record
    try {
      await db.user.create({
        data: {
          id: authData.user.id,
          email,
          fullName,
          role: "student" as Role,
        },
      });
    } catch (dbErr: any) {
      await supabase.auth.admin.deleteUser(authData.user.id);
      return { error: `Database error: ${dbErr.message}`, status: 500 };
    }

    return { success: true, user: authData.user };
  } catch (err: any) {
    return { error: err.message || "Server error", status: 500 };
  }
}

export async function loginAction(data: LoginFormValues) {
  const supabase = await createClient();

  // Validate with Zod
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    return {
      error: result.error.errors[0].message,
      status: 400,
    };
  }

  const { email, password } = data;

  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message, status: 400 };
    }

    if (!authData?.user) {
      return { error: "No user object returned", status: 400 };
    }

    return { success: true, user: authData.user };
  } catch (err: any) {
    return { error: err.message || "Server error", status: 500 };
  }
}

export async function signInWithOAuth(provider: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      return { error: error.message, status: 400 };
    }

    return { success: true, url: data.url };
  } catch (err: any) {
    // Server error
    return { error: err.message || "Server error", status: 500 };
  }
}
