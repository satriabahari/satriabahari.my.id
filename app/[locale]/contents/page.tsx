import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Tiktok from "@/modules/contents/Tiktok";
import { METADATA } from "@/common/constants/metadata";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "ContentsPage" });

  return {
    title: `${t("title")} ${METADATA.exTitle}`,
    description: t("description"),
    alternates: {
      canonical: `${process.env.DOMAIN}/${locale}/contents`,
    },
  };
}

const ContentsPage = async ({ params: { locale } }: Props) => {
  const t = await getTranslations({ locale, namespace: "ContentsPage" });

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <Tiktok />
    </Container>
  );
};

export default ContentsPage;
