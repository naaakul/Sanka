import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { auth } from "@/utils/auth-helpers"; 

export async function POST(req: Request) {
  try {
    const { title, category } = await req.json();

    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return Response.json({ ok: false, reason: "Unauthorized" }, { status: 401 });
    }

    const chatSession = await prisma.chatSession.create({
      data: {
        userId: session.user.id,
        title: title || "Untitled",
        data: { category },
      },
    });

    await redis.set(
      `chat:${chatSession.id}`,
      JSON.stringify({
        messages: [],
        version: 1,
        updatedAt: Date.now(),
      }),
      { ex: 60 * 60 } 
    );

    return Response.json({ ok: true, id: chatSession.id });
  } catch (err: any) {
    console.error("Error starting chat:", err);
    return Response.json({ ok: false, reason: "Server error" }, { status: 500 });
  }
}
