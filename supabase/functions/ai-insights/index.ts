import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const { stats } = await req.json().catch(() => ({ stats: null }));

    const system = `You are an AI analyst for a developer portfolio. Output ONLY valid JSON matching the schema. Be specific, concise, motivating. No markdown.`;

    const userPrompt = `Analyze this developer's live portfolio data and produce insights.
Developer: Krishna Shonka — Full-stack + AI/ML/DL engineer.
Live GitHub data: ${JSON.stringify(stats || {})}
Also known: 424 DSA problems solved on Codolio, building FraudGuard (AI security) and FoodBridge (MERN).

Return JSON with keys:
- headline: one punchy sentence (max 14 words) summarizing momentum
- focus: top 3 technical focus areas based on languages/repos, each as {area, reason}
- nextMove: one suggested next learning/project move (max 20 words)
- vibe: 2-3 word mood tag (e.g. "shipping fast", "deep learning sprint")`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: system }, { role: "user", content: userPrompt }],
        tools: [{
          type: "function",
          function: {
            name: "emit_insights",
            description: "Return portfolio insights",
            parameters: {
              type: "object",
              properties: {
                headline: { type: "string" },
                focus: {
                  type: "array",
                  items: { type: "object", properties: { area: { type: "string" }, reason: { type: "string" } }, required: ["area", "reason"] },
                },
                nextMove: { type: "string" },
                vibe: { type: "string" },
              },
              required: ["headline", "focus", "nextMove", "vibe"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "emit_insights" } },
      }),
    });

    if (res.status === 429) return new Response(JSON.stringify({ error: "Rate limited, try again shortly." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (res.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!res.ok) {
      const t = await res.text();
      console.error("AI gateway error", res.status, t);
      throw new Error("AI gateway error");
    }

    const data = await res.json();
    const args = data.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    const insights = args ? JSON.parse(args) : null;

    return new Response(JSON.stringify({ insights, generatedAt: new Date().toISOString() }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-insights error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
