import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SECRET = process.env.NAK_SECRET;

export function middleware(req: NextRequest) {
  if (!SECRET || SECRET !== "WIFE") {
    if (
      req.nextUrl.pathname !== "/notify" &&
      !req.nextUrl.pathname.startsWith("/api/waitlist")
    ) {
      return NextResponse.redirect(new URL("/notify", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|.*\\..*).*)"],
};
