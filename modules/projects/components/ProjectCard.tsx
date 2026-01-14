import Link from "next/link";
import { HiOutlineArrowSmRight as ViewIcon } from "react-icons/hi";
import { useTranslations } from "next-intl";
import { TbPinnedFilled as PinIcon } from "react-icons/tb";

import Image from "@/common/components/elements/Image";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { ProjectItem } from "@/common/types/projects";
import { STACKS } from "@/common/constants/stacks";

const ProjectCard = ({
  title,
  slug,
  description,
  image,
  stacks,
  is_featured,
}: ProjectItem) => {
  const t = useTranslations("ProjectsPage");

  const trimmedContent =
    description.slice(0, 85) + (description.length > 85 ? "..." : "");

  return (
    <Link href={`/projects/${slug}`}>
      <SpotlightCard className="group relative cursor-pointer">
        {is_featured && (
          <div className="absolute right-0 top-0 z-10 flex items-center gap-x-1 rounded-bl-lg rounded-tr-lg bg-primary px-2 py-1 text-sm font-medium text-neutral-900">
            <PinIcon size={15} />
            <span>Featured</span>
          </div>
        )}
        <div className="relative">
          <Image
            src={image}
            alt={title}
            width={450}
            height={200}
            className="h-[200px] w-full rounded-t-xl object-cover"
          />
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-1 rounded-t-xl bg-black text-sm font-medium text-neutral-50 opacity-0 transition-opacity duration-300 group-hover:opacity-80">
            <span>{t("view_project")}</span>
            <ViewIcon size={20} />
          </div>
        </div>
        <div className="space-y-2 p-5">
          <h3 className="cursor-pointer text-neutral-700 transition-all duration-300 group-hover:text-primary dark:text-neutral-300">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {trimmedContent}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {stacks.map((stack: string, index: number) => {
              const stackData = STACKS[stack];

              return (
                <div key={index} className={`${stackData.color}`}>
                  {stackData.icon}
                </div>
              );
            })}
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
};

export default ProjectCard;
