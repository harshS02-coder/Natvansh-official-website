import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Professor from "@/lib/models/Professor";
import { invalidateCacheByPrefix } from "@/lib/cache";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const professor = await Professor.findById(id).lean();
    if (!professor) return NextResponse.json({ error: "Professor not found" }, { status: 404 });
    return NextResponse.json(professor);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to fetch professor", details: message }, { status: 500 });
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
    const professor = await Professor.findByIdAndUpdate(id, body, { new: true });
    if (!professor) return NextResponse.json({ error: "Professor not found" }, { status: 404 });

    await invalidateCacheByPrefix("professors:");

    return NextResponse.json(professor);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to update professor", details: message }, { status: 500 });
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
    const professor = await Professor.findByIdAndDelete(id);
    if (!professor) return NextResponse.json({ error: "Professor not found" }, { status: 404 });

    await invalidateCacheByPrefix("professors:");

    return NextResponse.json({ message: "Professor deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to delete professor", details: message }, { status: 500 });
  }
}
