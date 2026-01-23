"use client";

import { motion } from "framer-motion";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { FiFileText } from "react-icons/fi";
import Link from "next/link";

const socialMedia = [
  {
    name: "Github",
    icon: <BsGithub size={32} />,
    href: "https://github.com/satriabahari",
    bgColor: "bg-neutral-800",
  },
  {
    name: "Email",
    icon: <SiGmail size={32} />,
    href: "mailto:satriaabaharii@gmail.com",
    bgColor: "bg-neutral-800",
  },
  {
    name: "LinkedIn",
    icon: <BsLinkedin size={32} />,
    href: "https://www.linkedin.com/in/satria-bahari/",
    bgColor: "bg-neutral-800",
  },
  {
    name: "Resume",
    icon: <FiFileText size={32} />,
    href: "/resume",
    bgColor: "bg-neutral-800",
  },
];

export function SocialMediaGrid() {
  return (
    <div className="grid h-full grid-cols-2 gap-4">
      {socialMedia.map((social, index) => (
        <motion.div
          key={social.name}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="h-full"
        >
          <Link href={social.href} target="_blank" rel="noopener noreferrer">
            <div
              className={`${social.bgColor} group relative flex h-full  cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-neutral-800 transition-all hover:border-neutral-600`}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-neutral-400 transition-colors group-hover:text-white"
              >
                {social.icon}
              </motion.div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
