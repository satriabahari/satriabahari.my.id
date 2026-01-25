import axios from "axios";
import { createClient } from "@/common/utils/server";

const CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY!;
const CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET!;
const STATIC_ID = "00000000-0000-0000-0000-000000000001";

const profileFields =
  "avatar_large_url,display_name,bio_description,profile_deep_link,username,follower_count,following_count,likes_count,video_count";
const videoFields =
  "id,create_time,cover_image_url,share_url,height,width,title,embed_html,embed_link,like_count,comment_count,share_count,view_count";

export async function getStoredToken() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tiktok_tokens")
    .select("*")
    .limit(1)
    .single();

  if (error || !data) throw new Error("Token tidak ditemukan di database.");
  return data;
}

export async function saveTikTokTokens(tokenData: any) {
  const supabase = createClient();
  const expiresAt = new Date(
    Date.now() + tokenData.expires_in * 1000,
  ).toISOString();
  const refreshExpiresAt = new Date(
    Date.now() + (tokenData.refresh_expires_in || 15552000) * 1000,
  ).toISOString();

  const { error } = await supabase.from("tiktok_tokens").upsert({
    id: STATIC_ID,
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expires_at: expiresAt,
    refresh_expires_at: refreshExpiresAt,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(`Gagal menyimpan ke Supabase: ${error.message}`);
}

export async function refreshTikTokToken(refreshToken: string) {
  const params = new URLSearchParams({
    client_key: CLIENT_KEY,
    client_secret: CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await axios.post(
    "https://open.tiktokapis.com/v2/oauth/token/",
    params,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  );

  if (!response.data.access_token)
    throw new Error("Gagal mendapatkan token baru.");

  await saveTikTokTokens(response.data);
  return response.data.access_token;
}

export async function getValidAccessToken() {
  const record = await getStoredToken();
  const isExpired = new Date() >= new Date(record.expires_at);

  if (isExpired) {
    return await refreshTikTokToken(record.refresh_token);
  }

  return record.access_token;
}

export async function getTikTokProfile() {
  const token = await getValidAccessToken();

  const response = await axios.get(
    `https://open.tiktokapis.com/v2/user/info/?fields=${profileFields}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return response.data.data?.user || null;
}

export async function getTikTokVideos(
  cursor: number = 0,
  maxCount: number = 10,
) {
  const token = await getValidAccessToken();

  const response = await axios.post(
    `https://open.tiktokapis.com/v2/video/list/?fields=${videoFields}`,
    { cursor, max_count: maxCount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data.data || { videos: [], has_more: false, cursor: 0 };
}
