import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import TeamMember from "@/lib/models/TeamMember";
import { invalidateCache } from "@/lib/cache";

const CACHE_KEY = "team:all";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const member = await TeamMember.findById(id).lean();
    if (!member) return NextResponse.json({ error: "Member not found" }, { status: 404 });
    return NextResponse.json(member);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to fetch member", details: message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await dbConnect();
    const body = await request.json();
    const member = await TeamMember.findByIdAndUpdate(id, body, { new: true });
    if (!member) return NextResponse.json({ error: "Member not found" }, { status: 404 });

    await invalidateCache(CACHE_KEY);

    return NextResponse.json(member);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to update member", details: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await dbConnect();
    const member = await TeamMember.findByIdAndDelete(id);
    if (!member) return NextResponse.json({ error: "Member not found" }, { status: 404 });

    await invalidateCache(CACHE_KEY);

    return NextResponse.json({ message: "Member deleted" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to delete member", details: message }, { status: 500 });
  }
}
