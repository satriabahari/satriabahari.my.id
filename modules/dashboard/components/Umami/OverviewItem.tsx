"use client";

import AnimateCounter from "@/common/components/elements/AnimateCounter";
import SpotlightCard from "@/common/components/elements/SpotlightCard";

interface OverviewItemProps {
  label: string;
  value: number;
  unit?: string;
}

const OverviewItem = ({ label, value, unit = "" }: OverviewItemProps) => {
  return (
    <SpotlightCard className="flex flex-col items-center justify-center p-4">
      <span className="mb-1 text-sm dark:text-neutral-400">{label}</span>

      <div className="flex items-baseline gap-1">
        <AnimateCounter
          className="text-xl font-medium text-primary lg:text-2xl"
          total={value}
        />

        {unit && (
          <span className="text-xs font-medium dark:text-neutral-500 lg:text-sm">
            {unit}
          </span>
        )}
      </div>
    </SpotlightCard>
  );
};

export default OverviewItem;
