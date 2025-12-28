import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const email = cookieStore.get("session_email")?.value;
  const token = cookieStore.get("session_token")?.value;

  if (!email || !token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ email, token });
}
