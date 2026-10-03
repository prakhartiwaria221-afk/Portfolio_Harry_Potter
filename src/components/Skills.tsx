import { Code2, Clapperboard, Palette, Laptop, Wand2, Database } from "lucide-react";
import phoenixImage from "@/assets/phoenix.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { techSkills, creativeSkills, tools } from "@/data/portfolio";

const services = [
  { icon: Laptop, title: "Front-End Development", text: "fast, responsive React interfaces" },
  { icon: Clapperboard, title: "Video Editing", text: "cuts, colour and motion for creators" },
  { icon: Palette, title: "Web Design", text: "clean layouts with a bit of magic" },
  { icon: Database, title: "Full-Stack Apps", text: "logins, databases and dashboards" },
];

const SkillBar = ({ name, level, animate }: { name: string; level: number; animate: boolean }) => (
  <div>
    <div className="flex justify-between text-sm mb-2">
      <span className="font-medium">{name}</span>
      <span className="text-primary">{level}%</span>
    </div>
    <div className="skill-track">
      <div className="skill-fill" style={{ width: animate ? `${level}%` : "0%" }} />
    </div>
  </div>
);

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="glow-orb w-[450px] h-[450px] top-40 -left-48" style={{ background: "hsl(var(--primary) / 0.07)" }} />
      <div
        ref={ref}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="text-center mb-16 relative">
          <span className="section-tag">Services I offer</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-5">
            Spells <span className="neon-text">& services</span>
          </h2>
          <img src={phoenixImage} alt="Fawkes the Phoenix" loading="lazy" className="absolute -top-10 right-0 w-14 sm:w-20 animate-float-gentle" />
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {services.map(({ icon: Icon, title, text }) => (
            <div key={title} className="glass-card p-6 flex gap-5 items-start group">
              <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors" style={{ background: "hsl(var(--primary) / 0.08)" }}>
                <Icon size={22} className="text-primary" />
              </div>
              <div>
                <p className="font-display font-bold">{title}</p>
                <p className="text-sm text-muted-foreground mt-1">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card p-8 space-y-5">
            <p className="flex items-center gap-2 font-display font-bold text-lg"><Code2 size={20} className="text-primary" /> Technical spells</p>
            {techSkills.map((s) => <SkillBar key={s.name} {...s} animate={isVisible} />)}
          </div>
          <div className="glass-card p-8 space-y-5">
            <p className="flex items-center gap-2 font-display font-bold text-lg"><Wand2 size={20} className="text-accent" /> Creative charms</p>
            {creativeSkills.map((s) => <SkillBar key={s.name} {...s} animate={isVisible} />)}
            <div className="pt-4">
              <p className="uppercase text-xs tracking-[0.25em] text-muted-foreground mb-4">Tools in my trunk</p>
              <div className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span key={t} className="tool-chip">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
