import { Code2, Clapperboard, Palette, Laptop, Wand2, Database } from "lucide-react";
import phoenixImage from "@/assets/phoenix.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { techSkills, creativeSkills, tools } from "@/data/portfolio";

const mono = { fontFamily: "'Space Mono', monospace" };

const services = [
  { icon: Laptop, title: "Front-End Development", text: "fast, responsive React interfaces" },
  { icon: Clapperboard, title: "Video Editing", text: "cuts, colour and motion for creators" },
  { icon: Palette, title: "Web Design", text: "clean layouts with a bit of magic" },
  { icon: Database, title: "Full-Stack Apps", text: "logins, databases and dashboards" },
];

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div>
    <div className="flex justify-between text-sm mb-1" style={mono}>
      <span>{name}</span>
      <span>{level}%</span>
    </div>
    <div className="h-3 border-2 border-foreground">
      <div className="h-full bg-foreground" style={{ width: `${level}%` }} />
    </div>
  </div>
);

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-24 border-t-2 border-foreground relative">
      <div
        ref={ref}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="text-center mb-16 relative">
          <span className="zine-label text-3xl sm:text-4xl">
            <span className="font-bold">SERVICES</span> I OFFER
          </span>
          <img src={phoenixImage} alt="Fawkes the Phoenix" loading="lazy" className="absolute -top-10 right-0 w-14 sm:w-20" />
        </div>

        <div className="grid sm:grid-cols-2 gap-10 max-w-3xl mx-auto mb-20">
          {services.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-5 items-start">
              <Icon size={52} strokeWidth={1.25} className="shrink-0" />
              <div>
                <p className="font-bold underline uppercase text-sm" style={mono}>{title}</p>
                <p className="text-sm text-muted-foreground mt-1">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card-parchment p-6 space-y-4">
            <p className="flex items-center gap-2 font-bold uppercase" style={mono}><Code2 size={18} /> Technical spells</p>
            {techSkills.map((s) => <SkillBar key={s.name} {...s} />)}
          </div>
          <div className="card-parchment p-6 space-y-4">
            <p className="flex items-center gap-2 font-bold uppercase" style={mono}><Wand2 size={18} /> Creative charms</p>
            {creativeSkills.map((s) => <SkillBar key={s.name} {...s} />)}
            <div className="pt-4">
              <p className="uppercase text-xs mb-3" style={mono}>Tools in my trunk</p>
              <div className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span key={t} className="border-2 border-foreground px-3 py-1 text-xs" style={mono}>{t}</span>
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
