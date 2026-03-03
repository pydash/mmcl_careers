import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { getJobs } from "@/lib/queries/applicant/dashboard";
import { getUserIdFromSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jobs = await db.query(getJobs, [userId]).then((res: any) => res.rows);

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
