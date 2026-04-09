import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { getUserId } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const total_applications = await db
      .query("SELECT COUNT(*) FROM applications WHERE profile_id = $1;", [
        userId,
      ])
      .then((res: any) => res.rows[0]);

    const pending_applications = await db
      .query(
        "SELECT COUNT(*) FROM applications WHERE profile_id = $1 AND status = 'Pending';",
        [userId],
      )
      .then((res: any) => res.rows[0]);

    const interview_count = await db
      .query(
        `SELECT 
          COUNT(*) 
        FROM interviews i 
        LEFT JOIN applications a ON i.app_id = a.id 
        WHERE a.profile_id = $1 AND i.scheduled_at >= NOW();
        `,
        [userId],
      )
      .then((res: any) => res.rows[0]);

    const overview_query_result = {
      total_applications: total_applications.count,
      pending_applications: pending_applications.count,
      upcoming_interviews: interview_count.count,
    };

    return NextResponse.json(overview_query_result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Unknown error" },
      { status: 500 },
    );
  }
}
