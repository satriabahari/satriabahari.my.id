import { getProjectsData } from "@/services/projects";
import { HeroStatementCard } from "./HeroStatementCard";
import { ProjectsCard } from "./ProjectsCard";
import { SocialMediaGrid } from "./SocialMediaGrid";
import { TechStackCard } from "./TechStackCard";
import IntroductionCard from "./IntroductionCard";

export async function BentoGrid() {
  const projects = await getProjectsData();
  const recentProjects = projects
    .filter((p) => p.is_show)
    .sort((a, b) => b.id - a.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen  text-white">
      <div className="mx-auto max-w-7xl">
        {/* Grid Layout - 3 columns */}
        <div className="grid grid-cols-12 gap-4">
          {/* Row 1 */}
          <div className="md:col-span-3">
            <IntroductionCard />
          </div>

          <div className="md:col-span-3">
            <SocialMediaGrid />
          </div>

          <div className="md:col-span-6">
            <HeroStatementCard />
          </div>

          {/* Row 2 */}
          <div className="md:col-span-2">
            <TechStackCard />
          </div>

          <div className="md:col-span-7">
            <ProjectsCard projects={recentProjects} />
          </div>

          <div className="md:col-span-3">
            <TechStackCard />
          </div>
        </div>
      </div>
    </div>
  );
}
