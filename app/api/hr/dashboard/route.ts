import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const totalJobsResult = await db.query(
      `SELECT COUNT(*) AS total_jobs FROM job_posts`,
    );
    const totalApplicationsResult = await db.query(
      `SELECT COUNT(*) AS total_applications FROM applications`,
    );
    const openJobsResult = await db.query(
      `SELECT COUNT(*) AS open_jobs FROM job_posts WHERE status = 'Open'`,
    );
    const pendingApplicationsResult = await db.query(
      `SELECT COUNT(*) AS pending_applications FROM applications WHERE status = 'Pending'`,
    );

    const pipeline_health = await db.query(
      `SELECT json_build_object(
                'applied_count', (SELECT COUNT(*) FROM applications WHERE status = 'Pending'),
                'interview_count', (SELECT COUNT(*) FROM applications WHERE status = 'Interview'),
                'offer_count', (SELECT COUNT(*) FROM applications WHERE status = 'Offer')
            ) AS pipeline_health`,
    );

    const interviews = await db.query(
      `SELECT
            a.id AS application_id,
            a.status,
            up.first_name || ' ' || up.middle_name || ' ' || up.last_name AS name,
            ji.scheduled_at
        FROM applications a
        LEFT JOIN job_posts jp ON a.job_id = jp.id
        LEFT JOIN interviews ji ON ji.app_id = a.id
        LEFT JOIN user_accounts ua ON ua.id = a.profile_id
        LEFT JOIN user_profiles up ON up.id = ua.id
        WHERE a.status = 'interview'
        ORDER BY a.created_at DESC
        LIMIT 3
        `,
    );

    const recent_applicants = await db.query(
      `SELECT
            a.id,
            a.status,
            up.first_name || ' ' || up.middle_name || ' ' || up.last_name AS name,
            jp.title,
            a.created_at AS applied_at
        FROM applications a
        LEFT JOIN job_posts jp ON a.job_id = jp.id
        LEFT JOIN user_accounts ua ON ua.id = a.profile_id
        LEFT JOIN user_profiles up ON up.id = ua.id
        WHERE a.status = 'pending'
        ORDER BY a.created_at DESC
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
