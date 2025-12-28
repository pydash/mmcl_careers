"use server";

import pool from "@/lib/db";
import { hashPassword } from "@/utils/hashPass";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

type SignupState = { error?: string | null };

export async function signup(prevState: SignupState, formData: FormData) {
  const email = (formData.get("email") as string | null)?.trim();
  const password = formData.get("password") as string | null;
  const confirmPassword = formData.get("confirmPassword") as string | null;

  if (!email || !password) {
    return { error: "Email and password are required." } as SignupState;
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." } as SignupState;
  }

  try {
    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      "INSERT INTO user_accounts (email, password_hash) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    console.log("User inserted successfully:", result.rowCount);

    // issue a simple session token and email cookie
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

    return { error: null } as SignupState;
  } catch (error: any) {
    const errorMsg = error?.message || "Unknown error";
    const errorCode = error?.code || "";
    console.error("Error inserting user:", errorMsg, errorCode);

    // Return specific error messages for common cases
    if (errorCode === "23505") {
      return { error: "Email already exists" } as SignupState;
    }

    return { error: `Failed to create user: ${errorMsg}` } as SignupState;
  }
}
