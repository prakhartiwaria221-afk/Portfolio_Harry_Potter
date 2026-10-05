import { useState } from "react";
import sortingHatImage from "@/assets/sorting-hat.png";

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
];

const houseData: Record<string, { color: string; motto: string; crest: string }> = {
  Gryffindor: { color: "from-red-700 to-yellow-600", motto: "Where dwell the brave at heart!", crest: "🦁" },
  Hufflepuff: { color: "from-yellow-500 to-amber-800", motto: "Those patient Hufflepuffs are true and unafraid of toil!", crest: "🦡" },
  Ravenclaw: { color: "from-blue-700 to-sky-400", motto: "Wit beyond measure is man's greatest treasure!", crest: "🦅" },
  Slytherin: { color: "from-green-700 to-emerald-400", motto: "Those cunning folk use any means to achieve their ends!", crest: "🐍" },
};

interface Props {
  onComplete: (house: string) => void;
}

const SortingQuiz = ({ onComplete }: Props) => {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 });
  const [result, setResult] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswer = (house: string, index: number) => {
    setSelectedOption(index);
    const newScores = { ...scores, [house]: scores[house] + 1 };
    setScores(newScores);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        const sorted = Object.entries(newScores).sort((a, b) => b[1] - a[1]);
        setResult(sorted[0][0]);
      }
    }, 600);
  };

  if (!started) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl">
        <div className="glow-orb w-[400px] h-[400px] top-10 left-1/4" style={{ background: "hsl(var(--primary) / 0.1)" }} />
        <div className="text-center max-w-lg px-6 animate-fade-in relative z-10">
          <img src={sortingHatImage} alt="Sorting Hat" className="w-28 h-28 mx-auto mb-6 animate-float-gentle drop-shadow-[0_0_20px_rgba(218,165,32,0.4)]" width={512} height={512} />
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold mb-4 text-foreground">
            The Sorting <span className="neon-text">Ceremony</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            "Oh you may not think I'm pretty, but don't judge on what you see…" — Let the Sorting Hat decide your house before you explore this portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setStarted(true)} className="btn-neon justify-center">
              ⚡ Begin Sorting
            </button>
            <button onClick={() => onComplete("skip")} className="btn-ghost-neon justify-center">
              Skip to Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (result) {
    const house = houseData[result];
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl">
        <div className="text-center max-w-lg px-6 animate-fade-in">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${house.color} flex items-center justify-center text-5xl shadow-lg animate-float-gentle`}>
            {house.crest}
          </div>
          <h2 className="font-display text-4xl font-extrabold mb-2 text-foreground">
            {result}!
          </h2>
          <p className="text-primary text-lg mb-4 italic">
            "{house.motto}"
          </p>
          <p className="text-muted-foreground mb-8">
            The Sorting Hat has spoken. Welcome to your house!
          </p>
          <button onClick={() => onComplete(result)} className="btn-neon">
            ⚡ Explore Portfolio
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl">
      <div className="max-w-xl w-full px-6 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <span className="text-sm text-muted-foreground">
            Question {currentQ + 1} of {questions.length}
          </span>
          <div className="flex gap-1.5">
            {questions.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all ${i <= currentQ ? 'bg-primary scale-110' : 'bg-muted'}`} />
            ))}
          </div>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-8">
          {q.question}
        </h2>

        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => selectedOption === null && handleAnswer(opt.house, i)}
              className={`w-full text-left px-6 py-4 rounded-2xl border transition-all duration-300 ${
                selectedOption === i
                  ? 'border-primary bg-primary/10 scale-[1.02]'
                  : 'glass-card hover:border-primary/50'
              }`}
            >
              <span className="text-foreground text-base">{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortingQuiz;
