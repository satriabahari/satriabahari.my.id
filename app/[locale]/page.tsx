import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import Home from "@/modules/home";
import { METADATA } from "@/common/constants/metadata";

interface HomePageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: HomePageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return {
    title: `${METADATA.creator} | Portfolio`,
    description: t("resume.paragraph_1"),
    alternates: {
      canonical: `${process.env.DOMAIN}/${locale}`,
    },
    openGraph: {
      title: `${METADATA.creator} | Personal Website`,
      description: t("resume.paragraph_1"),
      url: `${process.env.DOMAIN}/${locale}`,
      siteName: METADATA.openGraph.siteName,
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
    },
  };
}

const HomePage = async ({ params: { locale } }: HomePageProps) => {
  return (
    <Container data-aos="fade-up">
      <Home />
    </Container>
  );
};

export default HomePage;
