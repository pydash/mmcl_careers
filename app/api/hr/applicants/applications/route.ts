import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { ALL_APPLICATIONS_QUERY } from "@/lib/queries/hr/all_applications_query";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      console.log("No session_user_id cookie found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Fetching applications for user:", userId);
    
    try {
      const countResult = await db.query("SELECT COUNT(*) FROM job_applications");
      console.log("Total applications in database:", countResult.rows[0].count);
    } catch (countError: any) {
      console.error("Count query failed:", countError.message);
    }

    const applications = await db
      .query(ALL_APPLICATIONS_QUERY)
      .then((res: any) => res.rows);

    console.log("Applications fetched:", applications.length);
    return NextResponse.json(applications);
  } catch (error: any) {
    console.error("Error fetching applications:", error.message, error.code);
    return NextResponse.json(
      { error: "Failed to fetch applications", details: error?.message || String(error) },
      { status: 500 },
    );
  }
}
