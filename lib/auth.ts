import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function getSessionUserFromRequest(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;

  if (!token) return null;

  const result = await db.query(
    `
    SELECT user_accounts.id, user_accounts.email, user_accounts.role
    FROM sessions
    JOIN user_accounts ON sessions.user_id = user_accounts.id
    WHERE sessions.session_token = $1
      AND sessions.expires_at > NOW()
    `,
    [token],
  );

  return result.rows[0] || null;
}

export async function getUserIdFromSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) {
    return null;
  }

  const result = await db.query(
    `
    SELECT user_id
    FROM sessions
    WHERE session_token = $1
      AND expires_at > NOW()
    `,
    [token],
  );

  return result.rows[0]?.user_id || null;
}
