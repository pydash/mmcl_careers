import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromSession } from "./lib/auth";

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Ignore public routes
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const userId = getUserIdFromSession();

  if (!userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
