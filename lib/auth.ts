import { cookies } from "next/headers";
import db from "@/lib/db";

async function getSessionToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const session_token = await cookieStore.get("session_token");
    if (!session_token) {
      return null;
    }

    return session_token.value || null;
  } catch (error) {
    console.error("Error occurred while fetching session token:", error);
    return null;
  }
}

async function getUserId(): Promise<string | null> {
  try {
    const sessionToken = await getSessionToken();
    if (!sessionToken) {
      return null;
    }

    const result = await db.query(
      `SELECT user_id FROM sessions WHERE session_token = $1;`,
      [sessionToken],
    );

    const userId = result?.rows?.[0]?.user_id;
    if (!userId) {
      return null;
    }

    return userId;
  } catch (error) {
    console.error("Error occurred while fetching user ID:", error);
    return null;
  }
}

export { getSessionToken, getUserId };
