"use client";

import { motion } from "framer-motion";

export function HeroStatementCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="group relative flex h-full items-center justify-center overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 p-8 transition-colors hover:border-orange-500/50"
    >
      <div className="relative z-10 text-center">
        <h2 className="text-xl font-bold leading-tight md:text-xl">
          <span className="text-orange-400">Building Skills</span>
          <br />
          <span className="text-orange-400">For Future.</span>
        </h2>
      </div>

      {/* Background decoration */}
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl transition-colors group-hover:bg-orange-500/20" />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl transition-colors group-hover:bg-orange-500/20" />
    </motion.div>
  );
}
