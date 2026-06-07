import { motion } from "framer-motion";

const StatusBadge = () => {
  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.6, duration: 0.5 }}
      className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-full glass border border-primary/30 hover:border-primary/60 transition-colors group"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
      </span>
      <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
        Available for work
      </span>
    </motion.a>
  );
};

export default StatusBadge;
