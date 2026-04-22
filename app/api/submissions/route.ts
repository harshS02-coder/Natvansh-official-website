import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import ContactSubmission from "@/lib/models/ContactSubmission";
import { cachedFetch, invalidateCache, CACHE_TTL } from "@/lib/cache";

const CACHE_KEY = "submissions:all";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const submissions = await cachedFetch(
      CACHE_KEY,
      async () => {
        await dbConnect();
        return ContactSubmission.find().sort({ createdAt: -1 }).lean();
      },
      CACHE_TTL.SHORT
    );

    return NextResponse.json(submissions);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to fetch submissions", details: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const submission = await ContactSubmission.create(body);

    await invalidateCache(CACHE_KEY);

    return NextResponse.json(submission, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("API error:", message);
    return NextResponse.json({ error: "Failed to submit", details: message }, { status: 500 });
  }
}
