import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserIdFromSession } from "@/lib/auth";
import {
  getDashboardOverview,
  getPendingApplications,
  getUpcomingInterviews,
} from "@/lib/queries/applicant/dashboard";

export async function GET() {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const total_applications = await db
      .query(getDashboardOverview, [userId])
      .then((res: any) => res.rows[0]);

    const pending_applications = await db
      .query(getPendingApplications, [userId])
      .then((res: any) => res.rows[0]);

    const interview_count = await db
      .query(getUpcomingInterviews, [userId])
      .then((res: any) => res.rows[0]);

    const dashboard_overview = {
      total_applications: total_applications.count,
      pending_applications: pending_applications.count,
      upcoming_interviews: interview_count.count,
    };

    return NextResponse.json(dashboard_overview);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
