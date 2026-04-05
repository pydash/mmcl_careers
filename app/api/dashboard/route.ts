import { NextRequest, NextResponse } from "next/server";
import { getUserRole } from "@/lib/auth";
import db from "@/lib/db";
import { getDashboard } from "@/lib/query/hr/get-dashboard";

export async function GET(request: NextRequest) {
  try {
    const userRole = await getUserRole();
    if (!userRole) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(getDashboard);

    return NextResponse.json(result.rows[0].dashboard_data);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
