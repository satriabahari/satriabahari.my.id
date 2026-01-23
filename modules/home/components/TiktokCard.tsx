import { TikTokService } from "@/services/tiktok";

export default async function TikTokCard() {
  const stats = await TikTokService.getProfileStats();

  if (!stats) return null;

  return (
    <div className="rounded-lg border bg-neutral-50 p-4 dark:bg-neutral-900">
      <h3 className="text-lg font-semibold">TikTok Stats</h3>
      <div className="mt-2 flex gap-4">
        <div>
          <p className="text-xs uppercase text-neutral-500">Followers</p>
          <p className="font-bold">{stats.follower_count.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-neutral-500">Likes</p>
          <p className="font-bold">{stats.likes_count.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
