import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import GalleryImage from "@/lib/models/GalleryImage";

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
    const image = await GalleryImage.findByIdAndUpdate(id, body, { new: true });
    if (!image) return NextResponse.json({ error: "Image not found" }, { status: 404 });
    return NextResponse.json(image);
  } catch {
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 });
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
    const image = await GalleryImage.findByIdAndDelete(id);
    if (!image) return NextResponse.json({ error: "Image not found" }, { status: 404 });
    return NextResponse.json({ message: "Image deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
