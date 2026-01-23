import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { upsertTikTokToken } from "@/services/tiktok"; // Import service baru

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    {
      id: "tiktok",
      name: "TikTok",
      type: "oauth",
      authorization: {
        url: "https://www.tiktok.com/v2/auth/authorize/",
        params: {
          client_key: process.env.TIKTOK_CLIENT_KEY,
          scope: "user.info.basic,user.info.stats,video.list",
          redirect_uri: process.env.TIKTOK_REDIRECT_URI,
          response_type: "code",
        },
      },
      token: {
        url: "https://open.tiktokapis.com/v2/oauth/token/",
        async request({ params, provider }: any) {
          const response = await fetch(
            "https://open.tiktokapis.com/v2/oauth/token/",
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                client_key: provider.clientId,
                client_secret: provider.clientSecret,
                code: params.code,
                grant_type: "authorization_code",
                redirect_uri: provider.callbackUrl,
              }),
            },
          );
          return { tokens: await response.json() };
        },
      },
      userinfo:
        "https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name",
      clientId: process.env.TIKTOK_CLIENT_KEY,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET,
      profile(profile: any) {
        return {
          id: profile.data.user.open_id,
          name: profile.data.user.display_name,
          image: profile.data.user.avatar_url,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      if (account && account.provider === "tiktok") {
        // Simpan token ke Supabase secara otomatis saat login berhasil
        try {
          await upsertTikTokToken(account);
          console.log("TikTok token synced with Supabase");
        } catch (err) {
          console.error("Failed to sync TikTok token:", err);
        }

        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
