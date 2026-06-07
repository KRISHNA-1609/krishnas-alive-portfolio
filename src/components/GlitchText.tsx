import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  triggerInterval?: number;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const GlitchText = ({
  text,
  className = "",
  triggerOnHover = true,
  triggerInterval = 0,
}: GlitchTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const runGlitch = useCallback(() => {
    if (isGlitching) return;
    setIsGlitching(true);

    let iteration = 0;
    const totalIterations = text.length * 3;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 3) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration++;

      if (iteration >= totalIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsGlitching(false);
      }
    }, 30);
  }, [text, isGlitching]);

  useEffect(() => {
    if (triggerInterval > 0) {
      const timer = setInterval(runGlitch, triggerInterval);
      return () => clearInterval(timer);
    }
  }, [triggerInterval, runGlitch]);

  return (
    <motion.span
      className={`inline-block ${className}`}
      onMouseEnter={triggerOnHover ? runGlitch : undefined}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {displayText.split("").map((char, i) => (
        <span
          key={i}
          className={
            isGlitching && char !== text[i] && char !== " "
              ? "text-primary"
              : ""
          }
        >
          {char}
        </span>
      ))}
    </motion.span>
  );
};

export default GlitchText;
