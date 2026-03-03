import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { get } from "http";
import { getUserIdFromSession } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getUserIdFromSession();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, userId });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { error: "Session check failed" },
      { status: 500 },
    );
  }
}
