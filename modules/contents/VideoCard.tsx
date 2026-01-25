"use client";

import Link from "next/link";
import { FiPlay as ViewIcon } from "react-icons/fi";
import Image from "@/common/components/elements/Image";
import { VideoItem } from "@/common/types/tiktok";

const formatViewCount = (count: number) => {
  if (count < 10000) {
    return count.toString();
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  })
    .format(count)
    .toLowerCase();
};

export default function VideoCard({
  share_url,
  cover_image_url,
  width,
  height,
  view_count,
}: VideoItem) {
  return (
    <Link
      href={share_url}
      target="_blank"
      className="group relative block w-full overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-md"
    >
      <Image
        src={cover_image_url}
        className="aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
        alt="TikTok Thumbnail"
        loading="lazy"
        width={width || 1080}
        height={height || 1920}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="absolute bottom-2 left-2 flex items-center gap-1 font-medium text-white drop-shadow-md">
        <ViewIcon size={16} />
        <span className="text-sm font-semibold">
          {formatViewCount(view_count)}
        </span>
      </div>
    </Link>
  );
}
