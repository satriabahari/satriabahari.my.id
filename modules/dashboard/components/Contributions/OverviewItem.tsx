import AnimateCounter from "@/common/components/elements/AnimateCounter";
import SpotlightCard from "@/common/components/elements/SpotlightCard";

interface OverviewItemProps {
  label: string;
  value: number;
  unit?: string;
}

const OverviewItem = ({ label, value, unit = "" }: OverviewItemProps) => (
  <SpotlightCard className="flex flex-col bg-neutral-100 p-4 text-center">
    <span className="text-sm dark:text-neutral-400">{label}</span>
    <div>
      <AnimateCounter
        className="text-xl font-medium text-primary lg:text-2xl"
        total={value}
      />
      {unit && <span className="text-sm dark:text-neutral-400"> {unit}</span>}
    </div>
  </SpotlightCard>
);

export default OverviewItem;
