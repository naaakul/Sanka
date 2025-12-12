import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("better-auth.session_token")?.value;

  if (pathname === "/playground/code" && !token) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  const secret = process.env.NAK_SECRET;

  if (secret !== "WIFE") {
    if (!pathname.startsWith("/api/waitlist") && pathname !== "/notify") {
      return NextResponse.redirect(new URL("/notify", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|.*\\..*).*)"],
};
