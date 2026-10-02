import { useEffect, useState, useCallback } from "react";
import { Search, Home, User, Wand2, FolderGit2, Trophy, Mail, Github, Printer } from "lucide-react";

const commands = [
  { icon: Home, label: "Go to Top", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  { icon: User, label: "About Me", action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
  { icon: Wand2, label: "Skills & Spells", action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }) },
  { icon: Trophy, label: "Achievements", action: () => document.getElementById("achievements")?.scrollIntoView({ behavior: "smooth" }) },
  { icon: FolderGit2, label: "My Work", action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
  { icon: Mail, label: "Send an Owl (Contact)", action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
  { icon: Github, label: "Open GitHub Profile", action: () => window.open("https://github.com/prakhartiwaria221-afk", "_blank") },
  { icon: Printer, label: "Print / Save Résumé", action: () => window.print() },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const toggle = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      setOpen((o) => !o);
      setQuery("");
    }
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", toggle);
    return () => window.removeEventListener("keydown", toggle);
  }, [toggle]);

  if (!open) return null;

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-[100] bg-background/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-md border-2 border-foreground bg-card shadow-[6px_6px_0_hsl(var(--foreground))]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b-2 border-foreground px-4 py-3">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command... (Esc to close)"
            className="flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="max-h-64 overflow-y-auto">
          {filtered.length === 0 && (
            <p className="font-mono text-sm text-muted-foreground px-4 py-6 text-center">
              No spells found 🪄
            </p>
          )}
          {filtered.map((c) => (
            <button
              key={c.label}
              onClick={() => {
                c.action();
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 font-mono text-sm hover:bg-accent/10 text-left transition-colors"
            >
              <c.icon className="w-4 h-4 text-primary" />
              {c.label}
            </button>
          ))}
        </div>
        <div className="border-t-2 border-foreground px-4 py-2 font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
          Ctrl + K to toggle ⚡
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
