import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserIdFromSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const {
      company,
      position,
      department,
      salary,
      date_started,
      date_ended,
      courses_handled,
    } = body;

    const query = `
      INSERT INTO work_experiences (
        profile_id,
        company,
        position,
        department,
        salary,
        date_started,
        date_ended,
        courses_handled
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const result = await db.query(query, [
      userId,
      company,
      position,
      department,
      salary,
      date_started,
      date_ended,
      courses_handled,
    ]);

    return NextResponse.json({
      success: true,
      work: result.rows[0],
    });
  } catch (error: any) {
    console.error("Error adding work experience:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add work experience" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { work_experience } = body;

    if (!Array.isArray(work_experience)) {
      return NextResponse.json(
        { error: "Work experience data must be an array" },
        { status: 400 },
      );
    }

    // For now, just return success
    // TODO: Implement batch update logic for work records
    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error("Error updating work experience:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update work experience" },
      { status: 500 },
    );
  }
}
