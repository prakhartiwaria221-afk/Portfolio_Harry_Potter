import { Github, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SparkleCanvas from "./SparkleCanvas";
import goldenSnitchImage from "@/assets/golden-snitch.png";
import bookpardImage from "@/assets/bookpard-project.png";
import mindbloomImage from "@/assets/mindbloom-project.png";
import coordinetImage from "@/assets/coordinet-project.png";
import ronImage from "@/assets/ron-weasley.png";

const Projects = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  const profileUrl = "https://github.com/prakhartiwaria221-afk";
  const projects = [
    {
      title: "MindBloom",
      link: "https://github.com/prakhartiwaria221-afk/MindBloom",
      description: "AI-based adaptive learning platform with gamified learning, voice-guided systems, emotion-aware apps.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
      image: mindbloomImage,
          },
    {
      title: "CoordiNet",
      link: profileUrl,
      description: "Emergency coordination platform connecting police, hospitals, and disaster authorities with citizens.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
      image: coordinetImage,
          },
    {
      title: "BookPard",
      link: "https://github.com/prakhartiwaria221-afk/bookpard-treasure-trove",
      description: "A full-stack web application featuring authentication, book selling, admin dashboard, secure payments.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
      image: bookpardImage,
          },
    {
      title: "Library Management",
      link: "https://github.com/prakhartiwaria221-afk/Library-Management-System",
      description: "Console-based system using C++ and OOP concepts with file handling for data storage.",
      tags: ["C++", "OOP"],
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=500&fit=crop",
          },
  ];

  return (
    <section id="projects" className="py-24 sm:py-32 relative overflow-hidden">
      <SparkleCanvas count={10} color="gold" />
      <div className="absolute bottom-10 right-5 w-28 h-28 rounded-full border border-primary/15 animate-float-gentle" />

      {/* Golden Snitch */}
      <img
        src={goldenSnitchImage}
        alt=""
        loading="lazy"
        width={60}
        height={60}
        className="absolute top-16 left-[10%] w-12 sm:w-16 animate-float-gentle opacity-40"
        style={{ animationDelay: '2s' }}
      />

      {/* Ron Weasley character */}
      <img
        src={ronImage}
        alt="Ron Weasley"
        loading="lazy"
        width={512}
        height={512}
        className="absolute right-2 sm:right-6 bottom-4 sm:bottom-8 w-12 sm:w-24 opacity-50 hover:opacity-90 transition-opacity duration-300 animate-float-gentle pointer-events-none"
        style={{ animationDelay: '1.2s' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={headerRef}
          className={`flex items-start justify-between mb-14 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div>
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Courier Prime', monospace" }}>Portfolio</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
              Magical <span className="text-shimmer">Projects</span>
            </h2>
          </div>
          <div className="hidden sm:block max-w-xs text-right">
            <p className="text-sm text-muted-foreground italic" style={{ fontFamily: "'Courier Prime', monospace" }}>
              "After all this time? — Always."
            </p>
          </div>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} code on GitHub`}
              className={`group block cursor-pointer hover:-translate-y-1 relative rounded-2xl overflow-hidden card-parchment magic-border transition-all duration-700 ${
                gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>

              <div className="p-4">
                <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors" style={{ fontFamily: "'Space Mono', monospace" }}>
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3" style={{ fontFamily: "'Courier Prime', monospace" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github size={12} />
                  View Code
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className={`flex items-center gap-3 transition-all duration-1000 delay-500 ${gridVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-lg font-bold text-foreground" style={{ fontFamily: "'Space Mono', monospace" }}>RECENT WORK</span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border border-border hover:border-primary/50 hover:text-primary px-6"
            asChild
          >
            <a href="https://github.com/prakhartiwaria221-afk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              See More
              <ArrowRight size={14} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
