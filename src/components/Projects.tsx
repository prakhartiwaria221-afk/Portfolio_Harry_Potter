import { Github, ArrowUpRight } from "lucide-react";
import goldenSnitchImage from "@/assets/golden-snitch.png";
import ronImage from "@/assets/ron-weasley.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { projects } from "@/data/portfolio";
import ProjectFinder from "./ProjectFinder";

const mono = { fontFamily: "'Space Mono', monospace" };

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-24 border-t-2 border-foreground relative">
      <div
        ref={ref}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="flex items-center gap-4 mb-14 relative">
          <span className="zine-label rotate-2 text-3xl sm:text-4xl">
            MY <span className="font-bold">WORK</span> ☺
          </span>
          <img src={goldenSnitchImage} alt="Golden Snitch" loading="lazy" className="w-12 animate-float-gentle" />
          <img src={ronImage} alt="Ron Weasley" loading="lazy" className="hidden sm:block absolute right-0 -top-6 w-20" />
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((p, i) => (
            <a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${p.title} code on GitHub`}
              className="group block"
            >
              <div className="border-2 border-foreground overflow-hidden aspect-video">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <span className="text-3xl leading-none">✱</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold uppercase underline" style={mono}>
                      {String(i + 1).padStart(2, "0")} · {p.title}
                    </h3>
                    <span className="flex items-center gap-1 text-xs" style={mono}>
                      <Github size={14} /> CODE <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{p.description}</p>
                  <p className="text-xs mt-2" style={mono}>{p.tags.join(" / ")}</p>
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
