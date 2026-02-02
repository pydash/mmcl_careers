import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { getProfileDetails } from "@/lib/queries/applicant/profile/profile_details";
import { ProfileResponse } from "@/models/applicant/Profile";

async function getUserId() {
  const cookieStore = await cookies();
  return cookieStore.get("session_user_id")?.value;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const result = await db
      .query<ProfileResponse>(getProfileDetails, [id])
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
