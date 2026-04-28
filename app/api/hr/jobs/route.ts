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

    const result = await db
      .query(
        `
      SELECT
        jp.id,
        jp.public_id,
        jp.title,
        jp.created_at AS date_posted,
        COUNT(a.id) AS total_applicants,
        jp.status
      FROM job_posts jp
      LEFT JOIN applications a ON a.job_id = jp.id
      GROUP BY jp.id, jp.title
      ORDER BY jp.created_at DESC;
      `,
      )
      .then((res: any) => res.rows);

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
        title,
        department,
        employment_type,
        teaching_type,
        description,
        responsibilities,
        requirements,
        status,
        expiry_date,
        salary,
      } = data;

      const user_name = await db
        .query(
          "SELECT CONCAT(first_name, ' ', last_name) AS name FROM user_profiles WHERE id = $1",
          [userId],
        )
        .then((res: any) => res.rows[0]?.name);

      const public_id = crypto.randomUUID();

      const result = await db
        .query(
          `
          INSERT INTO job_posts
          (title, department, employment_type, teaching_type, description, responsibilities, requirements, status, expiry_date, salary, posted_by, public_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING id
        `,
          [
            title,
            department,
            employment_type,
            teaching_type,
            description,
            responsibilities,
            requirements,
            status,
            expiry_date,
            salary,
            user_name,
            public_id,
          ],
        )
        .then((res: any) => res.rows[0]?.id);

      if (!result) {
        return NextResponse.json(
          { error: "Failed to create job post" },
          { status: 500 },
        );
      }

      return NextResponse.json(
        { success: true, jobId: result },
        { status: 201 },
      );
    } catch (error) {
      console.error("Error posting job:", error);
      return NextResponse.json(
        { error: "Failed to post job" },
        { status: 500 },
      );
    }
  }
}
