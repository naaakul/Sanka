import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SECRET = process.env.NAK_SECRET;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionToken = req.cookies.get("better-auth.session_token")?.value;

  if (pathname === "/playground/code" && !sessionToken) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  if (!SECRET || SECRET !== "WIFE") {
    if (
      pathname !== "/notify" &&
      !pathname.startsWith("/api/waitlist")
    ) {
      return NextResponse.redirect(new URL("/notify", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|.*\\..*).*)"],
};
