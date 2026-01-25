"use client";

import { ReactNode, useEffect, useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "next-themes";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonThemeProvider = ({ children }: { children: ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <SkeletonTheme
      baseColor={isDark ? "#171717" : "#d4d4d4"}
      highlightColor={isDark ? "#525252" : "#f5f5f5"}
      duration={2}
    >
      {children}
    </SkeletonTheme>
  );
};

export default SkeletonThemeProvider;
