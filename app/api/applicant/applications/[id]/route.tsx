import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getUserId, getUserRole } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const userId = await getUserId();
    const userRole = await getUserRole();

    if (!userId || userRole !== "APPLICANT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const application_details = await sql`
      SELECT a.id, a.status, a.notes, a.pitch, a.score, a.created_at, jp.title, jp.department
      FROM applications a
      LEFT JOIN job_posts jp ON a.job_id = jp.id
      WHERE a.profile_id = ${userId} AND a.id = ${id}
    `;

    const stage_history = await sql`
      SELECT *
      FROM application_stage_history
      WHERE application_id = ${id}
    `;

    const result = {
      application: application_details[0],
      stage_history: stage_history,
    };

    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching application", error);
    return NextResponse.json(
      { error: "Failed to fetch application" },
      { status: 500 },
    );
  }
}
