import Card from "@/common/components/elements/Card";
import SkeletonLoader from "@/common/components/elements/SkeletonLoader";
import Skeleton from "react-loading-skeleton";

const ProjectSkeleton = () => {
  return (
    <SkeletonLoader>
      <Card>
        <Skeleton
          containerClassName="block leading-none"
          className="h-44 !rounded-b-none !rounded-t-lg"
        />
        <div className="flex flex-col gap-2 p-4">
          <Skeleton containerClassName="block leading-none" className="h-6" />
          <div className="flex flex-col">
            {[...Array(2)].map((_, i) => (
              <Skeleton
                containerClassName="block leading-none"
                key={i}
                className="h-4"
              />
            ))}
          </div>
          <div className="flex w-1/2 gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                containerClassName="w-1/4 block leading-none"
                key={i}
                className="h-8"
              />
            ))}
          </div>
        </div>
      </Card>
    </SkeletonLoader>
  );
};

export default ProjectSkeleton;
