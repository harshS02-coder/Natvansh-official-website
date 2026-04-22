import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Alumni from "@/lib/models/Alumni";
import { invalidateCache } from "@/lib/cache";

const CACHE_KEY = "alumni:all";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const alumni = await Alumni.findById(id).lean();
    if (!alumni) return NextResponse.json({ error: "Alumni not found" }, { status: 404 });
    return NextResponse.json(alumni);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to fetch alumni", details: message }, { status: 500 });
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
    const alumni = await Alumni.findByIdAndUpdate(id, body, { new: true });
    if (!alumni) return NextResponse.json({ error: "Alumni not found" }, { status: 404 });

    await invalidateCache(CACHE_KEY);

    return NextResponse.json(alumni);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to update alumni", details: message }, { status: 500 });
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
    const alumni = await Alumni.findByIdAndDelete(id);
    if (!alumni) return NextResponse.json({ error: "Alumni not found" }, { status: 404 });

    await invalidateCache(CACHE_KEY);

    return NextResponse.json({ message: "Alumni deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to delete alumni", details: message }, { status: 500 });
  }
}
