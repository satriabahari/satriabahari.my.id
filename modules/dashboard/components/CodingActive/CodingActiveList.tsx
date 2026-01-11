import { useTranslations } from "next-intl";

import Progress from "./Progress";

import SpotlightCard from "@/common/components/elements/SpotlightCard";

interface ItemProps {
  name: string;
  hours: number;
  minutes: number;
}

interface CodingActiveListProps {
  data?: {
    languages?: ItemProps[];
    categories?: ItemProps[];
  };
}

const CodingActiveList = ({ data }: CodingActiveListProps) => {
  const t = useTranslations("DashboardPage.wakatime");

  if (!data) {
    return null;
  }

  return (
    <SpotlightCard className="flex flex-col gap-y-3 p-4">
      <p className="text-neutral-600 dark:text-neutral-400">{t("languages")}</p>

      <ul className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
        {data?.languages?.map((subItem) => (
          <li key={subItem?.name}>
            <Progress
              data={subItem}
              className="bg-primary"
            />
          </li>
        ))}
      </ul>
    </SpotlightCard>
  );
};

export default CodingActiveList;
