const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PORTFOLIO = `
PROJECTS:
- MindBloom: AI-based adaptive learning platform with gamified learning, voice-guided systems, emotion-aware apps. Tags: React, TypeScript, Tailwind CSS, Supabase.
- CoordiNet: Emergency coordination platform connecting police, hospitals, and disaster authorities with citizens; maps, charts. Tags: React, TypeScript, Tailwind CSS, Supabase.
- BookPard: Full-stack web app with authentication, book selling, admin dashboard, secure payments. Tags: React, TypeScript, Tailwind CSS, Supabase.
- Library Management: Console-based system using C++ and OOP with file handling. Tags: C++, OOP.
SKILLS: C++, Java, React, Front-End Development, Web Design, Video Editing, Graphic Design, TypeScript, Tailwind, Git, VS Code, Figma, SQL.
`;

const INSTRUCTIONS = `You recommend items from Prakhar Tiwari's portfolio to a visitor, in a light Harry Potter tone.
Only use items listed below. Respond with ONLY a JSON object, no markdown:
{"summary": string (one short sentence), "projects": [{"title": exact project title, "reason": one sentence}] (1-3 items, best first), "skills": [exact skill names] (2-5 items)}
${PORTFOLIO}`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const json = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const { interests } = await req.json();
    if (typeof interests !== "string" || !interests.trim() || interests.length > 500) {
      return json({ error: "Please describe your interests (up to 500 characters)." }, 400);
    }
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json({ error: "AI is not configured." }, 500);

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      signal: req.signal,
      headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "fetch" },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        instructions: INSTRUCTIONS,
        input: `Visitor interests: ${interests.trim()}`,
        stream: true,
        store: false,
        reasoning: { effort: "low", summary: "auto" },
        include: ["reasoning.encrypted_content"],
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const status = upstream.status;
      const msg =
        status === 429 ? "Too many requests right now — please try again in a minute."
        : status === 402 ? "The AI helper is out of credits for now."
        : "The AI helper is unavailable right now.";
      console.error("gateway error", status, await upstream.text().catch(() => ""));
      return json({ error: msg }, status);
    }

    const headers = new Headers({ ...corsHeaders, "Content-Type": "text/event-stream" });
    upstream.headers.forEach((v, k) => {
      if (k.toLowerCase().startsWith("x-lovable-aig-")) headers.set(k, v);
    });
    return new Response(upstream.body, { status: 200, headers });
  } catch (e) {
    if (req.signal.aborted) return new Response(null, { status: 499 });
    console.error(e);
    return json({ error: "Something went wrong." }, 500);
  }
});
