import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getRecentApplication } from "@/lib/queries/applicant/dashboard";
import { getUserIdFromSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const recent_applications_query_result = await db
      .query(getRecentApplication, [userId])
      .then((res: any) => res.rows);

    return NextResponse.json(recent_applications_query_result);
  } catch (error) {
    console.error("Error fetching recent applications:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
