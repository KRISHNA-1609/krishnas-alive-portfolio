import { motion } from "framer-motion";
import { useState } from "react";

const categories = ["All", "Programming", "Web Development", "AI & ML", "Tools & Platforms", "Security"];

const skills = [
  { name: "Java", category: "Programming", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python", category: "Programming", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "C", category: "Programming", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "JavaScript", category: "Web Development", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React.js", category: "Web Development", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", category: "Web Development", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "TypeScript", category: "Web Development", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "HTML5", category: "Web Development", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", category: "Web Development", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "MongoDB", category: "Web Development", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Express.js", category: "Web Development", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Tailwind CSS", category: "Web Development", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "TensorFlow", category: "AI & ML", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "PyTorch", category: "AI & ML", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "Scikit-learn", category: "AI & ML", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "NumPy", category: "AI & ML", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
  { name: "Pandas", category: "AI & ML", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "OpenCV", category: "AI & ML", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
  { name: "Git", category: "Tools & Platforms", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", category: "Tools & Platforms", level: "Proficient", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "VS Code", category: "Tools & Platforms", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Linux", category: "Security", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Bash", category: "Security", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
];

const levelColors: Record<string, string> = {
  Advanced: "bg-primary/20 text-primary border-primary/30",
  Proficient: "bg-accent/20 text-accent border-accent/30",
  Intermediate: "bg-muted text-muted-foreground border-border",
};

const SkillsSection = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-mono text-sm mb-2 block">{'<skills>'}</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">My Tech Arsenal</h2>
          <p className="text-muted-foreground mb-10 max-w-lg">
            Technologies and tools I use to bring ideas to life — from web apps to neural networks.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
        >
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="glass-card rounded-xl p-4 flex flex-col items-center gap-3 hover:border-primary/40 transition-all cursor-default group gradient-border"
            >
              <div className="relative">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xs font-semibold text-center">{skill.name}</h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${levelColors[skill.level]}`}>
                {skill.level}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scrolling tech stack */}
        <div className="mt-16 overflow-hidden">
          <div className="marquee flex gap-6 whitespace-nowrap">
            {[...skills, ...skills].map((s, i) => (
              <span key={i} className="text-sm text-muted-foreground/40 font-mono">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
