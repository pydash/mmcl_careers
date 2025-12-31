import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get("session_email")?.value;
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notifications = await db.query(
      "SELECT id, title, message, sent_at as date FROM notifications WHERE acc_id = $1 AND channel = 'system' ORDER BY sent_at DESC;",
      [userId]
    );

    return NextResponse.json(notifications.rows);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}
