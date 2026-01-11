import { type NextRequest, NextResponse } from "next/server";

import { getAchievementsData } from "@/services/achievements";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    // Ambil params dan konversi null menjadi undefined agar sesuai interface
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;

    // Cukup satu kali panggil, biarkan service yang memfilter
    const data = await getAchievementsData({ category, search });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
