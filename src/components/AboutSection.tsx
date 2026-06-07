import { motion } from "framer-motion";
import krishnaImg from "@/assets/krishna.jpeg";
import { MapPin, Calendar, GraduationCap, Briefcase, Brain, Cpu } from "lucide-react";
import ExternalLink from "@/components/ExternalLink";

const timeline = [
  {
    icon: GraduationCap,
    title: "B.Tech in Computer Science",
    subtitle: "Currently Pursuing",
    description: "Focusing on Data Structures, Algorithms, Web Development, AI/ML, and Cyber Security.",
    current: true,
  },
  {
    icon: Brain,
    title: "AI & ML Explorer",
    subtitle: "Self-Learning & Experimenting",
    description: "Building neural networks, training models with TensorFlow & PyTorch, and exploring deep learning for real-world problems like fraud detection.",
    current: false,
  },
  {
    icon: Briefcase,
    title: "Full-Stack Developer",
    subtitle: "Self-Taught & Building",
    description: "Built FoodBridge, FraudGuard AI, and 30+ projects across MERN stack, Java, and AI integration.",
    current: false,
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-primary font-mono text-sm mb-2 block">{'<about>'}</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">About Me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* 3D-style image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:sticky lg:top-24"
          >
            <motion.div
              whileHover={{ rotateY: 15, rotateX: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              style={{ perspective: 1200, transformStyle: "preserve-3d" }}
              className="relative"
            >
              <div className="w-72 h-80 md:w-80 md:h-[420px] rounded-2xl overflow-hidden pulse-glow">
                <img
                  src={krishnaImg}
                  alt="Krishna Shonka"
                  className="w-full h-full object-cover object-top"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-lg font-heading font-bold">Krishna Shonka</p>
                  <p className="text-xs text-primary font-mono">@KRISHNA-1609</p>
                </div>
              </div>
              {/* 3D shadow layers */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-primary/15 -z-10" />
              <div className="absolute -bottom-6 -right-6 w-full h-full rounded-2xl border border-primary/8 -z-20" />
            </motion.div>
          </motion.div>

          {/* About content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6 text-sm text-muted-foreground">
              <MapPin size={14} className="text-primary" />
              <span>India</span>
              <span className="text-border">•</span>
              <Calendar size={14} className="text-primary" />
              <span>Active since 2025</span>
            </div>

            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed mb-8">
              <p>
                I'm <span className="text-foreground font-semibold">Krishna Shonka</span>, a passionate web developer,
                AI & ML enthusiast, and dynamic programmer with a deep interest in cyber security.
                I specialize in building full-stack web applications using the MERN stack, training
                neural networks, and solving complex algorithmic problems.
              </p>
              <p>
                With expertise in <span className="text-primary">Java, JavaScript, React, Node.js, TensorFlow, and PyTorch</span>,
                I focus on creating clean, efficient, and intelligent solutions. I've built AI-powered
                fraud detection systems using deep learning, food donation platforms, and solved hundreds
                of DSA problems on LeetCode.
              </p>
              <p>
                My journey into <span className="text-accent">Artificial Intelligence</span> started with curiosity
                about how machines learn — now I'm building models that can detect anomalies, classify data,
                and make predictions. When I'm not coding, I'm exploring cybersecurity concepts — network security,
                bot prevention, and building tools that make the web a safer place.
              </p>
              <p>
                I believe in <span className="text-primary">continuous learning</span> — whether it's a new framework,
                a neural network architecture, or a security vulnerability. Always exploring, always building.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-6 mb-8">
              <h3 className="text-sm font-mono text-primary">// Journey</h3>
              {timeline.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="flex gap-4"
                >
                  <div className={`mt-1 p-2 rounded-lg shrink-0 ${item.current ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                    <item.icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-primary font-mono">{item.subtitle}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "GitHub", href: "https://github.com/KRISHNA-1609" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/krishna-shonka-903a67358/?skipRedirect=true" },
                { label: "Codolio", href: "https://codolio.com/profile/Krishna_1609" },
              ].map((link) => (
                <ExternalLink
                  key={link.label}
                  href={link.href}
                  className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-0.5"
                >
                  {link.label} ↗
                </ExternalLink>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
