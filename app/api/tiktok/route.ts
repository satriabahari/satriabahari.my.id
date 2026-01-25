import { NextRequest, NextResponse } from "next/server";
import { getTikTokProfile, getTikTokVideos } from "@/services/tiktok";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "profile") {
      const data = await getTikTokProfile();
      return NextResponse.json({ success: true, data });
    }

    if (action === "videos") {
      const cursor = Number(searchParams.get("cursor") || 0);
      const limit = Number(searchParams.get("limit") || 20);
      const data = await getTikTokVideos(cursor, limit);
      return NextResponse.json({ success: true, ...data });
    }

    return NextResponse.json({ error: "Action tidak valid" }, { status: 400 });
  } catch (error: any) {
    console.error("API Route Error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 },
    );
  }
}
