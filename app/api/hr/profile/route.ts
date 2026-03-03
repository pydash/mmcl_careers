import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserIdFromSession } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const query = `
      SELECT
        ua.id,
        ua.role,
        ua.created_at,
        ua.deleted_at,
        up.first_name,
        up.last_name,
        up.email_address,
        up.mobile_number
      FROM user_accounts ua
      LEFT JOIN user_profiles up ON up.id = ua.id
      WHERE ua.id = $1
      LIMIT 1;
    `;

    const result = await db.query(query, [userId]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const row = result.rows[0];
    const fullName = [row.first_name, row.last_name]
      .filter(Boolean)
      .join(" ")
      .trim();

    return NextResponse.json({
      name: fullName || "User",
      role:
        row.role === "hr" ? "HR" : row.role === "admin" ? "Admin" : "Applicant",
      department: row.role === "hr" ? "Human Resources" : "-",
      email: row.email_address ?? "",
      phone: row.mobile_number ?? "-",
      status: row.deleted_at ? "Inactive" : "Active",
      joined: row.created_at,
      avatar: "",
    });
  } catch (error: any) {
    console.error("Error fetching HR profile:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 },
    );
  }
}
