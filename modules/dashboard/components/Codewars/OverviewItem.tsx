import AnimateCounter from "@/common/components/elements/AnimateCounter";
import Card from "@/common/components/elements/Card";

interface OverviewItemProps {
  label: string;
  value: number | string;
  unit?: string;
}

const OverviewItem = ({ label, value, unit = "" }: OverviewItemProps) => (
  <Card className="flex flex-col self-center px-4 py-3">
    <span className="text-sm dark:text-neutral-400">{label}</span>
    {typeof value === "string" ? (
      <span className="text-lg font-medium text-primary">{value}</span>
    ) : (
      <div>
        <AnimateCounter
          className="text-xl font-medium text-primary lg:text-2xl"
          total={value}
        />
        {unit && <span className="text-sm dark:text-neutral-400"> {unit}</span>}
      </div>
    )}
  </Card>
);

export default OverviewItem;
