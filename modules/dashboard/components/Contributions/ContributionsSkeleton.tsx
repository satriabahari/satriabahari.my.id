import Skeleton from "react-loading-skeleton";

import SkeletonLoader from "@/common/components/elements/SkeletonLoader";
import SpotlightCard from "@/common/components/elements/SpotlightCard";

const ContributionsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <SkeletonLoader>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <SpotlightCard key={i} className="p-4">
              <Skeleton containerClassName="block" className="h-4" />
              <Skeleton containerClassName="block" className="h-6" />
            </SpotlightCard>
          ))}
        </div>

        <SpotlightCard className="flex flex-col p-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-1">
              {[...Array(30)].map((_, i) => (
                <Skeleton
                  containerClassName="w-full block"
                  key={i}
                  className="h-4 w-2"
                />
              ))}
            </div>
          ))}
        </SpotlightCard>
      </SkeletonLoader>
    </div>
  );
};

export default ContributionsSkeleton;
