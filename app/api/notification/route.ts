import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get("session_email")?.value;

    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(
      "SELECT id FROM user_accounts WHERE email = $1",
      [email]
    );
    console.log("Email getting worked and id fetched", result);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = result.rows[0].id;

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Implement POST logic to create a notification
    const notification = {
      id: Date.now(),
      ...body,
      createdAt: new Date(),
    };

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    );
  }
}
