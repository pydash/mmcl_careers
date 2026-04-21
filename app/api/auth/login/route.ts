import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await db.query(
      "SELECT id, email, password_hash, role FROM user_accounts WHERE email = $1",
      [email],
    );

    if (user.rowCount === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const userData = user.rows[0];
    const isPasswordValid = await bcrypt.compare(
      password,
      userData.password_hash,
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Create session token
    const token = randomUUID();
    const cookieStore = await cookies();
    const maxAge = 60 * 60 * 24 * 1; // 1 day

    await db.query(
      "INSERT INTO sessions (user_id, role, session_token, expires_at) VALUES ($1, $2, $3, NOW() + INTERVAL '1 day')",
      [userData.id, userData.role, token],
    );

    const userRole = await db
      .query("SELECT role FROM user_accounts WHERE id = $1", [userData.id])
      .then((res: any) => res.rows[0].role);

    cookieStore.set("session_token", token, {
      maxAge,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json({ message: "Login successful", role: userRole });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
