import sortingHatImage from "@/assets/sorting-hat.png";
import hermioneImage from "@/assets/hermione.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GraduationCap } from "lucide-react";

const education = [
  { degree: "B.Tech", institution: "ITM Gwalior", period: "2024 – 2028", status: "Pursuing" },
  { degree: "12th Grade", institution: "St. Paul's School, Gwalior", period: "2022 – 2023", status: "Completed" },
  { degree: "10th Grade", institution: "St. Paul's School, Gwalior", period: "2020 – 2021", status: "Completed" },
];

const highlights = [
  { label: "Projects done", value: "10+" },
  { label: "Technologies", value: "8+" },
  { label: "Years coding", value: "3+" },
];

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] top-20 -right-40" style={{ background: "hsl(var(--accent) / 0.08)" }} />
      <div
        ref={ref}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Picture block */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card aspect-square flex items-center justify-center overflow-hidden">
              <img src={hermioneImage} alt="Hermione Granger" loading="lazy" className="w-2/3 drop-shadow-[0_0_30px_hsl(var(--accent)/0.2)]" />
            </div>
            <img src={sortingHatImage} alt="Sorting Hat" loading="lazy" className="absolute -top-8 -right-4 w-20 -rotate-12 animate-float-gentle" />
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="section-tag">About me</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mt-5">
                Code, creativity <span className="neon-text">& a little magic</span>
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Prakhar Tiwari is a front-end developer and video editor studying B.Tech at ITM Gwalior,
              crafting interfaces where creativity and code meet — a little like casting a good charm.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <p className="uppercase text-sm font-semibold text-primary tracking-wider">What I do</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Front-end development, video editing, web design, UI prototyping and responsive design.
                </p>
              </div>
              <div className="glass-card p-6">
                <p className="uppercase text-sm font-semibold text-primary tracking-wider">Words I live by</p>
                <p className="text-sm text-muted-foreground mt-2 italic leading-relaxed">
                  "It is our choices that show what we truly are, far more than our abilities." — Dumbledore
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {highlights.map((h) => (
                <div key={h.label} className="glass-card p-5 text-center">
                  <div className="font-display text-3xl sm:text-4xl font-bold neon-text">{h.value}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="section-tag"><GraduationCap size={12} /> Education</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {education.map((e) => (
              <div key={e.degree} className="glass-card p-6">
                <p className="font-display font-bold text-lg uppercase">{e.degree}</p>
                <p className="text-sm text-muted-foreground mt-2">{e.institution}</p>
                <p className="text-xs text-primary mt-3 tracking-wider">{e.period} · {e.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
