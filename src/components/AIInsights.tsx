import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Spotlight from "@/components/Spotlight";

type Insights = {
  headline: string;
  focus: { area: string; reason: string }[];
  nextMove: string;
  vibe: string;
};

const AIInsights = () => {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const { data: gh } = await supabase.functions.invoke("github-stats");
      const { data, error: err } = await supabase.functions.invoke("ai-insights", {
        body: { stats: gh },
      });
      if (err) throw err;
      if (data?.insights) setInsights(data.insights);
      else setError(data?.error || "Failed to generate insights");
    } catch (e: any) {
      setError(e.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <section id="ai-insights" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="text-primary font-mono text-sm mb-2 block">{'<ai-analysis>'}</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 flex items-center gap-3">
            <Brain className="text-accent" size={36} />
            AI-Generated Insights
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Powered by Gemini — analyzes my live GitHub activity in real-time to surface focus areas and momentum.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative glass-card rounded-3xl p-8 md:p-10 gradient-border overflow-hidden"
        >
          <Spotlight color="280 80% 55%" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          {loading ? (
            <div className="flex items-center gap-3 text-muted-foreground py-12 justify-center">
              <Loader2 className="animate-spin" size={20} />
              <span className="font-mono text-sm">AI is analyzing portfolio...</span>
            </div>
          ) : error ? (
            <p className="text-sm text-muted-foreground py-8 text-center">{error}</p>
          ) : insights ? (
            <div className="relative space-y-8">
              <div className="flex items-start gap-3">
                <Sparkles className="text-accent shrink-0 mt-1" size={20} />
                <h3 className="text-xl md:text-2xl font-heading font-bold leading-snug">
                  "{insights.headline}"
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {insights.focus.map((f, i) => (
                  <motion.div
                    key={f.area}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                    className="p-5 rounded-xl bg-secondary/30 border border-border/50 backdrop-blur-sm"
                  >
                    <p className="text-[10px] font-mono text-primary mb-2">FOCUS_{i + 1}</p>
                    <h4 className="font-semibold mb-2">{f.area}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.reason}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <ArrowRight className="text-primary" size={18} />
                  <p className="text-sm"><span className="text-muted-foreground">Next move: </span>{insights.nextMove}</p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                  vibe: {insights.vibe}
                </span>
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default AIInsights;
