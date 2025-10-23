import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import FloatingBackground from "@/components/FloatingBackground";
import StarsCanvas from "@/components/canvas/Stars";
import { translations } from "@/translations";

const Index = () => {
  const [language, setLanguage] = useState<"en" | "es" | "fr">("en");
  const t = translations[language];

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <CustomCursor />
      <FloatingBackground />
      <StarsCanvas />
      <div className="relative z-10">
        <Navigation
          currentLang={language} 
          onLanguageChange={(lang) => setLanguage(lang as "en" | "es" | "fr")}
          translations={t.nav}
        />
        <Hero translations={t.hero} />
        <About translations={t.about} />
        <Projects translations={t.projects} />
        <Skills translations={t.skills} />
        <Experience translations={t.experience} />
        <Contact translations={t.contact} />
      </div>
    </div>
  );
};

export default Index;
