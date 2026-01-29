import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Achievements from "@/modules/achievements";
import { METADATA } from "@/common/constants/metadata";

interface AchievementsPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: AchievementsPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "AchievementsPage" });

  return {
    title: `${t("title")} ${METADATA.exTitle}`,
    description: t("description"),
    keywords: "software engineer achievements, certificates, satria bahari",
    alternates: {
      canonical: `${process.env.DOMAIN}/${locale}/achievements`,
    },
  };
}

const AchievementsPage = async ({
  params: { locale },
}: AchievementsPageProps) => {
  const t = await getTranslations({ locale, namespace: "AchievementsPage" });

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <Achievements />
    </Container>
  );
};

export default AchievementsPage;
