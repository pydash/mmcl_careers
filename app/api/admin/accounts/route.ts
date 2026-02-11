import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { getAllAccountsQuery } from "@/lib/queries/admin/accounts/query";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.query(getAllAccountsQuery);
    const accounts = result.rows ?? [];

    return NextResponse.json({
      success: true,
      accounts,
      total: accounts.length,
    });
  } catch (error) {
    console.error("Error fetching hr accounts", error);
    return NextResponse.json(
      { error: "Failed to fetch accounts" },
      { status: 500 },
    );
  }
}
