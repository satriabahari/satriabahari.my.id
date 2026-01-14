"use client";

import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { BsBuildings as CompanyIcon } from "react-icons/bs";
import { HiChevronRight as ChevronIcon } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { differenceInMonths, differenceInYears, format } from "date-fns";

import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { CareerProps } from "@/common/types/careers";

const CareerCard = ({
  position,
  company,
  logo,
  location,
  start_date,
  end_date,
  link,
  type,
  location_type,
  responsibilities,
  indexCareer,
}: CareerProps) => {
  const [isShowResponsibility, setIsShowResponsibility] = useState(false);

  const locale = useLocale();

  const startDate = new Date(start_date);
  const endDate = end_date ? new Date(end_date) : new Date();

  const durationYears = differenceInYears(endDate, startDate);
  const durationMonths = differenceInMonths(endDate, startDate) % 12;

  const yearText =
    locale == "en" ? `year${durationYears > 1 ? "s" : ""}` : "tahun";

  let durationText = "";
  if (durationYears > 0) {
    durationText += `${durationYears} ${yearText}`;
  }
  if (durationMonths > 0 || durationYears === 0) {
    durationText += `${durationMonths} Month${durationMonths > 1 ? "s" : ""}`;
  }

  const hideText = locale == "en" ? "Hide" : "Sembunyikan";
  const showText = locale == "en" ? "Show" : "Tampilkan";
  const responsibilityText =
    locale == "en" ? "responsibilities" : "tanggung jawab";

  return (
    <SpotlightCard className="flex items-start gap-5 p-6">
      {logo ? (
        <Image
          width={60}
          height={60}
          src={logo}
          alt={company}
          className="rounded-lg border-[1.5px] border-neutral-300 bg-neutral-100 dark:border-neutral-700"
        />
      ) : (
        <CompanyIcon size={65} />
      )}

      <div className="space-y-1">
        <h5>{position}</h5>
        <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex flex-col gap-2 md:flex-row">
            <Link href={link || "#"} target="_blank">
              <span className="cursor-pointer hover:text-neutral-900 hover:underline hover:dark:text-neutral-50">
                {company}
              </span>
            </Link>
            <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">
              •
            </span>
            <span>{location}</span>
          </div>

          <div className="flex flex-col gap-2 text-[13px] md:flex-row">
            <div className="flex gap-1 text-neutral-600 dark:text-neutral-400">
              <span>{format(startDate, "MMM yyyy")}</span> -{" "}
              <span>{end_date ? format(endDate, "MMM yyyy") : "Present"}</span>
            </div>

            <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">
              •
            </span>
            <span className="text-neutral-500">{durationText}</span>

            <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">
              •
            </span>
            <span className="text-neutral-600 dark:text-neutral-400">
              {type}
            </span>

            <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">
              •
            </span>
            <span className="text-neutral-600 dark:text-neutral-400">
              {location_type}
            </span>
          </div>

          {responsibilities != null && (
            <>
              <button
                onClick={() => setIsShowResponsibility(!isShowResponsibility)}
                className="-ml-1 flex items-center justify-center gap-x-1 transition duration-300 hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-300"
              >
                <motion.span
                  animate={{ rotate: isShowResponsibility ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="inline-block"
                >
                  <ChevronIcon size={18} />
                </motion.span>
                <p className="text-sm">
                  {isShowResponsibility ? hideText : showText}{" "}
                  {responsibilityText}
                </p>
              </button>
              <AnimatePresence>
                {isShowResponsibility && (
                  <motion.ul
                    className="ml-[18px] list-disc space-y-1 pb-2 text-sm leading-normal text-neutral-600 dark:text-neutral-400"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {responsibilities?.map((responsibility, index) => (
                      <motion.li key={index} layout>
                        {responsibility}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
};

export default CareerCard;
