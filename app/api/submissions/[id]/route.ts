import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import ContactSubmission from "@/lib/models/ContactSubmission";
import { invalidateCache } from "@/lib/cache";

const CACHE_KEY = "submissions:all";

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
    const submission = await ContactSubmission.findByIdAndUpdate(id, body, { new: true });
    if (!submission) return NextResponse.json({ error: "Submission not found" }, { status: 404 });

    await invalidateCache(CACHE_KEY);

    return NextResponse.json(submission);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to update submission", details: message }, { status: 500 });
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
    const submission = await ContactSubmission.findByIdAndDelete(id);
    if (!submission) return NextResponse.json({ error: "Submission not found" }, { status: 404 });

    await invalidateCache(CACHE_KEY);

    return NextResponse.json({ message: "Submission deleted" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to delete submission", details: message }, { status: 500 });
  }
}
