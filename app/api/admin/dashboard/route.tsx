import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getDashboardStats } from "@/lib/queries/admin/dashboard/stats_query";

export async function GET(request: NextRequest) {
  try {
    const stats_query_result = await db
      .query(getDashboardStats)
      .then((res: any) => res.rows[0]);

    return new Response(JSON.stringify(stats_query_result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 },
    );
  }
}
