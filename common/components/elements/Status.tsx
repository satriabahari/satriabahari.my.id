import { motion } from "framer-motion";

const Status = () => {
  return (
    <div className="flex items-center gap-2 rounded-full border border-neutral-700 px-4 py-1">
      <motion.div
        className="h-2 w-2 rounded-full bg-primary-400"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      <span className="text-sm font-thin text-neutral-600 dark:text-neutral-400">
        Hire me.
      </span>
    </div>
  );
};

export default Status;
