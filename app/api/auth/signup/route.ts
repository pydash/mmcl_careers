import db from "@/lib/db";
import { createSession } from "@/lib/session";
import { hashPassword } from "@/utils/hashPass";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password, confirmPassword } = await request.json();

  const trimmedEmail = email?.trim();

  if (!trimmedEmail || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "Passwords do not match." },
      { status: 400 },
    );
  }

  try {
    const hashedPassword = await hashPassword(password);

    const result = await db.query(
      "INSERT INTO user_accounts (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id",
      [trimmedEmail, hashedPassword, "applicant"],
    );

    const userId = result.rows[0].id;

    // Create session
    const session_response = await createSession(userId, trimmedEmail);

    if (!session_response) {
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    const errorMsg = error?.message || "Unknown error";
    const errorCode = error?.code || "";
    console.error("Error inserting user:", errorMsg, errorCode);

    // Return specific error messages for common cases
    if (errorCode === "23505") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: `Failed to create user: ${errorMsg}` },
      { status: 500 },
    );
  }
}
