import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const USERNAME = "Krishna_1609";

const pick = (html: string, key: string): number | null => {
  const re = new RegExp(`"${key}\\\\?":\\s*(\\d+)`);
  const m = html.match(re);
  return m ? parseInt(m[1], 10) : null;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const res = await fetch(`https://codolio.com/profile/${USERNAME}/card`, {
      headers: { "User-Agent": "Mozilla/5.0 (lovable-portfolio)" },
    });
    if (!res.ok) throw new Error(`Codolio ${res.status}`);
    const html = await res.text();

    const totalSolved = pick(html, "totalQuestionsSolved") ?? 424;
    const activeDays = pick(html, "totalActiveDays") ?? 0;
    const contests = pick(html, "totalContests") ?? 0;

    return new Response(JSON.stringify({
      username: USERNAME,
      totalSolved,
      activeDays,
      contests,
      profileUrl: `https://codolio.com/profile/${USERNAME}`,
      fetchedAt: new Date().toISOString(),
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=600" },
    });
  } catch (e) {
    console.error("codolio-stats error:", e);
    return new Response(JSON.stringify({
      totalSolved: 424, activeDays: 0, contests: 0,
      error: e instanceof Error ? e.message : "Unknown",
    }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
