import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import {
  getTotalApplicationsQuery,
  getTotalHiresQuery,
  getTotalOpenPositionsQuery,
  getOfferAcceptanceRateQuery,
  getApplicationTrendQuery,
  getApplicationsByDepartmentQuery,
} from "@/lib/queries/admin/analytics/query";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [
      applicationsRes,
      hiresRes,
      openPositionsRes,
      offersRes,
      trendRes,
      departmentRes,
    ] = await Promise.all([
      db.query(getTotalApplicationsQuery),
      db.query(getTotalHiresQuery),
      db.query(getTotalOpenPositionsQuery),
      db.query(getOfferAcceptanceRateQuery),
      db.query(getApplicationTrendQuery),
      db.query(getApplicationsByDepartmentQuery),
    ]);

    return NextResponse.json({
      totalApplications: applicationsRes.rows[0] ?? null,
      totalHires: hiresRes.rows[0] ?? null,
      totalOpenPositions: openPositionsRes.rows[0] ?? null,
      offerAcceptanceRate: offersRes.rows[0] ?? null,
      applicationTrend: trendRes.rows ?? [],
      applicationsByDepartment: departmentRes.rows ?? [],
    });
  } catch (error) {
    console.error("Error fetching admin analytics", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}
