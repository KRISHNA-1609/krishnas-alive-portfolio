import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, Activity, RefreshCw, Radio } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Spotlight from "@/components/Spotlight";

type Data = {
  user: { followers: number; following: number; public_repos: number; avatar: string; name: string };
  stats: { totalStars: number; totalForks: number; totalRepos: number };
  languages: { name: string; count: number }[];
  topRepos: { name: string; description: string; stars: number; forks: number; language: string; url: string; updated: string }[];
  recentActivity: { type: string; repo: string; created: string }[];
  fetchedAt: string;
};

const langColor: Record<string, string> = {
  JavaScript: "bg-yellow-400", TypeScript: "bg-blue-400", Python: "bg-emerald-400",
  Java: "bg-orange-400", HTML: "bg-red-400", CSS: "bg-purple-400", C: "bg-slate-400",
  "C++": "bg-pink-400", Jupyter: "bg-amber-400", default: "bg-primary",
};

const timeAgo = (d: string) => {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};

const LiveGitHub = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data: res, error } = await supabase.functions.invoke("github-stats");
    if (!error && res) setData(res);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <section id="live" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-primary font-mono text-sm mb-2 block">{'<live-data>'}</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 flex items-center gap-3">
              Live GitHub Pulse
              <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Radio size={12} className="animate-pulse" /> LIVE
              </span>
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Auto-fetched from the GitHub API every load — no manual edits, real-time activity.
            </p>
          </div>
          <button onClick={load} className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-colors">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </motion.div>

        {loading && !data ? (
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => <div key={i} className="h-32 glass-card rounded-2xl animate-pulse" />)}
          </div>
        ) : data ? (
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Stats column */}
            <div className="space-y-4">
              <div className="glass-card rounded-2xl p-6 gradient-border relative overflow-hidden">
                <Spotlight />
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div><p className="text-2xl font-heading font-bold text-gradient">{data.stats.totalRepos}</p><p className="text-[10px] text-muted-foreground mt-1">Repos</p></div>
                  <div><p className="text-2xl font-heading font-bold text-gradient">{data.user.followers}</p><p className="text-[10px] text-muted-foreground mt-1">Followers</p></div>
                  <div><p className="text-2xl font-heading font-bold text-gradient">{data.stats.totalStars}</p><p className="text-[10px] text-muted-foreground mt-1">Stars</p></div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 gradient-border relative overflow-hidden">
                <Spotlight />
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2"><Activity size={14} className="text-primary" /> Language Mix</h3>
                <div className="space-y-2">
                  {data.languages.map(l => {
                    const pct = (l.count / data.languages.reduce((s, x) => s + x.count, 0)) * 100;
                    return (
                      <div key={l.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-mono">{l.name}</span>
                          <span className="text-muted-foreground">{pct.toFixed(0)}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} className={`h-full ${langColor[l.name] || langColor.default}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 gradient-border relative overflow-hidden">
                <Spotlight />
                <h3 className="text-sm font-semibold mb-3">Recent Activity</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {data.recentActivity.slice(0, 6).map((a, i) => (
                    <div key={i} className="text-xs flex items-start gap-2 font-mono">
                      <span className="text-primary mt-0.5">→</span>
                      <div className="flex-1 min-w-0">
                        <p className="truncate"><span className="text-accent">{a.type.replace("Event", "")}</span> {a.repo?.split("/")[1]}</p>
                        <p className="text-[10px] text-muted-foreground">{timeAgo(a.created)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Repos grid */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {data.topRepos.map((r, i) => (
                <motion.a
                  key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}
                  className="group relative glass-card rounded-xl p-5 gradient-border overflow-hidden block"
                >
                  <Spotlight />
                  <div className="flex items-center justify-between mb-3">
                    <Github size={18} className="text-primary" />
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Star size={12} /> {r.stars}</span>
                      <span className="flex items-center gap-1"><GitFork size={12} /> {r.forks}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors truncate">{r.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3 min-h-[2rem]">{r.description || "No description"}</p>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    {r.language && (
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${langColor[r.language] || langColor.default}`} />
                        {r.language}
                      </span>
                    )}
                    <span className="text-muted-foreground">{timeAgo(r.updated)}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Could not load live data.</p>
        )}
      </div>
    </section>
  );
};

export default LiveGitHub;
