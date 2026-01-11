import dynamic from "next/dynamic";
import {
  BiUser as AboutIcon,
  BiCollection as ProjectIcon,
  BiCategory as DashboardIcon,
  BiBook as ContactIcon,
} from "react-icons/bi";
import { PiChatTeardropDotsBold as ChatRoomIcon } from "react-icons/pi";
import { PiCertificate as AchievementIcon } from "react-icons/pi";

import ChatPreview from "@/modules/home/components/Bento/ChatPreview";
import MarqueeIcons from "@/modules/home/components/Bento/MarqueeIcons";
import AchievementFolder from "@/modules/home/components/Bento/AchievementFolder";

import { BentoItemProps } from "../types/bento";

const AnimatedListProject = dynamic(() => import("@/modules/home/components/Bento/AnimatedListProject"), { ssr: false });
const StackImagesPersonal = dynamic(() => import("@/modules/home/components/Bento/StackImagesPersonal"), { ssr: false });
const TrueFocusService = dynamic(() => import("@/modules/home/components/Bento/TrueFocusService"), { ssr: false });

const size = 22;

export const BENTO: BentoItemProps[] = [
  {
    title: "Projects Showcase",
    description: "A selection of real apps built to solve real problems.",
    label: "Projects",
    icon: <ProjectIcon size={size} />,
    visual: <AnimatedListProject />,
    href: "/projects",
    colSpan: 2,
    className: "from-pink-500 to-rose-500",
    isShow: true,
  },
  {
    title: "About Me",
    description: "Who I am and what I do.",
    label: "About",
    icon: <AboutIcon size={size} />,
    visual: <StackImagesPersonal />,
    href: "/about",
    colSpan: 1,
    className: "from-indigo-500 to-purple-500",
    isShow: true,
  },
  {
    title: "Skills & Tools",
    description: "Covering mobile, web, AI, and UI/UX technologies.",
    label: "Stack",
    icon: <DashboardIcon size={size} />,
    visual: <MarqueeIcons />,
    href: "/",
    colSpan: 1,
    className: "from-emerald-400 to-primary",
    isShow: true,
  },
  {
    title: "Achievements",
    description: "Milestones from programs, projects, and communities.",
    label: "Achievements",
    icon: <AchievementIcon size={size} />,
    visual: <AchievementFolder />,
    href: "/achievements",
    colSpan: 1,
    className: "from-yellow-400 to-orange-500",
    isShow: true,
  },
  {
    title: "Chat Room",
    description: "Open space to talk and collaborate.",
    label: "Chat",
    icon: <ChatRoomIcon size={size} />,
    visual: <ChatPreview />,
    href: "/chat",
    colSpan: 1,
    className: "from-gray-700 to-gray-900",
    isShow: true,
  },
  {
    title: "Services",
    description: "End-to-end solutions in web, mobile, AI, and design.",
    label: "Services",
    icon: <ContactIcon size={size} />,
    visual: <TrueFocusService />,
    href: "/",
    colSpan: 2,
    className: "from-cyan-400 to-blue-600",
    isShow: true,
  },
];
