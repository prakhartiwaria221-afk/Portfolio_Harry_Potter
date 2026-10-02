import { ScrollReveal } from "@/components/ScrollAnimations";
import { Trophy, Code2, GraduationCap, Sparkles } from "lucide-react";

const achievements = [
  {
    icon: Code2,
    title: "4+ Projects Shipped",
    text: "Full-stack apps built and deployed — from AI learning platforms to emergency coordination systems.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learner",
    text: "Always leveling up — React, TypeScript, SQL, C++, Java and design tools in the trunk.",
  },
  {
    icon: Trophy,
    title: "Problem Solver",
    text: "Loves turning real-world problems into working software, one commit at a time.",
  },
  {
    icon: Sparkles,
    title: "Creative Edge",
    text: "Video editing and graphic design skills that make every project look as good as it works.",
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="zine-label inline-block border-2 border-foreground px-4 py-1 font-mono text-sm tracking-widest uppercase -rotate-2 bg-card">
              Achievements ✦
            </span>
            <h2 className="font-mono text-3xl md:text-4xl font-bold mt-6 uppercase tracking-tight">
              The Trophy Room
            </h2>
            <p className="font-mono text-sm text-muted-foreground mt-3">
              "It is our choices that show what we truly are." — and what we've built.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {achievements.map((a, i) => (
            <ScrollReveal key={a.title} delay={i * 100}>
              <div className="border-2 border-foreground bg-card p-6 h-full hover:-translate-y-1 transition-transform duration-300 shadow-[4px_4px_0_hsl(var(--foreground))]">
                <a.icon className="w-8 h-8 mb-4 text-primary" />
                <h3 className="font-mono font-bold text-lg uppercase tracking-wide mb-2">
                  {a.title}
                </h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  {a.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
