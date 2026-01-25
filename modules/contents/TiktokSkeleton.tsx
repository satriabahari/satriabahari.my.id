import Skeleton from "react-loading-skeleton";

import Card from "@/common/components/elements/Card";
import SkeletonLoader from "@/common/components/elements/SkeletonLoader";

export const ProfileHeaderSkeleton = () => {
  return (
    <SkeletonLoader>
      <div className="mb-4 grid grid-cols-[0.5fr_3fr_1fr] items-center gap-4">
        <Skeleton
          className="aspect-square rounded-full"
          circle
          containerClassName="block leading-none"
        />
        <div className="w-full space-y-2">
          <Skeleton className="w-full" count={3} />
        </div>
        <div className="w-full space-y-2">
          <Skeleton className="w-full" count={3} />
        </div>
      </div>
    </SkeletonLoader>
  );
};

export const VideoListSkeleton = () => {
  return (
    <SkeletonLoader>
      <div className="grid grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => {
          return (
            <Card key={i} className="overflow-hidden !p-0">
              <Skeleton
                className="h-64 !rounded-b-none !rounded-t-lg"
                containerClassName="block leading-none"
              />
            </Card>
          );
        })}
      </div>
    </SkeletonLoader>
  );
};
