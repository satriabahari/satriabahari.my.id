import Link from "next/link";
import { useTranslations } from "next-intl";

import Image from "@/common/components/elements/Image";
import { ProfileItem } from "@/common/types/tiktok";

function StatItem({ count, label }: { count: number; label: string }) {
  const format = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-lg font-bold text-dark dark:text-light">
        {format(count)}
      </span>
      <span className="text-sm text-neutral-600 dark:text-neutral-300">
        {label}
      </span>
    </div>
  );
}

export default function ProfileHeader({
  avatar_large_url,
  follower_count,
  following_count,
  profile_deep_link,
  username,
  bio_description,
  display_name,
  likes_count,
  video_count,
}: ProfileItem) {
  const t = useTranslations("ContentsPage");

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex flex-col items-center justify-center gap-6 md:flex-row ">
        <Image
          src={avatar_large_url}
          className="rounded-full"
          alt="Profile"
          width={200}
          height={200}
        />
        <div className="flex flex-col items-center md:items-start">
          <div className="flex w-fit gap-4">
            <h2 className="text-2xl font-bold text-primary">{username}</h2>
            <h3 className="text-lg text-light">{display_name}</h3>
          </div>
          <div className="grid grid-cols-2 gap-5 py-2 md:grid-cols-4 ">
            <StatItem count={following_count} label="Following" />
            <StatItem count={follower_count} label="Followers" />
            <StatItem count={likes_count} label="Likes" />
            <StatItem count={video_count} label="Videos" />
          </div>
          <p className="w-3/4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 md:w-full">
            {bio_description || "No bio yet"}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 md:flex-col">
        <Image
          src={"/images/tiktok.png"}
          width={230}
          className="hidden rounded-lg bg-neutral-900 p-2 md:block"
          height={230}
          alt="Tiktok Icon"
        />
        <div className="flex flex-col items-center gap-2 md:items-end">
          <Link
            href={`${profile_deep_link}`}
            target="_blank"
            className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-dark transition-all duration-300 hover:scale-105"
          >
            {t("open_tiktok")}
          </Link>
          <button className="text-[10px] text-neutral-600 dark:text-neutral-400">
            {t("view")}{" "}
            <Link
              href="https://www.tiktok.com/legal/page/row/privacy-policy/"
              target="_blank"
              className="underline transition duration-300 hover:text-dark dark:hover:text-light"
            >
              {t("privacy_policy")}
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
