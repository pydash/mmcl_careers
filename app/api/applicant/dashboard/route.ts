import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getUserId } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getUserId();

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const latestAppIdResult = await sql`
            SELECT id
            FROM applications
            WHERE profile_id = ${userId}
            ORDER BY id DESC
            LIMIT 1
        `;

    const latestAppId = latestAppIdResult[0]?.id;

    const app_stage_history = await sql`
            SELECT jp.title, ash.application_id, ash.stage, ash.status, ash.created_at
            FROM application_stage_history ash
            LEFT JOIN applications a ON ash.application_id = a.id
            LEFT JOIN job_posts jp ON a.job_id = jp.id
            WHERE ash.application_id = ${latestAppId}
            ORDER BY ash.created_at DESC
        `;

    const recent_applications = await sql`
            SELECT a.id, jp.title, a.status, a.created_at
            FROM applications a
            LEFT JOIN job_posts jp ON a.job_id = jp.id
            WHERE profile_id = ${userId}
            ORDER BY created_at DESC
            LIMIT 3
        `;
    const job_recommendations = await sql`
            SELECT public_id, title, department, expiry_date, created_at
            FROM job_posts
            ORDER BY created_at DESC
            LIMIT 4
        `;

    const upcoming_interviews = await sql`
            SELECT i.id, i.application_id, jp.title AS job_title, i.title, i.scheduled_date, i.mode, i.meeting_link, i.status, i.created_at
            FROM interviews i
            LEFT JOIN applications a ON i.application_id = a.id
            LEFT JOIN job_posts jp ON a.job_id = jp.id
            WHERE a.profile_id = ${userId}
            ORDER BY i.created_at DESC
            LIMIT 6
        `;
    const payload = {
      app_stage_history,
      recent_applications,
      job_recommendations,
      upcoming_interviews,
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
