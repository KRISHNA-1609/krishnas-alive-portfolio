import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import backPic from "@/assets/krishna_hero_cinematic.png";
import useTypewriter from "@/hooks/useTypewriter";
import useScramble from "@/hooks/useScramble";
import MagneticLink from "@/components/MagneticLink";

const roles = [
  "Web Developer",
  "Dynamic Programmer",
  "Cyber Security Enthusiast",
  "AI & ML Explorer",
  "Deep Learning Practitioner",
  "Problem Solver",
];

const marqueeItems = [
  "Krishna Shonka", "✦", "Web Developer", "✦", "React.js", "✦",
  "Node.js", "✦", "Java", "✦", "Cyber Security", "✦",
  "AI & ML", "✦", "Deep Learning", "✦", "TensorFlow", "✦",
  "DSA", "✦", "MERN Stack", "✦", "LeetCode", "✦",
  "MongoDB", "✦", "TypeScript", "✦", "GitHub", "✦",
  "PyTorch", "✦", "Problem Solver", "✦", "FraudGuard AI", "✦",
];

const HeroSection = () => {
  const typedText = useTypewriter(roles, 80, 1500);
  const [scrambleOn, setScrambleOn] = useState(false);
  const scrambled = useScramble("KRISHNA", scrambleOn);

  useEffect(() => {
    const t = setTimeout(() => setScrambleOn(true), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background name text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="name-bg-text whitespace-nowrap">
          {scrambled}
        </span>
      </div>

      {/* Large hero image - centered, behind text like imharry.dev */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <img
          src={backPic}
          alt="Krishna Shonka"
          className="w-full h-full object-cover object-right"
          style={{
            maskImage: "linear-gradient(to left, black 30%, transparent 75%), linear-gradient(to bottom, transparent 0%, black 15%, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, black 30%, transparent 75%), linear-gradient(to bottom, transparent 0%, black 15%, black 80%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "destination-in",
          }}
        />
      </motion.div>

      {/* Content overlay */}
      <div className="container mx-auto px-6 relative z-10 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
          className="max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-primary font-mono text-sm mb-3"
          >
            I'm KRISHNA
          </motion.p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-2 tracking-tight">
            <span className="text-foreground">Web</span>{" "}
            <span className="text-foreground">Developer</span>
          </h1>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 h-14">
            <span className="text-gradient">{typedText}</span>
            <span className="text-primary animate-pulse">|</span>
          </h2>

          <p className="text-muted-foreground text-xs md:text-sm mb-4 max-w-md">
            Web-Developer | AI & ML Enthusiast | Deep Learning | Cyber Security | DSA
          </p>

          <p className="text-muted-foreground/70 text-xs md:text-sm italic max-w-lg mb-8 leading-relaxed">
            "Passionate about building robust web applications, exploring AI & deep learning,
            solving complex algorithmic problems, and securing the digital landscape."
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <MagneticLink href="https://github.com/KRISHNA-1609" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-secondary/80 hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-colors duration-300 inline-flex">
              <Github size={20} />
            </MagneticLink>
            <MagneticLink href="https://www.linkedin.com/in/krishna-shonka-903a67358/?skipRedirect=true" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-secondary/80 hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-colors duration-300 inline-flex">
              <Linkedin size={20} />
            </MagneticLink>
            <MagneticLink href="https://codolio.com/profile/Krishna_1609" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-secondary/80 hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-colors duration-300 inline-flex">
              <ExternalLink size={20} />
            </MagneticLink>
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 py-4 border-t border-border/50 bg-background/80 backdrop-blur-sm overflow-hidden z-20">
        <div className="marquee flex gap-8 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className={`text-sm font-medium ${
                item === "✦" ? "text-primary" : "text-muted-foreground/70"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
