import { getSessionUserFromRequest } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const user = await getSessionUserFromRequest(request as any);

    if (!user) {
      return NextResponse.json(
        {
          authenticated: false,
          message: "No session found",
        },
        { status: 401 },
      );
    }

    return NextResponse.json({
      authenticated: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
