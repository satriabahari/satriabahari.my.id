import { createClient } from "@/common/utils/server";

const supabase = createClient();
const TIKTOK_USER_ID = "00000000-0000-0000-0000-000000000001"; // ID statis portfolio Anda

export const TikTokService = {
  /**
   * Mengelola logika pengambilan token yang valid (termasuk auto-refresh)
   */
  async getValidToken() {
    const { data: tokenData, error } = await supabase
      .from("tiktok_tokens")
      .select("*")
      .eq("id", TIKTOK_USER_ID)
      .single();

    if (error || !tokenData)
      throw new Error("Token tidak ditemukan di database");

    const isExpired = new Date() >= new Date(tokenData.expires_at);

    if (isExpired) {
      // Jika expired, lakukan refresh token secara otomatis
      return await this.refreshAccessToken(tokenData.refresh_token);
    }

    return tokenData.access_token;
  },

  /**
   * Menukarkan refresh_token lama dengan access_token baru
   */
  async refreshAccessToken(refreshToken: string) {
    const response = await fetch(
      "https://open.tiktokapis.com/v2/oauth/token/",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_key: process.env.TIKTOK_CLIENT_KEY!,
          client_secret: process.env.TIKTOK_CLIENT_SECRET!,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      },
    );

    const data = await response.json();
    if (!response.ok) throw new Error("Gagal refresh token TikTok");

    // Update database dengan token baru
    const expiresAt = new Date(
      Date.now() + data.expires_in * 1000,
    ).toISOString();
    await supabase
      .from("tiktok_tokens")
      .update({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at: expiresAt,
      })
      .eq("id", TIKTOK_USER_ID);

    return data.access_token;
  },

  /**
   * Fungsi utama yang dipanggil oleh Route: Mengambil Statistik
   */
  async getProfileStats() {
    const token = await this.getValidToken();

    const response = await fetch(
      "https://open.tiktokapis.com/v2/user/info/?fields=follower_count,likes_count,video_count",
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 }, // Cache selama 1 jam
      },
    );

    const result = await response.json();
    return result.data?.user || null;
  },
};
