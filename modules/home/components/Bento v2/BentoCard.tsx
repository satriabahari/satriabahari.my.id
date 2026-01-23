import Link from "next/link";

import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { BentoItemProps } from "@/common/types/bento";

const BentoCard = ({
  title,
  description,
  label,
  icon,
  visual,
  href,
  colSpan,
  className,
}: BentoItemProps) => {
  return (
    <SpotlightCard
      className={`!p-0 md:col-span-${colSpan ?? 1}  ${colSpan === 2 ? "grid grid-cols-2 gap-2" : "flex flex-col"} ${className}`}
    >
      <div
        className={`flex flex-col p-6 ${colSpan === 2 ? "item-start" : "items-center text-center"}`}
      >
        {icon && href && (
          <Link
            href={href}
            className="bg-neutral-200 rounded-lg w-fit p-3 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
          >
            {icon}
          </Link>
        )}
        <h2 className="mb-1 mt-3 text-sm font-medium text-neutral-800 dark:text-neutral-300">
          {title}
        </h2>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>

      <>{visual}</>
    </SpotlightCard>
  );
};

export default BentoCard;
