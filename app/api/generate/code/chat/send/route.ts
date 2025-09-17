import { redis } from "@/lib/redis";
import { auth } from "@/utils/auth-helpers";
import { ChatSession } from "@/lib/types/codeChat.types";

export async function POST(req: Request) {
  try {
    const { sessionId, chat } = await req.json() as {
      sessionId: string;
      chat: ChatSession;
    };

    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user?.id) {
      return Response.json({ ok: false, reason: "Unauthorized" }, { status: 401 });
    }

    const key = `chat:${sessionId}`;

    await redis.set(key, JSON.stringify(chat), { ex: 60 * 60 * 24 });

    return Response.json({ ok: true, chat });
  } catch (err) {
    console.error("Error storing chat:", err);
    return Response.json({ ok: false, reason: "Server error" }, { status: 500 });
  }
}
