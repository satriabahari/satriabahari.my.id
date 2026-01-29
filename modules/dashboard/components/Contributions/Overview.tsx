import { useTranslations } from "next-intl";

import OverviewItem from "./OverviewItem";

interface OverviewProps {
  data: {
    totalContributions?: number;
    weeks?: {
      contributionDays: {
        contributionCount: number;
      }[];
    }[];
  };
}
const Overview = ({ data }: OverviewProps) => {
  const totalContributions = data?.totalContributions || 0;
  const weeks = data?.weeks || [];

  const totalThisWeekContribution =
    weeks[weeks.length - 1]?.contributionDays
      ?.map((item) => item.contributionCount)
      ?.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0,
      ) || 0;

  const totalContributionList = weeks
    .map((week) =>
      week.contributionDays.map(
        (contributionDay) => contributionDay.contributionCount,
      ),
    )
    .flat();

  const bestContribution = Math.max(...totalContributionList) || 0;
  const averageContribution = Math.round(
    totalContributions / totalContributionList.length,
  );

  const t = useTranslations("DashboardPage.github");

  return (
    <div className="grid grid-cols-2 gap-3 py-2 sm:grid-cols-4">
      <OverviewItem
        label={t("title_total_contribution")}
        value={totalContributions}
      />
      <OverviewItem
        label={t("title_total_this_week_contribution")}
        value={totalThisWeekContribution}
      />
      <OverviewItem
        label={t("title_best_contribution")}
        value={bestContribution}
      />
      <OverviewItem
        label={t("title_average_contribution")}
        value={averageContribution}
        unit={"/ " + t("unit")}
      />
    </div>
  );
};

export default Overview;
