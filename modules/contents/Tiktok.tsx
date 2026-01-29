"use client";

import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { useTranslations } from "next-intl";

import VideoList from "./VideoList";
import ProfileHeader from "./ProfileHeader";
import { ProfileHeaderSkeleton, VideoListSkeleton } from "./TiktokSkeleton";

import EmptyState from "@/common/components/elements/EmptyState";
import { fetcher } from "@/services/fetcher";

const TIKTOK_API_BASE = "/api/tiktok?action=";

const Tiktok = () => {
  const t = useTranslations("ContentsPage");

  const { data: profile, isLoading: profileLoading } = useSWR(
    `${TIKTOK_API_BASE}profile`,
    fetcher,
  );

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.has_more) return null;
    if (pageIndex === 0) return `${TIKTOK_API_BASE}videos`;
    return `${TIKTOK_API_BASE}videos&cursor=${previousPageData.cursor}`;
  };

  const {
    data,
    size,
    setSize,
    error: videoError,
    isValidating: videoValidating,
    isLoading: videoLoading,
  } = useSWRInfinite(getKey, fetcher);

  const allVideos = data ? data.flatMap((page) => page.videos) : [];
  const hasMore = data ? data[data.length - 1]?.has_more : false;
  const isRefreshing = videoValidating && data && data.length === size;

  const isLoadingInitial = profileLoading || (videoLoading && !data);

  if (isLoadingInitial) {
    return (
      <section className="space-y-6">
        <ProfileHeaderSkeleton />
        <VideoListSkeleton />
      </section>
    );
  }

  if (videoError) return <EmptyState message={t("error")} />;

  if (allVideos.length === 0) return <EmptyState message={t("no_data")} />;

  return (
    <section className="space-y-4">
      <ProfileHeader {...profile?.data} />

      <VideoList videos={allVideos} />

      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setSize(size + 1)}
            disabled={isRefreshing}
            className="rounded-full bg-neutral-200 px-4 py-1 text-sm text-dark transition-all duration-300 hover:scale-105 hover:bg-neutral-200 disabled:opacity-50 dark:bg-neutral-800 dark:text-light"
          >
            {isRefreshing ? "Loading..." : t("load_more") || "Load More"}
          </button>
        </div>
      )}
    </section>
  );
};

export default Tiktok;
