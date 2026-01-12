import { TbSchool as EducationIcon } from "react-icons/tb";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import { EDUCATION } from "@/common/constants/education";

import EducationCard from "./EducationCard";
import { useTranslations } from "next-intl";

const EducationList = () => {
  const t = useTranslations("AboutPage.education");

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <SectionHeading title={t("title")} icon={<EducationIcon />} />
        <SectionSubHeading>
          <p>{t("sub_title")}</p>
        </SectionSubHeading>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {EDUCATION?.map((item, index) => (
          <EducationCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default EducationList;
