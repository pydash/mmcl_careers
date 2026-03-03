import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getAllApplications } from "@/lib/queries/applicant/applications";
import { getUserIdFromSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications_result = await db
      .query(getAllApplications, [userId])
      .then((res: any) => res.rows);

    return NextResponse.json(applications_result);
  } catch (error) {
    console.error("Error fetching applications", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}
