import { Metadata } from "next";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import { METADATA } from "@/common/constants/metadata";
import Tiktok from "@/modules/contents/Tiktok";

export const metadata: Metadata = {
  title: `Contents ${METADATA.exTitle}`,
  description: `My Tiktok Contents`,
  alternates: {
    canonical: `${process.env.DOMAIN}/contents`,
  },
};

const ContentsPage = () => {
  return (
    <Container data-aos="fade-up">
      <PageHeading title={"Tiktok"} description={"My Tiktok Contents"} />
      <Tiktok />
    </Container>
  );
};

export default ContentsPage;
