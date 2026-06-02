import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const jobs = await sql`
      SELECT public_id, title, department, employment_type, expiry_date, created_at
      FROM job_posts
      WHERE status = 'Open'
      ORDER BY created_at DESC
      LIMIT 6;
    `;

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}
