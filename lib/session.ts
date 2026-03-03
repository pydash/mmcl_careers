import db from "@/lib/db";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { Session } from "@/models/Session";

const SESSION_DURATION = 60 * 60 * 24 * 1; // 1 day

export async function createSession(userId: string, email: string) {
  const token = randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION * 1000);

  const response = await db.query<Session>(
    "INSERT INTO sessions (user_id, session_token, expires_at) VALUES ($1, $2, $3)",
    [userId, token, expiresAt],
  );

  const cookieStore = await cookies();
  cookieStore.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });

  return response;
}
