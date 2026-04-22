import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/lib/models/Event";
import { invalidateCache } from "@/lib/cache";

const CACHE_KEY = "events:all";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const event = await Event.findById(id).lean();
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    return NextResponse.json(event);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to fetch event", details: message }, { status: 500 });
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
    const event = await Event.findByIdAndUpdate(id, body, { new: true });
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    await invalidateCache(CACHE_KEY);

    return NextResponse.json(event);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to update event", details: message }, { status: 500 });
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
    const event = await Event.findByIdAndDelete(id);
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    await invalidateCache(CACHE_KEY);

    return NextResponse.json({ message: "Event deleted" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to delete event", details: message }, { status: 500 });
  }
}
