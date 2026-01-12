import { Metadata } from "next";
import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Privacy Policy ${METADATA.exTitle}`,
  description:
    "Privacy Policy for Satria Bahari's Portfolio App regarding TikTok API integration",
  keywords: "portfolio frontend developer, privacy policy, tiktok api",
  alternates: {
    canonical: `${process.env.DOMAIN}/privacy-policy`,
  },
};

const PrivacyPolicyPage = () => {
  return (
    <Container data-aos="fade-up">
      <PageHeading title={"Privacy Policy"} />

      <div className="mt-8 space-y-8 leading-relaxed text-neutral-700 dark:text-neutral-300">
        <p className="text-sm italic">Effective Date: January 12, 2026</p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            1. Data Collection and Usage
          </h2>
          <p>
            The &quot;Portfolio&quot; application (the &quot;App&quot;) does NOT
            collect, store, or share any personal data from its visitors. The
            App functions as a read-only platform designed to showcase the
            developer&apos;s professional work.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            2. TikTok API Integration
          </h2>
          <p>
            The App utilizes the TikTok Display API to fetch and show the
            developer&apos;s (Satria Bahari) public TikTok content for
            professional display purposes.
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong>Profile Statistics:</strong> The App displays public
              metrics including follower count, following count, and total
              likes.
            </li>
            <li>
              <strong>Content Feed:</strong> The App displays public videos
              uploaded by the developer.
            </li>
            <li>
              <strong>Data Scope:</strong> The App only accesses the
              developer&apos;s own public content. No private user data from
              TikTok or data from other users is accessed or collected.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            3. Third-Party Services
          </h2>
          <p>
            All displayed TikTok data is pulled directly from the official
            TikTok API. Use of these features is subject to the{" "}
            <a
              href="https://www.tiktok.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              TikTok Privacy Policy
            </a>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-neutral-100">
            4. Contact Information
          </h2>
          <p>
            If you have any questions regarding this Privacy Policy, you may
            contact the developer at: <strong>satriaabaharii@gmail.com</strong>.
          </p>
        </section>
      </div>
    </Container>
  );
};

export default PrivacyPolicyPage;
