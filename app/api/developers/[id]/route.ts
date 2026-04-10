import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Developer from "@/lib/models/Developer";

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
    return NextResponse.json(developer);
  } catch {
    return NextResponse.json({ error: "Failed to update developer" }, { status: 500 });
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
    return NextResponse.json({ message: "Developer deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete developer" }, { status: 500 });
  }
}
