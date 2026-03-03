import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserIdFromSession } from "@/lib/auth";
import { createEducationEntry } from "@/lib/queries/applicant/profile";

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { school_name, level, degree, status, units_earned, year_graduated } =
      body;

    const result = await db.query(createEducationEntry, [
      userId,
      school_name,
      level,
      degree,
      status,
      units_earned,
      year_graduated,
    ]);

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error("Error adding education:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add education" },
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
    const { education } = body;

    if (!Array.isArray(education)) {
      return NextResponse.json(
        { error: "Education data must be an array" },
        { status: 400 },
      );
    }

    // For now, just return success
    // TODO: Implement batch update logic for education records
    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error("Error updating education:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update education" },
      { status: 500 },
    );
  }
}
