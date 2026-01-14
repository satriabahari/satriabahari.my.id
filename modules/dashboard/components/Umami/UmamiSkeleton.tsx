import Skeleton from "react-loading-skeleton";

import SkeletonLoader from "@/common/components/elements/SkeletonLoader";
import SpotlightCard from "@/common/components/elements/SpotlightCard";

const UmamiSkeleton = () => {
  return (
    <SkeletonLoader>
      <div className="!mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <SpotlightCard key={i} className="p-4">
            <Skeleton containerClassName="block" className="h-4" />
            <Skeleton containerClassName="block" className="h-6" />
          </SpotlightCard>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="m-auto mt-4 w-1/3">
          <Skeleton containerClassName="m-auto w-1/2 block" />
          <div className="flex gap-4">
            <Skeleton containerClassName="w-full block" />
            <Skeleton containerClassName="w-full block" />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_6fr] gap-4">
          <div className="flex w-full flex-col gap-2">
            <Skeleton containerClassName="w-full block" count={10} />
          </div>

          <div className="flex gap-2">
            {[...Array(12)].map((_, i) => {
              const percent = 100 - (90 - i * 8);
              return (
                <Skeleton
                  containerClassName="w-full h-full flex items-end block"
                  key={i}
                  style={{ height: `${percent}%` }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </SkeletonLoader>
  );
};

export default UmamiSkeleton;
