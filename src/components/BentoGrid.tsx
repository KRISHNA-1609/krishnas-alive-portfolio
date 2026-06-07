import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Shield, Globe, Cpu, Brain, Zap, Radio } from "lucide-react";
import useCountUp from "@/hooks/useCountUp";
import Spotlight from "@/components/Spotlight";
import { supabase } from "@/integrations/supabase/client";

const BentoGrid = () => {
  const [liveProblems, setLiveProblems] = useState(424);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    supabase.functions.invoke("codolio-stats").then(({ data }) => {
      if (data?.totalSolved && typeof data.totalSolved === "number") {
        setLiveProblems(data.totalSolved);
        setIsLive(true);
      }
    });
  }, []);

  const repos = useCountUp(30, 2000);
  const contributions = useCountUp(135, 2000);
  const problems = useCountUp(liveProblems, 2500);
  const models = useCountUp(15, 2000);

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Big card - Building with Code */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="group relative col-span-2 row-span-2 glass-card rounded-2xl p-8 gradient-border flex flex-col justify-between min-h-[280px] overflow-hidden"
          >
            <Spotlight />
            <div>
              <Code2 className="text-primary mb-4" size={32} />
              <h3 className="text-xl md:text-2xl font-heading font-bold mb-2">
                Building with Code, AI & Creativity
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From scalable full-stack apps to AI-powered security systems and deep learning models —
                I love turning complex ideas into clean, intelligent software that solves real problems.
              </p>
            </div>
            <div className="flex gap-6 mt-6">
              <div>
                <p className="text-3xl font-heading font-bold text-gradient">{repos.count}+</p>
                <p className="text-xs text-muted-foreground mt-1">Repositories</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-gradient">{contributions.count}+</p>
                <p className="text-xs text-muted-foreground mt-1">Contributions</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-gradient">{models.count}+</p>
                <p className="text-xs text-muted-foreground mt-1">AI Models</p>
              </div>
            </div>
          </motion.div>

          {/* DSA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="group relative glass-card rounded-2xl p-6 gradient-border flex flex-col justify-between overflow-hidden"
          >
            <Spotlight />
            <Cpu className="text-primary mb-3" size={24} />
            <div>
              <p className="text-2xl font-heading font-bold text-gradient">{problems.count}+</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                DSA Problems Solved
                {isLive && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Radio size={8} className="animate-pulse" /> LIVE
                  </span>
                )}
              </p>
            </div>
          </motion.div>

          {/* AI & ML Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="group relative glass-card rounded-2xl p-6 gradient-border flex flex-col justify-between overflow-hidden"
          >
            <Spotlight color="280 80% 55%" />
            <Brain className="text-accent mb-3" size={24} />
            <div>
              <p className="text-sm font-semibold">AI & Deep Learning</p>
              <p className="text-xs text-muted-foreground mt-1">TensorFlow, PyTorch, Neural Networks</p>
            </div>
          </motion.div>

          {/* Cyber Security */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="group relative glass-card rounded-2xl p-6 gradient-border flex flex-col justify-between overflow-hidden"
          >
            <Spotlight color="160 80% 45%" />
            <Shield className="text-accent mb-3" size={24} />
            <div>
              <p className="text-sm font-semibold">Cyber Security</p>
              <p className="text-xs text-muted-foreground mt-1">Fraud Detection & Bot Prevention</p>
            </div>
          </motion.div>

          {/* Always learning */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="group relative col-span-2 glass-card rounded-2xl p-6 gradient-border overflow-hidden"
          >
            <Spotlight />
            <Zap className="text-primary mb-3" size={24} />
            <h3 className="text-lg font-heading font-bold mb-1">Always Learning. Always Building.</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Exploring new technologies from MERN stack to neural networks, competitive programming to
              deep learning. Currently experimenting with transformer architectures and LLM fine-tuning.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
