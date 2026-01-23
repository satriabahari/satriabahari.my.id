"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUp } from "react-icons/bs";

type ProjectItem = {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  link_demo?: string | null;
  link_github?: string | null;
  stacks: string[];
  content?: string | null;
  is_show: boolean;
  is_featured: boolean;
};

type ProjectsCardProps = {
  projects: ProjectItem[];
};

export function ProjectsCard({ projects }: ProjectsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex h-full flex-col rounded-3xl border border-neutral-800 bg-neutral-900 p-6 transition-colors hover:border-neutral-700"
    >
      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative cursor-pointer"
          >
            <Link href={project.link_demo || `/projects/${project.slug}`}>
              <div className="relative h-full  overflow-hidden rounded-2xl bg-neutral-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="mb-1 text-lg font-semibold text-white">
                    {project.title}
                  </h4>
                  <p className="line-clamp-2 text-sm text-neutral-300">
                    {project.description}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="mb-1 text-xs text-neutral-500">Showcase</p>
          <h3 className="text-2xl font-bold">Projects</h3>
        </div>
        <Link href="/projects">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-full bg-white p-2 text-black transition-colors hover:bg-neutral-200"
          >
            <BsArrowUp size={20} />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
