import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

export async function GET(req: Request, { params }: { params: any }) {
  try {
    const { id: chatId } = await params;
    const redisKey = `chat:${chatId}`;

    const cached = await redis.get(redisKey);

    if (typeof cached === "string") {
      try {
        return NextResponse.json(JSON.parse(cached));
      } catch (e) {
        console.warn(
          "Failed to JSON.parse(redis cached string), returning raw string",
          e
        );
        return NextResponse.json(cached);
      }
    } else if (cached && typeof cached === "object") {
      return NextResponse.json(cached);
    }

    const chat = await prisma.chatSession.findUnique({
      where: { id: chatId },
    });

    if (!chat) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await redis.set(redisKey, JSON.stringify(chat.data), { ex: 60 * 60 });

    return NextResponse.json(chat.data);
  } catch (err) {
    console.error("Error fetching chat:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
