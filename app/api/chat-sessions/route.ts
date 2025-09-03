import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/utils/auth-helpers";
import { getChatSessions } from "@/app/actions/getChatSessions";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const account = await prisma.account.findFirst({
      where: { userId: session.user.id },
    });

    if (!account) {
      return NextResponse.json({ sessions: [] });
    }

    const sessions = await getChatSessions(account.id);
    return NextResponse.json(sessions);
  } catch (err) {
    console.error("Error fetching chat sessions:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
