import profileImage from "@/assets/profile-prakhar.jpg";
import dumbledoreImage from "@/assets/dumbledore.png";
import goldenSnitchImage from "@/assets/golden-snitch.png";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";

interface HeroProps {
  house?: string | null;
}

const mono = { fontFamily: "'Space Mono', monospace" };

const Hero = ({ house }: HeroProps) => {
  const { currentText } = useTypingAnimation({
    words: ["Front-End Developer", "Video Editor", "Tech Creator", "Problem Solver"],
    typingSpeed: 100,
    deletingSpeed: 50,
    delayBetweenWords: 2000,
  });

  return (
    <section id="home" className="min-h-screen relative overflow-hidden pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: labels */}
          <div className="lg:col-span-6 relative order-2 lg:order-1 space-y-8">
            <p className="text-xs uppercase tracking-widest leading-tight" style={mono}>
              Freelance <span className="font-bold underline">Front-End</span><br />Developer · Hogwarts Alumni ⚡
            </p>

            <div className="relative">
              <div className="zine-label -rotate-6 text-4xl sm:text-6xl font-bold tracking-wider">
                <span className="mr-3 text-2xl align-middle">☺</span>PRAKHAR
              </div>
              {/* Squiggle arrow */}
              <svg viewBox="0 0 160 90" className="w-32 sm:w-40 ml-24 mt-2 text-foreground" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 10 C 40 80, 90 -10, 120 60" />
                <path d="M110 55 L122 62 L124 48" />
              </svg>
            </div>

            <div className="space-y-3 max-w-md">
              <p className="text-lg" style={mono}>
                &gt; {currentText}
                <span className="animate-pulse">_</span>
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                "It does not do to dwell on dreams and forget to live" — so I blend code and creativity into
                interfaces that feel a little like magic.
              </p>
              {house && house !== "skip" && (
                <p className="text-xs uppercase tracking-widest" style={mono}>
                  ✱ Sorted into <span className="font-bold underline">{house}</span>
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#projects" className="zine-label text-sm hover:-translate-y-0.5 transition-transform">MY WORK →</a>
              <a href="#contact" className="zine-label text-sm bg-foreground text-background hover:-translate-y-0.5 transition-transform">SEND AN OWL 🦉</a>
            </div>
          </div>

          {/* Right: photo */}
          <div className="lg:col-span-6 relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="border-2 border-foreground overflow-hidden aspect-[3/4]">
                <img src={profileImage} alt="Prakhar Tiwari" className="w-full h-full object-cover object-top" />
              </div>
              <div className="zine-label rotate-6 absolute -bottom-6 -left-6 sm:-left-12 text-3xl sm:text-5xl font-bold tracking-wider">
                TIWARI
              </div>
              <img
                src={dumbledoreImage}
                alt="Dumbledore"
                loading="lazy"
                className="absolute -right-4 sm:-right-14 bottom-10 w-16 sm:w-28 animate-float-gentle pointer-events-none"
              />
              <img
                src={goldenSnitchImage}
                alt="Golden Snitch"
                loading="lazy"
                className="absolute -top-6 -left-6 w-12 sm:w-16 animate-float-gentle pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
