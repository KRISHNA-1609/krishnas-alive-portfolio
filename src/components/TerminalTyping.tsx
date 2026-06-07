import { motion } from "framer-motion";
import { Brain, Network, Code, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

const commands = [
  { cmd: "pip install tensorflow torch", delay: 800 },
  { cmd: "python train_model.py --epochs 100", delay: 1200 },
  { cmd: "Loading dataset... ✓", delay: 600, output: true },
  { cmd: "Epoch 1/100 - loss: 0.8473 - accuracy: 0.7124", delay: 800, output: true },
  { cmd: "Epoch 50/100 - loss: 0.2134 - accuracy: 0.9231", delay: 800, output: true },
  { cmd: "Epoch 100/100 - loss: 0.0892 - accuracy: 0.9712 ✓", delay: 800, output: true },
  { cmd: "model.save('fraudguard_ai_v2.h5')", delay: 600 },
  { cmd: "Deploying to production... ✓", delay: 1000, output: true },
];

const TerminalTyping = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typedChars, setTypedChars] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (visibleLines >= commands.length) {
      setTimeout(() => setCompleted(true), 1500);
      return;
    }

    const currentLine = visibleLines;
    const cmdText = commands[currentLine].cmd;
    const isOutput = commands[currentLine].output;

    if (isOutput) {
      // Output lines appear instantly
      setTypedChars((prev) => {
        const next = [...prev];
        next[currentLine] = cmdText.length;
        return next;
      });
      const timer = setTimeout(() => {
        setVisibleLines((v) => v + 1);
      }, commands[currentLine].delay);
      return () => clearTimeout(timer);
    }

    // Type character by character
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      charIndex++;
      setTypedChars((prev) => {
        const next = [...prev];
        next[currentLine] = charIndex;
        return next;
      });

      if (charIndex >= cmdText.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setVisibleLines((v) => v + 1);
        }, commands[currentLine].delay);
      }
    }, 35);

    return () => clearInterval(typeInterval);
  }, [visibleLines]);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-primary font-mono text-sm mb-2 block">{'<ai-terminal>'}</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Behind the AI</h2>
          <p className="text-muted-foreground max-w-lg">
            A peek into how I build, train, and deploy machine learning models.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          {/* Terminal window */}
          <div className="rounded-xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/5">
            {/* Terminal header */}
            <div className="bg-secondary/80 px-4 py-3 flex items-center gap-2 border-b border-border/30">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 mx-auto">
                <Terminal size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-mono">krishna@dev: ~/ai-projects</span>
              </div>
              <div className="w-16" />
            </div>

            {/* Terminal body */}
            <div className="bg-[#0d1117] p-6 font-mono text-sm min-h-[320px]">
              {/* Prompt line */}
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Brain size={14} className="text-primary" />
                <span className="text-primary">krishna@ai-lab</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-accent">~/ml-projects</span>
                <span className="text-muted-foreground">$</span>
              </div>

              {/* Commands */}
              <div className="space-y-1">
                {commands.map((line, i) => {
                  if (i >= visibleLines) return null;
                  const visibleText = line.cmd.substring(0, typedChars[i] || 0);
                  const isOutput = line.output;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`${isOutput ? "text-green-400/80 pl-4" : "text-foreground"}`}
                    >
                      {isOutput ? (
                        <span>→ {visibleText}</span>
                      ) : (
                        <span>
                          <span className="text-primary">$</span> {visibleText}
                          {i === visibleLines - 1 && typedChars[i] === line.cmd.length && (
                            <span className="animate-pulse text-primary">▊</span>
                          )}
                        </span>
                      )}
                    </motion.div>
                  );
                })}

                {completed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-4 flex items-center gap-3"
                  >
                    <Code size={16} className="text-primary" />
                    <span className="text-primary">Model deployed successfully!</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Stats below terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-4 mt-6"
          >
            {[
              { icon: Brain, label: "Models Trained", value: "15+" },
              { icon: Network, label: "Frameworks", value: "TensorFlow, PyTorch" },
              { icon: Code, label: "AI Projects", value: "8+" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-lg p-4 text-center">
                <stat.icon size={18} className="text-primary mx-auto mb-2" />
                <p className="text-lg font-heading font-bold text-gradient">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalTyping;
