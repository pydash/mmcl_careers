import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const totalJobsResult = await db.query(
      `SELECT COUNT(*) AS total_jobs FROM job_posts`,
    );
    const totalApplicationsResult = await db.query(
      `SELECT COUNT(*) AS total_applications FROM job_applications`,
    );
    const openJobsResult = await db.query(
      `SELECT COUNT(*) AS open_jobs FROM job_posts WHERE is_active = true`,
    );
    const pendingApplicationsResult = await db.query(
      `SELECT COUNT(*) AS pending_applications FROM job_applications WHERE status = 'pending'`,
    );

    const pipeline_health = await db.query(
      `SELECT json_build_object(
                'applied_count', (SELECT COUNT(*) FROM job_applications WHERE status = 'pending'),
                'interview_count', (SELECT COUNT(*) FROM job_applications WHERE status = 'interview'),
                'offer_count', (SELECT COUNT(*) FROM job_applications WHERE status = 'offer')
            ) AS pipeline_health`,
    );

    const interviews = await db.query(
      `SELECT
            ja.id AS application_id,
            ja.status,
            up.first_name || ' ' || up.middle_name || ' ' || up.last_name AS name,
            ji.scheduled_at
        FROM job_applications ja
        LEFT JOIN job_posts jp ON ja.job_id = jp.id
        LEFT JOIN job_interviews ji ON ji.app_id = ja.id
        LEFT JOIN user_accounts ua ON ua.id = ja.acc_id
        LEFT JOIN user_profiles up ON up.id = ua.id
        WHERE ja.status = 'interview'
        ORDER BY ja.applied_at DESC
        LIMIT 3
        `,
    );

    const recent_applicants = await db.query(
      `SELECT
            ja.id,
            ja.status,
            up.first_name || ' ' || up.middle_name || ' ' || up.last_name AS name,
            jp.title,
            ja.applied_at
        FROM job_applications ja
        LEFT JOIN job_posts jp ON ja.job_id = jp.id
        LEFT JOIN user_accounts ua ON ua.id = ja.acc_id
        LEFT JOIN user_profiles up ON up.id = ua.id
        WHERE ja.status = 'pending'
        ORDER BY ja.applied_at DESC
        LIMIT 5
        `,
    );

    const dashboardData = {
      stats: {
        total_jobs: parseInt(totalJobsResult.rows[0].total_jobs, 10),
        total_applications: parseInt(
          totalApplicationsResult.rows[0].total_applications,
          10,
        ),
        open_jobs: parseInt(openJobsResult.rows[0].open_jobs, 10),
        pending_applications: parseInt(
          pendingApplicationsResult.rows[0].pending_applications,
          10,
        ),
      },
      pipeline: {
        pipeline_health: pipeline_health.rows[0].pipeline_health,
      },
      interviews: interviews.rows,
      recent_applicants: recent_applicants.rows,
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 },
    );
  }
}
