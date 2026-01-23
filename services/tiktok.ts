import axios from "axios";
import { createClient } from "@/common/utils/server";

/**
 * Mengambil baris token pertama dari Supabase.
 * Inisialisasi client di dalam fungsi untuk menghindari error saat build.
 */
export const getStoredToken = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tiktok_tokens")
    .select("*")
    .limit(1)
    .single();

  if (error || !data) throw new Error("Token tidak ditemukan di database");
  return data;
};

/**
 * Memperbarui access_token menggunakan refresh_token melalui Axios.
 */
export const refreshAccessToken = async (id: string, refreshToken: string) => {
  const supabase = createClient();

  // Menyiapkan data body dalam format x-www-form-urlencoded
  const params = new URLSearchParams({
    client_key: process.env.TIKTOK_CLIENT_KEY!,
    client_secret: process.env.TIKTOK_CLIENT_SECRET!,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await axios.post("https://open.tiktokapis.com/v2/oauth/token/", params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const data = response.data;
  if (!data.access_token) throw new Error("Gagal mendapatkan token baru dari TikTok");

  const expiresAt = new Date(Date.now() + data.expires_in * 1000).toISOString();

  // Update record berdasarkan ID yang ditemukan secara dinamis
  await supabase
    .from("tiktok_tokens")
    .update({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: expiresAt,
    })
    .eq("id", id);

  return data.access_token;
};

/**
 * Validasi token: Jika expired, otomatis melakukan refresh.
 */
export const getValidToken = async () => {
  const tokenData = await getStoredToken();
  const isExpired = new Date() >= new Date(tokenData.expires_at);

  if (isExpired) {
    return await refreshAccessToken(tokenData.id, tokenData.refresh_token);
  }

  return tokenData.access_token;
};

/**
 * Mengambil data profil TikTok menggunakan Axios.
 */
export const getTiktokProfileData = async () => {
  try {
    const token = await getValidToken();

    const response = await axios.get(
      "https://open.tiktokapis.com/v2/user/info/",
      {
        params: {
          fields: "follower_count,likes_count,video_count",
        },
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      }
    );

    return response.data.data?.user || null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("TikTok API Error:", error.response?.data || error.message);
    }
    return null;
  }
};