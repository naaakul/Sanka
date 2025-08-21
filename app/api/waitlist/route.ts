import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email required" },
        { status: 400 }
      );
    }

    const existing = await prisma.waitlist.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({
        success: false,
        message: "You are already on the waitlist",
      });
    }

    await prisma.waitlist.create({
      data: { email },
    });

    return NextResponse.json({
      success: true,
      message: "You’ve been added to the waitlist",
    });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await prisma.waitlist.count();
    return NextResponse.json({ count });
  } catch (err) {
    console.error("Count error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to get count" },
      { status: 500 }
    );
  }
}
