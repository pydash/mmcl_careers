import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { getUserId } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const recent_applications_query_result = await db
      .query(
        `SELECT 
          a.id, 
          jp.title AS position, 
          a.status, 
          a.applied_at
        FROM applications a 
        LEFT JOIN job_posts jp ON a.job_id = jp.id 
        WHERE a.profile_id = $1 
        ORDER BY applied_at DESC LIMIT 5;`,
        [userId],
      )
      .then((res: any) => res.rows);

    return NextResponse.json(recent_applications_query_result);
  } catch (error) {
    console.error("Error fetching recent applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent applications" },
      { status: 500 },
    );
  }
}
