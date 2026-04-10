import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import TeamMember from "@/lib/models/TeamMember";

export async function GET() {
  try {
    await dbConnect();
    const members = await TeamMember.find().sort({ position: 1, order: 1 });
    return NextResponse.json(members);
  } catch {
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const body = await request.json();
    const member = await TeamMember.create(body);
    return NextResponse.json(member, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create member" }, { status: 500 });
  }
}
