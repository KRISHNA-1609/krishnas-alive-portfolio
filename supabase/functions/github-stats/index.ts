import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const USERNAME = "KRISHNA-1609";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const headers: Record<string, string> = {
      "Accept": "application/vnd.github+json",
      "User-Agent": "lovable-portfolio",
    };
    const token = Deno.env.get("GITHUB_TOKEN");
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, { headers }),
      fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=30`, { headers }),
    ]);

    if (!userRes.ok) throw new Error(`GitHub user ${userRes.status}`);
    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];
    const events = eventsRes.ok ? await eventsRes.json() : [];

    const totalStars = repos.reduce((s: number, r: any) => s + (r.stargazers_count || 0), 0);
    const totalForks = repos.reduce((s: number, r: any) => s + (r.forks_count || 0), 0);

    const langCount: Record<string, number> = {};
    repos.forEach((r: any) => {
      if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
    });
    const languages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));

    const topRepos = repos
      .filter((r: any) => !r.fork)
      .sort((a: any, b: any) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()))
      .slice(0, 6)
      .map((r: any) => ({
        name: r.name,
        description: r.description,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        url: r.html_url,
        updated: r.pushed_at,
      }));

    const recentActivity = events.slice(0, 8).map((e: any) => ({
      type: e.type,
      repo: e.repo?.name,
      created: e.created_at,
    }));

    return new Response(JSON.stringify({
      user: {
        name: user.name,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        public_repos: user.public_repos,
        avatar: user.avatar_url,
      },
      stats: { totalStars, totalForks, totalRepos: repos.length },
      languages,
      topRepos,
      recentActivity,
      fetchedAt: new Date().toISOString(),
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=300" },
    });
  } catch (e) {
    console.error("github-stats error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
