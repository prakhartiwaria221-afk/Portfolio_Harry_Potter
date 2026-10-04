import { Github, ArrowUpRight } from "lucide-react";
import goldenSnitchImage from "@/assets/golden-snitch.png";
import ronImage from "@/assets/ron-weasley.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { projects } from "@/data/portfolio";
import ProjectFinder from "./ProjectFinder";

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] top-1/3 -right-52" style={{ background: "hsl(var(--accent) / 0.08)" }} />
      <div
        ref={ref}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="flex items-center gap-4 mb-14 relative">
          <div>
            <span className="section-tag">My work</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-5">
              Things I've <span className="neon-text">built</span>
            </h2>
          </div>
          <img src={goldenSnitchImage} alt="Golden Snitch" loading="lazy" className="w-12 animate-float-gentle" />
          <img src={ronImage} alt="Ron Weasley" loading="lazy" className="hidden sm:block absolute right-0 -top-6 w-20 animate-float-gentle" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${p.title} code on GitHub`}
              className="group block glass-card overflow-hidden"
            >
              <div className="overflow-hidden aspect-video">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg">
                    <span className="text-primary mr-2">{String(i + 1).padStart(2, "0")}</span>
                    {p.title}
                  </h3>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    <Github size={14} /> CODE <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tags.map((t) => (
                    <span key={t} className="tool-chip">{t}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <ProjectFinder />
      </div>
    </section>
  );
};

export default Projects;
