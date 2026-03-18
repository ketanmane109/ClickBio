import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const prompts: Record<string, (input: string, tone?: string) => string> = {
  bio: (input, tone) =>
    `Write 3 different short creator bios (under 150 chars each) for someone in the "${input}" niche. Tone: ${tone || "professional"}. Return ONLY a JSON array of 3 strings, no other text.`,
  hooks: (input) =>
    `Generate 5 viral opening hooks for content about "${input}". These should be attention-grabbing first lines. Return ONLY a JSON array of 5 strings.`,
  captions: (input, tone) =>
    `Write 3 engaging social media captions about "${input}". Tone: ${tone || "casual"}. Include relevant emojis. Return ONLY a JSON array of 3 strings.`,
  hashtags: (input) =>
    `Generate 15 trending and relevant hashtags for "${input}" content. Mix popular and niche hashtags. Return ONLY a JSON array of 15 strings (with # prefix).`,
  ideas: (input) =>
    `Generate 5 creative content ideas for a creator in the "${input}" niche. Each should be a specific, actionable idea. Return ONLY a JSON array of 5 strings.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { type, input, tone } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const promptFn = prompts[type];
    if (!promptFn) throw new Error(`Unknown tool type: ${type}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are a social media expert. Always respond with ONLY a valid JSON array of strings. No markdown, no code blocks, just the JSON array." },
          { role: "user", content: promptFn(input, tone) },
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content?.trim() || "[]";

    // Parse JSON array from response, handling potential markdown wrapping
    let results: string[];
    try {
      const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      results = JSON.parse(cleaned);
    } catch {
      results = [raw];
    }

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-tools error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
