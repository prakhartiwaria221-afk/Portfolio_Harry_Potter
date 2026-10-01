import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { projects } from "@/data/portfolio";

const mono = { fontFamily: "'Space Mono', monospace" };
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
    <div className="mt-24 card-parchment p-6 sm:p-10">
      <span className="zine-label -rotate-2 text-xl sm:text-2xl">
        ASK THE <span className="font-bold">SORTING HAT</span> 🎩
      </span>
      <p className="mt-6 text-sm text-muted-foreground max-w-xl">
        Tell me what you're interested in — and AI will pick the projects and skills of mine you'll like most.
      </p>
      <form onSubmit={submit} className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          maxLength={500}
          placeholder="e.g. AI apps, e-commerce, C++ ..."
          className="flex-1 bg-transparent border-2 border-foreground px-4 py-3 text-sm outline-none focus:bg-background"
          style={mono}
        />
        <button
          type="submit"
          disabled={loading || !interests.trim()}
          className="zine-label flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          style={{ background: "hsl(var(--foreground))", color: "hsl(var(--background))" }}
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          {loading ? "THINKING..." : "SORT ME"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-destructive" style={mono}>{error}</p>}

      {result && (
        <div className="mt-8 space-y-6 animate-fade-in">
          <p className="font-bold" style={mono}>"{result.summary}"</p>
          <div className="grid md:grid-cols-2 gap-6">
            {result.projects.map((r) => {
              const p = projects.find((x) => x.title === r.title);
              return (
                <a key={r.title} href={p?.link} target="_blank" rel="noopener noreferrer" className="flex gap-3 group">
                  <span className="text-3xl leading-none">✱</span>
                  <div>
                    <p className="font-bold underline uppercase text-sm group-hover:opacity-70" style={mono}>{r.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{r.reason}</p>
                  </div>
                </a>
              );
            })}
          </div>
          {result.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {result.skills.map((s) => (
                <span key={s} className="border-2 border-foreground px-3 py-1 text-xs" style={mono}>⚡ {s}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectFinder;
