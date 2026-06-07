import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const IntroLoader = () => {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("ks_intro_seen");
  });

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("ks_intro_seen", "1");
    }, 2200);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [show]);

  const letters = "KRISHNA".split("");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          <div className="relative flex items-end gap-1 overflow-hidden">
            {letters.map((l, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading font-black text-6xl md:text-9xl tracking-tight text-foreground"
              >
                {l}
              </motion.span>
            ))}
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
              className="ml-2 mb-3 w-3 h-3 md:w-5 md:h-5 rounded-full bg-primary shadow-[0_0_30px_hsl(180_100%_50%/0.8)]"
            />
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ delay: 0.4, duration: 1.4, ease: "easeInOut" }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
