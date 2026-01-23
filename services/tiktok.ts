import { createClient } from "@/common/utils/server";

const supabase = createClient();

interface TikTokStats {
  follower_count: number;
  likes_count: number;
  video_count: number;
}

export const TikTokService = {
  async updateTokens(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
  ) {
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

    const { error } = await supabase.from("tiktok_tokens").upsert({
      id: "00000000-0000-0000-0000-000000000001",
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt,
      updated_at: new Date().toISOString(),
    });

    if (error) throw new Error(`Supabase Error: ${error.message}`);
  },

  async getProfileStats(): Promise<TikTokStats | null> {
    const { data: tokenData } = await supabase
      .from("tiktok_tokens")
      .select("*")
      .single();

    if (!tokenData) return null;

    const response = await fetch(
      "https://open.tiktokapis.com/v2/user/info/?fields=follower_count,likes_count,video_count",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
        next: { revalidate: 3600 },
      },
    );

    const result = await response.json();
    return result.data?.user || null;
  },
};
