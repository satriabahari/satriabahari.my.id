'use client';

import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function TikTokStatsCard() {
  const { data, error, isLoading } = useSWR('/api/tiktok', fetcher);

  if (error) return <div>Error loading stats</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      <div className="text-center">
        <p className="font-bold text-xl">{data.follower_count}</p>
        <p className="text-xs text-gray-500">Followers</p>
      </div>
      <div className="text-center">
        <p className="font-bold text-xl">{data.likes_count}</p>
        <p className="text-xs text-gray-500">Likes</p>
      </div>
    </div>
  );
}