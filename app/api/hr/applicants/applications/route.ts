import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { ALL_APPLICATIONS_QUERY } from "@/lib/queries/hr/all_applications_query";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await db
      .query(ALL_APPLICATIONS_QUERY)
      .then((res: any) => res.rows);

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}
