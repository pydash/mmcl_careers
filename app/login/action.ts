"use server";

import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

type LoginState = { error?: string | null };

export async function login(prevState: LoginState, formData: FormData) {
  const email = (formData.get("email") as string | null)?.trim();
  const password = formData.get("password") as string | null;

  if (!email || !password) {
    return { error: "Email and password are required." } as LoginState;
  }

  try {
    // Fetch user from database
    const result = await pool.query(
      "SELECT id, email, password_hash FROM user_accounts WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return { error: "Invalid email or password." } as LoginState;
    }

    const user = result.rows[0];

    // Compare password with hash
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return { error: "Invalid email or password." } as LoginState;
    }

    // Create session cookies
    const token = randomUUID();
    const cookieStore = await cookies();
    const maxAge = 60 * 60 * 24 * 7; // 7 days

    cookieStore.set("session_token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    cookieStore.set("session_email", email, {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    return { error: null } as LoginState;
  } catch (error: any) {
    const errorMsg = error?.message || "Unknown error";
    console.error("Error logging in user:", errorMsg);
    return { error: "Failed to log in" } as LoginState;
  }
}
