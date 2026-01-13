"use client";

import useSWR from "swr";
import { SiUmami as UmamiIcon } from "react-icons/si";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import UmamiSkeleton from "./UmamiSkeleton";
import TrafficTrendsChart from "./TrafficTrendsChart";
import Overview from "./Overview";
import ComboBoxFilter from "./ComboBoxFilter";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import EmptyState from "@/common/components/elements/EmptyState";
import { fetcher } from "@/services/fetcher";
import { UMAMI_ACCOUNT } from "@/common/constants/umami";

const Umami = () => {
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain") || "all";

  const key = `/api/umami?domain=${domain}`;

  const { data, isLoading, error } = useSWR(key, fetcher);
  const { is_active } = UMAMI_ACCOUNT;
  const t = useTranslations("DashboardPage");

  if (!is_active) return null;

  return (
    <section className="space-y-4">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-2">
          <SectionHeading title={t("umami.title")} icon={<UmamiIcon />} />
          <SectionSubHeading>
            <p>{t("umami.sub_title")}</p>
          </SectionSubHeading>
        </div>

        <ComboBoxFilter />
      </div>

      {error ? (
        <EmptyState message={t("error")} />
      ) : isLoading ? (
        <UmamiSkeleton />
      ) : (
        <div className="space-y-6">
          <Overview data={data} />
          <TrafficTrendsChart data={data} />
        </div>
      )}
    </section>
  );
};

export default Umami;
