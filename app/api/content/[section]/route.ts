import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import SiteContent from "@/lib/models/SiteContent";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const { section } = await params;
    await dbConnect();
    const content = await SiteContent.findOne({ section });
    if (!content) return NextResponse.json({ error: "Content not found" }, { status: 404 });
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { section } = await params;
    await dbConnect();
    const body = await request.json();
    const content = await SiteContent.findOneAndUpdate(
      { section },
      { ...body, section },
      { new: true, upsert: true }
    );
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
