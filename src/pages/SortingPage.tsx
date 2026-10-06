import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react";
import sortingHatImage from "@/assets/sorting-hat.png";
import hogwartsBg from "@/assets/hogwarts-bg.jpg";
import ThemeToggle from "@/components/ThemeToggle";

interface Question {
  question: string;
  options: { text: string; house: string }[];
}

const questions: Question[] = [
  {
    question: "Which quality do you value the most?",
    options: [
      { text: "Courage & bravery", house: "Gryffindor" },
      { text: "Loyalty & patience", house: "Hufflepuff" },
      { text: "Wisdom & creativity", house: "Ravenclaw" },
      { text: "Ambition & cunning", house: "Slytherin" },
    ],
  },
  {
    question: "What would you do with a powerful spell?",
    options: [
      { text: "Protect the innocent", house: "Gryffindor" },
      { text: "Help those in need", house: "Hufflepuff" },
      { text: "Study its origins", house: "Ravenclaw" },
      { text: "Use it to achieve greatness", house: "Slytherin" },
    ],
  },
  {
    question: "Pick a magical creature companion:",
    options: [
      { text: "Phoenix", house: "Gryffindor" },
      { text: "Niffler", house: "Hufflepuff" },
      { text: "Owl", house: "Ravenclaw" },
      { text: "Serpent", house: "Slytherin" },
    ],
  },
  {
    question: "Which subject excites you the most?",
    options: [
      { text: "Defense Against the Dark Arts", house: "Gryffindor" },
      { text: "Herbology", house: "Hufflepuff" },
      { text: "Charms & Transfiguration", house: "Ravenclaw" },
      { text: "Potions", house: "Slytherin" },
    ],
  },
  {
    question: "What drives you in your career?",
    options: [
      { text: "Making a bold impact", house: "Gryffindor" },
      { text: "Working with a great team", house: "Hufflepuff" },
      { text: "Solving complex problems", house: "Ravenclaw" },
      { text: "Leading and innovating", house: "Slytherin" },
    ],
  },
  {
    question: "A friend is in trouble. You…",
    options: [
      { text: "Charge in headfirst", house: "Gryffindor" },
      { text: "Stand by them no matter what", house: "Hufflepuff" },
      { text: "Devise the cleverest rescue plan", house: "Ravenclaw" },
      { text: "Find the advantage in the chaos", house: "Slytherin" },
    ],
  },
  {
    question: "Choose a place in the castle:",
    options: [
      { text: "The Gryffindor common room fire", house: "Gryffindor" },
      { text: "The sunny Hufflepuff basement", house: "Hufflepuff" },
      { text: "The Ravenclaw tower library", house: "Ravenclaw" },
      { text: "The dungeons beneath the lake", house: "Slytherin" },
    ],
  },
];

const houseData: Record<
  string,
  { gradient: string; glow: string; motto: string; crest: string; traits: string[]; founder: string; element: string }
> = {
  Gryffindor: {
    gradient: "from-red-700 via-red-600 to-yellow-600",
    glow: "rgba(220, 38, 38, 0.45)",
    motto: "Where dwell the brave at heart!",
    crest: "🦁",
    traits: ["Bravery", "Nerve", "Chivalry", "Daring"],
    founder: "Godric Gryffindor",
    element: "Fire 🔥",
  },
  Hufflepuff: {
    gradient: "from-yellow-500 via-amber-500 to-amber-800",
    glow: "rgba(245, 158, 11, 0.45)",
    motto: "Those patient Hufflepuffs are true and unafraid of toil!",
    crest: "🦡",
    traits: ["Loyalty", "Patience", "Fairness", "Hard work"],
    founder: "Helga Hufflepuff",
    element: "Earth 🌿",
  },
  Ravenclaw: {
    gradient: "from-blue-700 via-blue-600 to-sky-400",
    glow: "rgba(37, 99, 235, 0.45)",
    motto: "Wit beyond measure is man's greatest treasure!",
    crest: "🦅",
    traits: ["Wisdom", "Creativity", "Learning", "Wit"],
    founder: "Rowena Ravenclaw",
    element: "Air 🌬️",
  },
  Slytherin: {
    gradient: "from-green-700 via-emerald-600 to-emerald-400",
    glow: "rgba(16, 185, 129, 0.45)",
    motto: "Those cunning folk use any means to achieve their ends!",
    crest: "🐍",
    traits: ["Ambition", "Cunning", "Leadership", "Resourcefulness"],
    founder: "Salazar Slytherin",
    element: "Water 🌊",
  },
};

const ResultSparkles = ({ color }: { color: string }) => {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        size: 3 + Math.random() * 5,
        duration: 2 + Math.random() * 3,
      })),
    []
  );
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full animate-float-particle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: color,
            boxShadow: `0 0 ${s.size * 2}px ${color}`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

const SortingPage = () => {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    Gryffindor: 0,
    Hufflepuff: 0,
    Ravenclaw: 0,
    Slytherin: 0,
  });
  const [result, setResult] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    document.title = "The Sorting Ceremony | Prakhar Tiwari";
  }, []);

  const handleAnswer = (house: string, index: number) => {
    setSelectedOption(index);
    const newScores = { ...scores, [house]: scores[house] + 1 };
    setScores(newScores);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        // The hat "thinks" before revealing
        setThinking(true);
        setTimeout(() => {
          const sorted = Object.entries(newScores).sort((a, b) => b[1] - a[1]);
          setResult(sorted[0][0]);
          setThinking(false);
        }, 2200);
      }
    }, 600);
  };

  const restart = () => {
    setStarted(false);
    setCurrentQ(0);
    setScores({ Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 });
    setResult(null);
    setSelectedOption(null);
    setThinking(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Castle backdrop */}
      <div className="fixed inset-0 -z-10">
        <img src={hogwartsBg} alt="" className="w-full h-full object-cover opacity-30 dark:opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Top bar */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-5">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
        <ThemeToggle />
      </header>

      {/* Intro */}
      {!started && !result && !thinking && (
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-10 sm:pt-16 pb-20 animate-fade-in">
          <div className="glow-orb w-[420px] h-[420px] top-0 left-1/2 -translate-x-1/2" style={{ background: "hsl(var(--primary) / 0.12)" }} />
          <img
            src={sortingHatImage}
            alt="The Sorting Hat"
            className="w-32 h-32 sm:w-40 sm:h-40 mb-8 animate-float-gentle drop-shadow-[0_0_30px_rgba(218,165,32,0.5)]"
          />
          <span className="section-tag mb-6">
            <Sparkles size={12} /> Hogwarts School of Witchcraft & Wizardry
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-extrabold mb-6 leading-[0.95]">
            The Sorting
            <span className="block neon-text">Ceremony</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed mb-4 italic">
            "Oh you may not think I'm pretty, but don't judge on what you see…
            There's nothing hidden in your head the Sorting Hat can't see."
          </p>
          <p className="text-muted-foreground max-w-md mb-10">
            Answer {questions.length} questions honestly, and the Hat will reveal which house you truly belong to.
          </p>
          <button onClick={() => setStarted(true)} className="btn-neon">
            ⚡ Put on the Sorting Hat
          </button>

          {/* House preview chips */}
          <div className="flex flex-wrap justify-center gap-3 mt-14">
            {Object.entries(houseData).map(([name, h]) => (
              <div
                key={name}
                className={`px-4 py-2 rounded-full bg-gradient-to-r ${h.gradient} text-white text-sm font-semibold flex items-center gap-2 opacity-80`}
              >
                <span>{h.crest}</span> {name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Questions */}
      {started && !result && !thinking && (
        <div className="relative z-10 max-w-2xl mx-auto px-6 pt-8 sm:pt-14 pb-20 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Question {currentQ + 1} of {questions.length}
            </span>
            <div className="flex gap-1.5">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${i <= currentQ ? "bg-primary scale-110" : "bg-muted"}`}
                />
              ))}
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-muted mb-10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            />
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-bold text-foreground mb-8">{questions[currentQ].question}</h2>

          <div className="space-y-3">
            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => selectedOption === null && handleAnswer(opt.house, i)}
                className={`w-full text-left px-6 py-4 rounded-2xl border transition-all duration-300 ${
                  selectedOption === i ? "border-primary bg-primary/10 scale-[1.02]" : "glass-card hover:border-primary/50"
                }`}
              >
                <span className="text-foreground text-base">{opt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hat thinking */}
      {thinking && (
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-20 animate-fade-in">
          <img
            src={sortingHatImage}
            alt="The Sorting Hat is thinking"
            className="w-32 h-32 mb-8 animate-pulse drop-shadow-[0_0_40px_rgba(218,165,32,0.6)]"
          />
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Hmm… difficult. Very difficult…</h2>
          <p className="text-muted-foreground text-lg italic">The Hat is peering into your mind…</p>
        </div>
      )}

      {/* Magical result */}
      {result && (
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-8 sm:pt-12 pb-20 animate-fade-in">
          <ResultSparkles color={houseData[result].glow} />
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${houseData[result].glow}, transparent 70%)`, filter: "blur(40px)" }}
          />
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6 relative z-10">
            The Sorting Hat has spoken
          </p>
          <div
            className={`relative z-10 w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8 rounded-full bg-gradient-to-br ${houseData[result].gradient} flex items-center justify-center text-7xl sm:text-8xl shadow-2xl animate-float-gentle`}
            style={{ boxShadow: `0 0 60px ${houseData[result].glow}` }}
          >
            {houseData[result].crest}
          </div>
          <h2
            className={`relative z-10 font-display text-6xl sm:text-8xl font-extrabold mb-4 bg-gradient-to-r ${houseData[result].gradient} bg-clip-text text-transparent`}
          >
            {result}!
          </h2>
          <p className="relative z-10 text-primary text-xl mb-8 italic">"{houseData[result].motto}"</p>

          <div className="relative z-10 glass-card rounded-2xl p-6 sm:p-8 max-w-md w-full mb-10 text-left space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Founder</span>
              <span className="text-foreground font-medium">{houseData[result].founder}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Element</span>
              <span className="text-foreground font-medium">{houseData[result].element}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground block mb-2">Your traits</span>
              <div className="flex flex-wrap gap-2">
                {houseData[result].traits.map((t) => (
                  <span key={t} className={`px-3 py-1 rounded-full bg-gradient-to-r ${houseData[result].gradient} text-white text-xs font-semibold`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3">
            <Link to="/" className="btn-neon justify-center">
              ⚡ Explore the Portfolio
            </Link>
            <button onClick={restart} className="btn-ghost-neon justify-center">
              <RotateCcw size={16} /> Sort Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortingPage;
