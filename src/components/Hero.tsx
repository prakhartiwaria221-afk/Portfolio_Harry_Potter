import profileImage from "@/assets/profile-prakhar.jpg";
import dumbledoreImage from "@/assets/dumbledore.png";
import goldenSnitchImage from "@/assets/golden-snitch.png";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  house?: string | null;
}

const Hero = ({ house }: HeroProps) => {
  const { currentText } = useTypingAnimation({
    words: ["Front-End Developer", "Video Editor", "Tech Creator", "Problem Solver"],
    typingSpeed: 100,
    deletingSpeed: 50,
    delayBetweenWords: 2000,
  });

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center pt-28 pb-16">
      {/* Ambient glow orbs */}
      <div className="glow-orb w-[500px] h-[500px] -top-40 -left-40" style={{ background: "hsl(var(--primary) / 0.12)" }} />
      <div className="glow-orb w-[450px] h-[450px] bottom-0 -right-32" style={{ background: "hsl(var(--accent) / 0.12)" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: text */}
          <div className="lg:col-span-7 space-y-8">
            <span className="section-tag">
              <Sparkles size={12} /> Available for work · Hogwarts Alumni ⚡
            </span>

            <h1 className="font-display font-extrabold leading-[0.95] tracking-tight text-6xl sm:text-7xl lg:text-8xl">
              PRAKHAR
              <span className="block neon-text">TIWARI</span>
            </h1>

            <div className="space-y-4 max-w-lg">
              <p className="text-xl sm:text-2xl font-medium text-foreground">
                <span className="text-primary">&gt;</span> {currentText}
                <span className="animate-pulse text-primary">_</span>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                "It does not do to dwell on dreams and forget to live" — so I blend code and
                creativity into interfaces that feel a little like magic.
              </p>
              {house && house !== "skip" && (
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  ✱ Sorted into <span className="text-primary font-semibold">{house}</span>
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="btn-neon">
                View my work <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn-ghost-neon">
                Send an Owl 🦉
              </a>
              <Link to="/sorting" className="btn-ghost-neon">
                🎩 Take the Sorting Quiz
              </Link>
            </div>
          </div>

          {/* Right: photo */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm">
              {/* Glow ring */}
              <div
                className="absolute -inset-3 rounded-[2rem] opacity-60 animate-glow-pulse"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--accent) / 0.4))", filter: "blur(24px)" }}
              />
              <div className="relative rounded-[2rem] overflow-hidden border border-border aspect-[3/4]">
                <img src={profileImage} alt="Prakhar Tiwari" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
              <img
                src={dumbledoreImage}
                alt="Dumbledore"
                loading="lazy"
                className="absolute -right-3 sm:-right-10 bottom-8 w-14 sm:w-24 animate-float-gentle pointer-events-none drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              />
              <img
                src={goldenSnitchImage}
                alt="Golden Snitch"
                loading="lazy"
                className="absolute -top-6 -left-4 w-12 sm:w-16 animate-float-gentle pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
