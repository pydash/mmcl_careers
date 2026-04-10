import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserId } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(
      `
            SELECT 
                u.email,
                s.theme_preference,
                s.email_notifications,
                s.system_notifications
            FROM user_accounts u
            LEFT JOIN user_settings s ON u.id = s.id
            WHERE u.id = $1
            `,
      [userId],
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 },
    );
  }
}
