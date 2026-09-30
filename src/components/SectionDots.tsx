import { useEffect, useState } from "react";

const sections = ["home", "about", "skills", "projects", "contact"];

const SectionDots = () => {
  const [active, setActive] = useState("home");
  const [seen, setSeen] = useState<Set<string>>(new Set(["home"]));

  useEffect(() => {
    const onScroll = () => {
      for (const id of sections) {
        const r = document.getElementById(id)?.getBoundingClientRect();
        if (r && r.top <= window.innerHeight / 2 && r.bottom >= window.innerHeight / 2) {
          setActive(id);
          setSeen((s) => new Set(s).add(id));
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const left = sections.length - seen.size;

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={`Go to ${id}`}
          className={`rounded-full transition-all duration-300 border border-primary ${
            active === id ? "w-3 h-3 bg-primary" : seen.has(id) ? "w-2 h-2 bg-primary/50" : "w-2 h-2 bg-transparent"
          }`}
        />
      ))}
      {left > 0 && (
        <span className="mt-2 text-[10px] text-primary [writing-mode:vertical-rl]" style={{ fontFamily: "'Courier Prime', monospace" }}>
          {left} secret{left > 1 ? "s" : ""} left ⚡
        </span>
      )}
    </div>
  );
};

export default SectionDots;
