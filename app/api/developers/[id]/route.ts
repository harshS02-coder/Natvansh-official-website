import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Developer from "@/lib/models/Developer";
import { invalidateCache } from "@/lib/cache";

const CACHE_KEY = "developers:all";

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
    const developer = await Developer.findByIdAndUpdate(id, body, { new: true });
    if (!developer) return NextResponse.json({ error: "Developer not found" }, { status: 404 });

    await invalidateCache(CACHE_KEY);

    return NextResponse.json(developer);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to update developer", details: message }, { status: 500 });
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
    const developer = await Developer.findByIdAndDelete(id);
    if (!developer) return NextResponse.json({ error: "Developer not found" }, { status: 404 });

    await invalidateCache(CACHE_KEY);

    return NextResponse.json({ message: "Developer deleted" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to delete developer", details: message }, { status: 500 });
  }
}
