import sortingHatImage from "@/assets/sorting-hat.png";
import hermioneImage from "@/assets/hermione.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const mono = { fontFamily: "'Space Mono', monospace" };

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
    <section id="about" className="py-24 border-t-2 border-foreground relative">
      <div
        ref={ref}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Picture block */}
          <div className="lg:col-span-5 relative">
            <div className="border-2 border-foreground bg-card aspect-square flex items-center justify-center">
              <img src={hermioneImage} alt="Hermione Granger" loading="lazy" className="w-2/3" />
            </div>
            <img src={sortingHatImage} alt="Sorting Hat" loading="lazy" className="absolute -top-8 -right-4 w-20 -rotate-12" />
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="zine-label -rotate-2 text-3xl sm:text-4xl">
              ABOUT <span className="font-bold">ME</span> <span className="ml-2">☺</span>
            </div>
            <p className="font-bold leading-relaxed" style={mono}>
              Prakhar Tiwari is a front-end developer and video editor studying B.Tech at ITM Gwalior,
              crafting interfaces where creativity and code meet — a little like casting a good charm.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex gap-3">
                <span className="text-4xl leading-none">✱</span>
                <div>
                  <p className="uppercase text-sm font-bold" style={mono}>What I do</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Front-end development, video editing, web design, UI prototyping and responsive design.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-4xl leading-none">✱</span>
                <div>
                  <p className="uppercase text-sm font-bold" style={mono}>Words I live by</p>
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    "It is our choices that show what we truly are, far more than our abilities." — Dumbledore
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 border-2 border-foreground">
              {highlights.map((h, i) => (
                <div key={h.label} className={`p-4 text-center ${i ? "border-l-2 border-foreground" : ""}`}>
                  <div className="text-2xl sm:text-3xl font-bold" style={mono}>{h.value}</div>
                  <div className="text-xs uppercase text-muted-foreground">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <span className="zine-label text-2xl sm:text-3xl">
              <span className="font-bold">EDUCATION</span> ⚡
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {education.map((e) => (
              <div key={e.degree} className="border-t-2 border-foreground pt-4">
                <p className="font-bold underline uppercase" style={mono}>{e.degree}</p>
                <p className="text-sm mt-2">{e.institution}</p>
                <p className="text-xs text-muted-foreground mt-1">{e.period} · {e.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
