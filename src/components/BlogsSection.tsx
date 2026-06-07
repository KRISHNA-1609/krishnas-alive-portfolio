import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";

const blogs = [
  {
    title: "Building FraudGuard: AI-Powered Bot Detection",
    description: "How I designed and built an AI-powered fraud detection system with real-time monitoring, bot prevention, and a security dashboard using Node.js and MongoDB.",
    date: "Jan 2026",
    tag: "Security",
    readTime: "5 min",
    href: "https://github.com/KRISHNA-1609",
  },
  {
    title: "My DSA Journey: 500+ Problems Later",
    description: "Tips and strategies for solving Data Structures & Algorithms problems efficiently — from Arrays and Binary Search to Linked Lists and Dynamic Programming.",
    date: "Coming Soon",
    tag: "DSA",
    readTime: "8 min",
    href: "https://codolio.com/profile/Krishna_1609",
  },
  {
    title: "FoodBridge: Tech for Social Good",
    description: "The story behind FoodBridge — a full-stack platform connecting food donors with receivers. Featuring real-time notifications and location-based matching.",
    date: "Apr 2026",
    tag: "Web Dev",
    readTime: "6 min",
    href: "https://github.com/KRISHNA-1609",
  },
  {
    title: "MERN Stack: From Zero to Production",
    description: "A deep dive into building production-ready applications with MongoDB, Express, React, and Node.js — with lessons learned from my projects.",
    date: "Coming Soon",
    tag: "Tutorial",
    readTime: "10 min",
    href: "https://github.com/KRISHNA-1609",
  },
];

const tagColors: Record<string, string> = {
  Security: "bg-red-500/10 text-red-400 border-red-500/20",
  DSA: "bg-primary/10 text-primary border-primary/20",
  "Web Dev": "bg-accent/10 text-accent border-accent/20",
  Tutorial: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const BlogsSection = () => {
  return (
    <section id="blogs" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-primary font-mono text-sm mb-2 block">{'<blogs>'}</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Blogs & Insights</h2>
          <p className="text-muted-foreground max-w-lg">
            Sharing knowledge on web development, security, and competitive programming.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog, i) => (
            <motion.a
              key={blog.title}
              href={blog.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group glass-card rounded-2xl p-6 gradient-border transition-all cursor-pointer block"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs px-3 py-1 rounded-full border font-mono ${tagColors[blog.tag]}`}>
                  {blog.tag}
                </span>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {blog.readTime}
                  </span>
                  <span>{blog.date}</span>
                </div>
              </div>
              <h3 className="text-lg font-heading font-bold mb-3 group-hover:text-primary transition-colors flex items-start gap-2">
                {blog.title}
                <ArrowUpRight size={16} className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {blog.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
