import { motion } from "framer-motion";
import { Github, ExternalLink as ExternalLinkIcon, Folder, Star } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import Spotlight from "@/components/Spotlight";
import ExternalLink from "@/components/ExternalLink";

const projects = [
  {
    title: "FoodBridge",
    description: "Full-stack web application connecting food donors with receivers to reduce food waste. Features real-time notifications, location-based matching, and a responsive dashboard for managing donations.",
    tags: ["React", "Node.js", "Express.js", "CSS", "MongoDB"],
    github: "https://github.com/KRISHNA-1609/foodbridge-frontend",
    githubBackend: "https://github.com/KRISHNA-1609/foodbridge-backend",
    level: "Advanced",
    featured: true,
  },
  {
    title: "FraudGuard Detection AI",
    description: "AI-powered fraud detection and bot prevention system with real-time monitoring dashboard. Uses machine learning to identify suspicious activities and protect systems from automated threats.",
    tags: ["Node.js", "Express", "MongoDB", "AI", "Security"],
    github: "https://github.com/KRISHNA-1609/FraudGuard-Detection-Ai",
    level: "Advanced",
    featured: true,
  },
  {
    title: "Pizza Bill Generator",
    description: "Pizza Billing System built with Core Java demonstrating Object-Oriented Programming concepts — inheritance, polymorphism, encapsulation — through a real-world billing application.",
    tags: ["Java", "OOP", "Core Java"],
    github: "https://github.com/KRISHNA-1609/Pizza-Bill-generator",
    level: "Intermediate",
  },
  {
    title: "Tic-Tac-Toe Game",
    description: "Interactive two-player Tic-Tac-Toe game with a clean, responsive UI, win detection logic, and smooth animations built with vanilla web technologies.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/KRISHNA-1609/Tic-Tac-Toe-game",
    level: "Beginner",
  },
  {
    title: "Toss Games",
    description: "A fun interactive toss-based game application built as a beginner project to practice HTML, CSS, and JavaScript fundamentals with DOM manipulation.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/KRISHNA-1609/Toss-Games",
    level: "Beginner",
  },
  {
    title: "DSA Problem Solutions",
    description: "Extensive collection of 30+ algorithm solutions including Binary Search, Linked Lists, Arrays, Pascal's Triangle, Container with Most Water, and more — all solved on LeetCode.",
    tags: ["Java", "Algorithms", "DSA", "LeetCode"],
    github: "https://github.com/KRISHNA-1609",
    level: "Advanced",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-primary font-mono text-sm mb-2 block">{'<projects>'}</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-lg">
            An interactive showcase of my projects — from AI-powered security to full-stack web apps.
          </p>
        </motion.div>

        {/* Featured projects - larger cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {projects.filter(p => p.featured).map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard className="group glass-card rounded-2xl p-8 gradient-border relative overflow-hidden h-full">
                <Spotlight />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <Star size={14} className="text-primary fill-primary" />
                      <span className="text-xs font-mono text-primary">Featured • {project.level}</span>
                    </div>
                    <div className="flex gap-2">
                      <ExternalLink href={project.github} className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                        <Github size={16} />
                      </ExternalLink>
                    </div>
                  </div>

                  <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-gradient transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-mono border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Other projects - grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.filter(p => !p.featured).map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative glass-card rounded-xl p-5 gradient-border transition-all overflow-hidden"
            >
              <Spotlight />
              <div className="flex items-center justify-between mb-3">
                <Folder size={20} className="text-primary" />
                <ExternalLink href={project.github} className="text-muted-foreground hover:text-primary transition-colors">
                  <Github size={16} />
                </ExternalLink>
              </div>
              <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
