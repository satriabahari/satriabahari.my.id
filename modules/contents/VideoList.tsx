"use client";

import { VideoItem } from "@/common/types/tiktok";
import VideoCard from "./VideoCard";

interface VideoListProps {
  videos: VideoItem[];
}

const VideoList = ({ videos }: VideoListProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
      {videos.map((video, index) => (
        <VideoCard key={`${video.id}-${index}`} {...video} />
      ))}
    </div>
  );
};

export default VideoList;
