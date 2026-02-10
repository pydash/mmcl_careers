import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { ALL_JOBS_QUERY } from "@/lib/queries/hr/all_jobs_query";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await db
      .query(ALL_JOBS_QUERY)
      .then((res: any) => res.rows);

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching jobs", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  {
    try {
      const cookieStore = await cookies();
      const userId = cookieStore.get("session_user_id")?.value;

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

      posted_by,
      score,


    } = data;
    const publicId = uuidv4();


      const insertQuery = `
        INSERT INTO job_posts
        (
        public_id,
          is_active,
          title,
          employment_type,
          department,
          expiry_date,
          description,
          responsibilities,
          requirements,
          salary_min,
          salary_max,
          posted_by,
          score
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING id, public_id;
      `;

      const values = [
        publicId,
        is_active === "true" || is_active === true,
        title,
        job_type,
        department,
        deadline_date,
        description,
        responsibilities,
        requirements,
        salary_min ? Number(salary_min) : null,
        salary_max ? Number(salary_max) : null,
        userId, 
        Number(score)
      ];



      const result = await db.query(insertQuery, values);
      const newJobId = result.rows[0].id;

      return NextResponse.json(
        { success: true, jobId: newJobId },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error posting job", error);
      return NextResponse.json(
        { error: "Failed to post job" },
        { status: 500 }
      );
    }
  }
}
