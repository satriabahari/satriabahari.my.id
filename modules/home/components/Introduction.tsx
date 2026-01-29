import { useTranslations } from "next-intl";

const Introduction = () => {
  const t = useTranslations("HomePage");

  const paragraphData = [{ index: 1 }, { index: 2 }];

  return (
    <section className="space-y-2 bg-cover bg-no-repeat">
      <div className="text-3xl font-medium text-neutral-900 dark:text-neutral-50">
        <h1>{t("intro")}</h1>
      </div>

      <div className="space-y-4">
        <ul className="ml-5 flex list-disc flex-col gap-x-10 gap-y-2 text-neutral-700 dark:text-neutral-400 md:flex-row">
          <li>{t("location")}</li>
          <li>{t("location_type")}</li>
        </ul>
        <div className="mt-6 space-y-4 leading-7 text-neutral-600 dark:text-neutral-300">
          {paragraphData.map((paragraph) => (
            <div key={paragraph.index}>
              {t(`resume.paragraph_${paragraph.index}`)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Introduction;
