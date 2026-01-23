"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function TikTokCard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    axios
      .get("/api/tiktok")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return <div>{stats.follower_count} Followers</div>;
}
