import Link from "next/link";
import { useTranslations } from "next-intl";

import Container from "@/common/components/elements/Container";

const NotFound = () => {
  const t = useTranslations("NotFoundPage");

  return (
    <Container
      data-aos="fade-up"
      className="flex h-full flex-col items-center justify-center gap-y-4  transition-all duration-300"
    >
      <h1 className="text-6xl font-semibold text-neutral-700 dark:text-neutral-300">
        404
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {t("title")}
      </p>
      <Link
        href="/"
        className="rounded-full border border-neutral-700 px-4 py-2 text-sm hover:bg-neutral-700 hover:text-neutral-300 dark:border-neutral-300 hover:dark:bg-neutral-300 hover:dark:text-neutral-700"
      >
        {t("button")}
      </Link>
    </Container>
  );
};

export default NotFound;
