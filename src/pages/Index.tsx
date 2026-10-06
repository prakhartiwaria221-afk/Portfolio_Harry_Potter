import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import CommandPalette from "@/components/CommandPalette";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MagicalParticles from "@/components/MagicalParticles";
import CustomCursor from "@/components/CustomCursor";
import SortingQuiz from "@/components/SortingQuiz";
import SectionDots from "@/components/SectionDots";
import { ScrollProgress } from "@/components/ScrollAnimations";
import hogwartsBg from "@/assets/hogwarts-bg.jpg";
import hogwartsDayBg from "@/assets/hogwarts-day-bg.jpg";

const Index = () => {
  const [sorted, setSorted] = useState(false);
  const [house, setHouse] = useState<string | null>(null);

  const handleSorted = (h: string) => {
    setHouse(h);
    setSorted(true);
  };

  if (!sorted) {
    return <SortingQuiz onComplete={handleSorted} />;
  }

  return (
    <div className="min-h-screen relative">
      {/* Hogwarts castle backdrop — day/night themed, fixed, dimmed, behind everything */}
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <img
          src={hogwartsBg}
          alt=""
          width={1920}
          height={1088}
          className="bg-night-img w-full h-full object-cover opacity-25"
        />
        <img
          src={hogwartsDayBg}
          alt=""
          width={1920}
          height={1088}
          loading="lazy"
          className="bg-day-img w-full h-full object-cover opacity-30"
        />
        <div className="bg-overlay-night absolute inset-0" />
        <div className="bg-overlay-day absolute inset-0" />
      </div>
      <CustomCursor />
      <MagicalParticles />
      <ScrollProgress />
      <SectionDots />
      <CommandPalette />
      <Navigation />
      <Hero house={house} />
      <About />
      <Skills />
      <Achievements />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
