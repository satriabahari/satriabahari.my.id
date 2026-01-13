import Link from "next/link";
import { useTranslations } from "next-intl";
import { BsGithub as GithubIcon } from "react-icons/bs";
import { FiExternalLink as LinkIcon } from "react-icons/fi";

interface ProjectLinkProps {
  title?: string;
  link_github?: string;
  link_demo?: string;
}

interface LinkComponentProps {
  url: string;
  text: string;
  icon: JSX.Element;
}

const LinkComponent = ({ url, text, icon }: LinkComponentProps) => {
  return (
    <Link href={url} target="_blank">
      <div className="flex items-center gap-2 font-medium text-neutral-700 dark:text-neutral-300">
        <i>{icon}</i>
        <p className="text-sm transition-all duration-300 dark:text-primary hover:dark:text-primary-400">
          {text}
        </p>
      </div>
    </Link>
  );
};

const ProjectLink = ({ title, link_github, link_demo }: ProjectLinkProps) => {
  const t = useTranslations("ProjectsPage");

  return (
    <div className="flex gap-4">
      {link_github ? (
        <LinkComponent
          url={link_github}
          text={t("source_code_text")}
          icon={<GithubIcon size={22} />}
        />
      ) : null}
      {link_github && link_demo ? (
        <span className="text-neutral-400 dark:text-neutral-600">|</span>
      ) : null}
      {link_demo ? (
        <LinkComponent
          url={link_demo}
          text={t("live_demo_text")}
          icon={<LinkIcon size={22} />}
        />
      ) : null}
    </div>
  );
};

export default ProjectLink;
