import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Developer from "@/lib/models/Developer";

export async function GET() {
  try {
    await dbConnect();
    const developers = await Developer.find().sort({ order: 1 });
    return NextResponse.json(developers);
  } catch {
    return NextResponse.json({ error: "Failed to fetch developers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const body = await request.json();
    const developer = await Developer.create(body);
    return NextResponse.json(developer, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create developer" }, { status: 500 });
  }
}
