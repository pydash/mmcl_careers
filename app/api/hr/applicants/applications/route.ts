import { NextResponse } from "next/server";
import db from "@/lib/db";
import { ALL_APPLICATIONS_QUERY } from "@/lib/queries/hr/all_applications_query";
import { getUserIdFromSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await db
      .query(ALL_APPLICATIONS_QUERY)
      .then((res: any) => res.rows);

    console.log("Applications fetched:", applications.length);
    return NextResponse.json(applications);
  } catch (error: any) {
    console.error("Error fetching applications:", error.message, error.code);
    return NextResponse.json(
      {
        error: "Failed to fetch applications",
        details: error?.message || String(error),
      },
      { status: 500 },
    );
  }
}
