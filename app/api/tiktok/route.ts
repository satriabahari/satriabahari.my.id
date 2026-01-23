import { NextResponse } from "next/server";
import { getTiktokProfileData } from "@/services/tiktok";

/**
 * Mencegah Next.js mencoba melakukan static render saat build.
 * Ini adalah solusi utama untuk error 'requestAsyncStorage' yang Anda alami.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Memanggil service untuk mengelola token dan fetch data TikTok
    const data = await getTiktokProfileData();

    if (!data) {
      return NextResponse.json(
        { error: "Gagal mengambil data dari TikTok" },
        { status: 500 },
      );
    }

    // Mengembalikan hasil statistik (followers, likes, video_count)
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Route Error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 },
    );
  }
}
