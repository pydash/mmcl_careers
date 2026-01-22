"use server";

import db from "@/lib/db";
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

    const result = await db.query(
      "INSERT INTO user_accounts (email, password_hash) VALUES ($1, $2)",
      [email, hashedPassword],
    );

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
