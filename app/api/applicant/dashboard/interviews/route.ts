import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getInterviews } from "@/lib/queries/applicant/dashboard";
import { getUserIdFromSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const interviews = await db
      .query(getInterviews, [userId])
      .then((res: any) => res.rows);

    return NextResponse.json(interviews);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch interviews" },
      { status: 500 },
    );
  }
}
