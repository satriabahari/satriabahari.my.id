"use client";

import React, { useTransition } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

const IntlToggle = () => {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const locales = [
    { value: "en", flag: "🇺🇸" },
    { value: "id", flag: "🇮🇩" },
  ];

  const currentIndex = locales.findIndex(
    (locale) => locale.value === currentLocale,
  );

  const buttonWidth = 40;
  const totalWidth = buttonWidth * locales.length;
  const slidePosition = currentIndex * buttonWidth;

  const handleLocaleChange = (nextLocale: string) => {
    if (nextLocale === currentLocale || isPending) return;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`relative hidden items-center gap-1 rounded-full border-[1.5px] border-neutral-300 bg-neutral-100 p-1 dark:border-neutral-700 dark:bg-neutral-800 lg:flex ${
          isPending ? "pointer-events-none opacity-70" : ""
        }`}
        style={{ width: `${totalWidth + (locales.length - 1) * 4 + 10}px` }}
      >
        <motion.div
          className="absolute bottom-1 top-1 w-10 rounded-full bg-primary"
          animate={{
            x: slidePosition + currentIndex * 4,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />

        {locales.map((locale, index) => (
          <motion.button
            key={locale.value}
            className="relative z-10 flex h-8 w-10 items-center justify-center transition duration-200"
            onClick={() => handleLocaleChange(locale.value)}
            whileHover={{ scale: isPending ? 1 : 1.15 }}
            whileTap={{ scale: isPending ? 1 : 0.9 }}
            disabled={isPending}
          >
            <motion.div
              className="flex flex-col items-center justify-center text-xs font-medium"
              animate={{
                color: currentIndex === index ? "#121212" : "#737373",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {locale.flag}
            </motion.div>
          </motion.button>
        ))}
      </div>

      <button
        className="flex items-center gap-2 rounded-full border-[1.5px] border-neutral-300 bg-neutral-100 p-1 transition duration-200 hover:scale-110 dark:border-neutral-700 dark:bg-neutral-800 lg:hidden"
        onClick={() =>
          handleLocaleChange(locales[(currentIndex + 1) % locales.length].value)
        }
        disabled={isPending}
      >
        <motion.div
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white"
        >
          {locales[(currentIndex + 1) % locales.length].flag}
        </motion.div>
      </button>
    </div>
  );
};

export default IntlToggle;
