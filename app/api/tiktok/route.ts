import { NextResponse } from "next/server";
import { TikTokService } from "@/services/tiktok";

export const GET = async () => {
  try {
    const stats = await TikTokService.getProfileStats();

    if (!stats) {
      return NextResponse.json(
        { error: "Data stats tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(stats);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
