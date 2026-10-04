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
    <section id="achievements" className="py-24 px-4 relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] bottom-0 -left-40" style={{ background: "hsl(var(--primary) / 0.07)" }} />
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="section-tag">Achievements ✦</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-5">
              The <span className="neon-text">Trophy Room</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-4">
              "It is our choices that show what we truly are." — and what we've built.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {achievements.map((a, i) => (
            <ScrollReveal key={a.title} delay={i * 100}>
              <div className="glass-card p-7 h-full group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-border mb-5 group-hover:border-primary/50 transition-colors" style={{ background: "hsl(var(--primary) / 0.08)" }}>
                  <a.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
