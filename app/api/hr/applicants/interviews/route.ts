import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { ALL_INTERVIEWS_QUERY } from "@/lib/queries/hr/all_interviews_query";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const interviews = await db
      .query(ALL_INTERVIEWS_QUERY)
      .then((res: any) => res.rows);

    return NextResponse.json(interviews);
  } catch (error) {
    console.error("Error fetching interviews", error);
    return NextResponse.json(
      { error: "Failed to fetch interviews" },
      { status: 500 },
    );
  }
}
