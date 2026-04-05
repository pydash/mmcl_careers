import { NextRequest, NextResponse } from "next/server";
import { getUserRole } from "@/lib/auth";
import db from "@/lib/db";

// GET /api/jobs/[public_id]/applications
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userRole = await getUserRole();
    const { id } = await params;

    if (!userRole) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jobResult = await db.query(
      "SELECT id FROM job_postings WHERE public_id = $1",
      [id],
    );

    if (!jobResult.rows.length) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const jobId = jobResult.rows[0].id;

    const applicationsResult = await db.query(
      `SELECT 
          a.id,
          a.status,
          CONCAT(up.first_name, ' ', up.middle_name, ' ', up.last_name) AS name,
          up.email_address,
          up.mobile_number,
          a.created_at AS applied_at
        FROM applications a 
        LEFT JOIN user_profiles up ON a.profile_id = up.id 
        LEFT JOIN job_postings jp ON a.job_id = jp.id 
        WHERE a.job_id = $1 
        ORDER BY a.created_at DESC`,
      [jobId],
    );

    return NextResponse.json(applicationsResult.rows);
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch job applications" },
      { status: 500 },
    );
  }
}
