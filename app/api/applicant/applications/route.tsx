import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getAllApplications } from "@/lib/queries/applicant/applications/applications_list";
import { getUserId } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db
      .query(getAllApplications, [userId])
      .then((res: any) => res.rows);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching jobs", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}
