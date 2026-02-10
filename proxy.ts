import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const pathname = req.nextUrl.pathname;

  // Ignore next internals & static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const subdomain = host.split(".")[0];

  // 🔐 HR portal logic
  if (subdomain === "hr") {
    // Root or /login → always go to /hr/login
    if (pathname === "/" || pathname === "/login") {
      return NextResponse.redirect(new URL("/hr/login", req.url));
    }

    // Rewrite everything else under /hr
    if (!pathname.startsWith("/hr")) {
      return NextResponse.rewrite(new URL(`/hr${pathname}`, req.url));
    }
  }

  if (subdomain === "admin") {
    // Root or /login → always go to /admin/login
    if (pathname === "/" || pathname === "/login") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // Rewrite everything else under /admin
    if (!pathname.startsWith("/admin")) {
      return NextResponse.rewrite(new URL(`/admin${pathname}`, req.url));
    }
  }

  // Applicant & localhost → normal flow
  return NextResponse.next();
}
