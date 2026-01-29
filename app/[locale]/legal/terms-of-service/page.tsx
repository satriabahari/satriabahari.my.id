import { Metadata } from "next";
import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Terms of Service ${METADATA.exTitle}`,
  description:
    "Terms of Service for Satria Bahari's Portfolio App regarding TikTok API usage",
  keywords: "portfolio frontend developer, terms of service, tiktok api",
  alternates: {
    canonical: `${process.env.DOMAIN}/terms-of-service`,
  },
};

const TermsOfServicePage = () => {
  return (
    <Container data-aos="fade-up">
      <PageHeading title={"Terms of Service"} />

      <div className="mt-8 space-y-8 leading-relaxed text-neutral-700 dark:text-neutral-300">
        <p className="text-sm italic">Last Updated: January 12, 2026</p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            1. Purpose of the Website
          </h2>
          <p>
            This website is a personal portfolio created to showcase Satria
            Bahari&apos;s professional projects, technical skills, and social
            media presence through integrated API services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            2. Intellectual Property
          </h2>
          <p>
            All original code, design elements, and content on this website are
            the property of Satria Bahari. Content displayed through the TikTok
            API (such as videos and profile data) remains the intellectual
            property of its respective owners and is subject to TikTok&apos;s
            legal terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            3. Use of TikTok Content
          </h2>
          <p>
            The TikTok video feed and data displayed on this site are provided
            via the official TikTok Display API. By using this site, you agree:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              Not to download, copy, or redistribute TikTok content without
              authorization.
            </li>
            <li>
              That the display of this content is intended solely for personal
              branding and portfolio showcasing.
            </li>
            <li>
              To comply with TikTok&apos;s own Terms of Service while
              interacting with integrated features.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            4. Disclaimer
          </h2>
          <p>
            The &quot;Portfolio&quot; application provides TikTok integration
            &quot;as is.&quot; The developer is not responsible for any service
            interruptions, inaccuracies in API data, or changes in TikTok&apos;s
            API availability and policies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            5. Compliance
          </h2>
          <p>
            This App strictly complies with the TikTok Developer Terms of
            Service and only utilizes public-facing API endpoints to showcase
            account information.
          </p>
        </section>
      </div>
    </Container>
  );
};

export default TermsOfServicePage;
