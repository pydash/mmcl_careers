import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getProfileDetails } from "@/lib/queries/applicant/profile/profile_details";
import { getUserId } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db
      .query(getProfileDetails, [userId])
      .then((res: any) => res.rows[0].response);

    if (!result) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile details" },
      { status: 500 },
    );
  }
}
