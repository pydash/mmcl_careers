import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { GET_ACCOUNT_DETAILS_QUERY } from "@/lib/queries/hr/login/get_account_details";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await db
      .query(GET_ACCOUNT_DETAILS_QUERY, [userId])
      .then((res: any) => res.rows);

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching account details", error);
    return NextResponse.json(
      { error: "Failed to fetch account details" },
      { status: 500 }
    );
  }
}
