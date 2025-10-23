import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import TypewriterText from "./TypewriterText";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface HeroProps {
  translations: {
    greeting: string;
    name: string;
    title: string;
    subtitle: string;
    viewProjects: string;
    downloadCV: string;
  };
}

const Hero = ({ translations }: HeroProps) => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  
  return (
    <section 
      id="home" 
      ref={heroRef as any}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/10"
    >
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5" />
      
      <div className={`container relative z-10 mx-auto px-4 py-20 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className={`flex justify-center transition-all duration-500 delay-100 ${heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="w-48 h-48 rounded-full border-4 border-primary/30 overflow-hidden bg-muted/20 backdrop-blur-sm">
              <img 
                src="logo.jpg" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold text-foreground transition-all duration-500 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="gradient-text">{translations.name}</span>
            </h1>
            <div className={`text-xl md:text-2xl text-foreground/90 font-medium min-h-[60px] flex items-center justify-center transition-all duration-500 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="mr-2">I do:</span>
              <TypewriterText 
                texts={[
                  "Web Development",
                  "Software Engineering", 
                  "AI & ML"
                ]}
                typingSpeed={90}
                deletingSpeed={50}
                pauseDuration={1500}
              />
            </div>
            <p className="text-lg md:text-xl text-secondary font-semibold animate-slide-up">
              {translations.title}
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              {translations.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base animate-slide-up">
            <a href="mailto:alvarocalleros44@gmail.com" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
              <span>alvarocalleros44@gmail.com</span>
            </a>
            <span className="text-muted-foreground">|</span>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5" />
              <span>Mazatlan, Sinaloa, Mexico</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-scale-in">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-effect transition-all"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {translations.viewProjects}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              asChild
            >
              <a href="/cv-placeholder.pdf" download>
                {translations.downloadCV}
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 animate-scale-in">
            <a 
              href="https://www.linkedin.com/in/alvaro-calleros8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-secondary transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="https://github.com/Alvaro-Calleros" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-secondary transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
