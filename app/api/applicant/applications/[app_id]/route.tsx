import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getApplicationDetails } from "@/lib/queries/applicant/applications";
import { getUserIdFromSession } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { app_id: string } },
) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { app_id } = await params;

    const application_details = await db
      .query(getApplicationDetails, [app_id])
      .then((res: any) => res.rows[0]);

    if (!application_details) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(application_details);
  } catch (error) {
    console.error("Error fetching application", error);
    return NextResponse.json(
      { error: "Failed to fetch application" },
      { status: 500 },
    );
  }
}
