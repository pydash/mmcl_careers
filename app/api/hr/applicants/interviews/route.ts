import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { ALL_INTERVIEWS_QUERY } from "@/lib/queries/hr/all_interviews_query";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const interviews = await db
      .query(ALL_INTERVIEWS_QUERY)
      .then((res: any) => res.rows);

    return NextResponse.json(interviews);
  } catch (error) {
    console.error("Error fetching interviews", error);
    return NextResponse.json(
      { error: "Failed to fetch interviews" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      app_id,
      title,
      scheduled_at,
      interview_mode,
      meeting_link,
      location,
    } = body;

    // Validate required fields
    if (!app_id || !title || !scheduled_at || !interview_mode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const insertQuery = `
      INSERT INTO job_interviews (
        app_id,
        title,
        scheduled_at,
        interview_mode,
        meeting_link,
        location
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      app_id,
      title,
      scheduled_at,
      interview_mode,
      meeting_link || null,
      location || null,
    ];

    const result = await db.query(insertQuery, values);

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating interview", error);
    return NextResponse.json(
      { error: "Failed to create interview" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, scheduled_at, interview_mode, meeting_link, location } =
      body;

    if (!id || !title || !scheduled_at || !interview_mode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const updateQuery = `
      UPDATE job_interviews
      SET
        title = $1,
        scheduled_at = $2,
        interview_mode = $3,
        meeting_link = $4,
        location = $5
      WHERE id = $6
      RETURNING *;
    `;

    const values = [
      title,
      scheduled_at,
      interview_mode,
      meeting_link || null,
      location || null,
      id,
    ];

    const result = await db.query(updateQuery, values);
    const row = result.rows[0];

    return NextResponse.json(
      {
        ...row,
        scheduled_at: row.scheduled_at?.toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating interview", error);
    return NextResponse.json(
      { error: "Failed to update interview" },
      { status: 500 },
    );
  }
}
