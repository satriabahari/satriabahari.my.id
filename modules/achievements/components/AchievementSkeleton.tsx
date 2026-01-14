import Card from "@/common/components/elements/Card";
import SkeletonLoader from "@/common/components/elements/SkeletonLoader";
import Skeleton from "react-loading-skeleton";

const AchievementSkeleton = () => {
  return (
    <SkeletonLoader>
      <Card className="overflow-hidden !p-0">
        <Skeleton
          className="h-44 !rounded-b-none !rounded-t-lg"
          containerClassName="block leading-none"
        />
        <div className="flex flex-col gap-2 p-4">
          <Skeleton className="h-6" containerClassName="block leading-none" />
          <div className="mt-1 space-y-2">
            <Skeleton className="h-4" containerClassName="block leading-none" />
            <Skeleton className="h-4" containerClassName="block leading-none" />
            <Skeleton className="h-4" containerClassName="block leading-none" />
          </div>
        </div>
      </Card>
    </SkeletonLoader>
  );
};

export default AchievementSkeleton;
