import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { createApplicantProfile } from "@/lib/queries/applicant/profile/create_profile";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await request.json();

    if (!payload) {
      return NextResponse.json(
        { error: "Invalid profile build" },
        { status: 400 },
      );
    }

    await db.query(createApplicantProfile, [payload, userId]);

    return NextResponse.json(
      { message: "Profile created successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error creating profile", error);
    return NextResponse.json(
      {
        error: "Failed to create profile",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
