import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { ALL_OFFERS_QUERY } from "@/lib/queries/hr/all_offers_query";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const offers = await db
      .query(ALL_OFFERS_QUERY)
      .then((res: any) => res.rows);

    return NextResponse.json(offers);
  } catch (error) {
    console.error("Error fetching offers", error);
    return NextResponse.json(
      { error: "Failed to fetch offers" },
      { status: 500 },
    );
  }
}
