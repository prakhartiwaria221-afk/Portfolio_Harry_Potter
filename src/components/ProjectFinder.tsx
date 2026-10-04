import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { projects } from "@/data/portfolio";

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/recommend-projects`;

type Result = { summary: string; projects: { title: string; reason: string }[]; skills: string[] };

const ProjectFinder = () => {
  const [interests, setInterests] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interests.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(FN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ interests: interests.slice(0, 500) }),
      });
      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "The Sorting Hat couldn't decide right now. Please try again later.");
      }
      // Read the streamed answer
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let text = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const evt = JSON.parse(data);
            if (evt.type === "response.output_text.delta") text += evt.delta;
            if (evt.type === "error" || evt.type === "response.failed")
              throw new Error(evt.error?.message || evt.response?.error?.message || "Something went wrong.");
          } catch (err) {
            if (err instanceof Error && !(err instanceof SyntaxError)) throw err;
          }
        }
      }
      const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
      setResult(JSON.parse(json));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-24 glass-card p-6 sm:p-10 relative overflow-hidden">
      <div className="glow-orb w-[300px] h-[300px] -top-32 -right-24" style={{ background: "hsl(var(--accent) / 0.1)" }} />
      <span className="section-tag">Ask the Sorting Hat 🎩</span>
      <h3 className="font-display text-2xl sm:text-3xl font-bold mt-4">
        Not sure where to start? <span className="neon-text">Let AI sort you.</span>
      </h3>
      <p className="mt-4 text-sm text-muted-foreground max-w-xl leading-relaxed">
        Tell me what you're interested in — and AI will pick the projects and skills of mine you'll like most.
      </p>
      <form onSubmit={submit} className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          maxLength={500}
          placeholder="e.g. AI apps, e-commerce, C++ ..."
          className="flex-1 bg-secondary/40 border border-border rounded-full px-5 py-3 text-sm outline-none focus:border-primary/60 focus:shadow-[0_0_20px_hsl(var(--primary)/0.1)] transition-all placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={loading || !interests.trim()}
          className="btn-neon justify-center disabled:opacity-50"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          {loading ? "Thinking..." : "Sort me"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      {result && (
        <div className="mt-8 space-y-6 animate-fade-in">
          <p className="font-medium text-lg">"{result.summary}"</p>
          <div className="grid md:grid-cols-2 gap-4">
            {result.projects.map((r) => {
              const p = projects.find((x) => x.title === r.title);
              return (
                <a key={r.title} href={p?.link} target="_blank" rel="noopener noreferrer" className="glass-card p-5 group block">
                  <p className="font-display font-bold group-hover:text-primary transition-colors">{r.title}</p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{r.reason}</p>
                </a>
              );
            })}
          </div>
          {result.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {result.skills.map((s) => (
                <span key={s} className="tool-chip">⚡ {s}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectFinder;
