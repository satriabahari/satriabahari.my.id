"use client";

import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiKotlin,
  SiNodedotjs,
  SiReact,
  SiExpress,
  SiGithub,
  SiVite,
} from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaGolang } from "react-icons/fa6";
import Link from "next/link";
import { BsArrowUp } from "react-icons/bs";

const skills = [
  { icon: <SiNextdotjs size={28} />, color: "text-white" },
  { icon: <SiTypescript size={28} />, color: "text-blue-500" },
  { icon: <SiTailwindcss size={28} />, color: "text-sky-400" },
  { icon: <SiKotlin size={28} />, color: "text-violet-500" },
];

export function TechStackCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="group flex h-full min-h-[400px] flex-col rounded-3xl border border-neutral-800 bg-neutral-900 p-6 transition-colors hover:border-neutral-700"
    >
      <div className="mb-6 grid flex-1 grid-cols-3 gap-3">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex aspect-square items-center justify-center rounded-2xl bg-neutral-800/50 transition-colors hover:bg-neutral-800"
          >
            <div className={skill.color}>{skill.icon}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div>
          <p className="mb-1 text-xs text-neutral-500">Most Use</p>
          <h3 className="text-2xl font-bold">Skills</h3>
        </div>
        <Link href="/skills">
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
