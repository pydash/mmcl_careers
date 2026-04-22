import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { ALL_JOBS_QUERY } from "@/lib/queries/hr/all_jobs_query";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(ALL_JOBS_QUERY).then((res: any) => res.rows);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  {
    try {
      const cookieStore = await cookies();
      const sessionToken = cookieStore.get("session_token")?.value;

      if (!sessionToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const userId = await db
        .query(
          "SELECT user_id FROM sessions WHERE session_token = $1 AND expires_at > NOW()",
          [sessionToken],
        )
        .then((res: any) => res.rows[0]?.user_id);

      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const data = await request.json();

      const {
        is_active,
        title,
        job_type,
        department,
        deadline_date,
        description,
        responsibilities,
        requirements,
        salary_min,
        salary_max,
      } = data;

      const insertQuery = `
      INSERT INTO job_posts
      (public_id, is_active, title, employment_type, department, expiry_date, description, responsibilities, requirements, salary_min, salary_max, posted_by)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id
    `;

      const values = [
        is_active,
        title,
        job_type,
        department,
        deadline_date,
        description,
        responsibilities,
        requirements,
        salary_min,
        salary_max,
        userId,
      ];

      const result = await db.query(insertQuery, values);
      const newJobId = result.rows[0].id;

      return NextResponse.json(
        { success: true, jobId: newJobId },
        { status: 201 },
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to post job" },
        { status: 500 },
      );
    }
  }
}
