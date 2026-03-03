import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { getAllJobs } from "@/lib/queries/hr/all_jobs_query";
import { get } from "http";
import { getUserIdFromSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applicationsResult = await db.query(getAllJobs);
    const applications = applicationsResult.rows;

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching jobs", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    console.log(userId);
    console.log(data);

    const {
      is_open,
      position,
      employment_type,
      department,
      expiration_date,
      description,
      salary,
    } = data;

    const insertQuery = `
      INSERT INTO job_postings
      (position, employment_type, department, expiration_date, description, salary, is_open, posted_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `;

    const values = [
      position,
      employment_type,
      department,
      expiration_date,
      description,
      salary,
      is_open,
      userId,
    ];

    const result = await db.query(insertQuery, values);
    const newJobId = result.rows[0].id;

    return NextResponse.json(
      { success: true, jobId: newJobId },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error posting job", error);
    return NextResponse.json({ error: "Failed to post job" }, { status: 500 });
  }
}
