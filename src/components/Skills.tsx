import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Code2, Server, Database, TestTube, Wrench, Brain } from "lucide-react";
import { SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiNodedotjs, SiPython, SiPostgresql, SiMongodb, SiGit } from "react-icons/si";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SkillsProps {
  translations: {
    title: string;
    categories: {
      frontend: string;
      backend: string;
      databases: string;
      testing: string;
      devtools: string;
      other: string;
    };
  };
}

const Skills = ({ translations }: SkillsProps) => {
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null);
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { ref: logosRef, isVisible: logosVisible } = useScrollReveal({ delay: 80 });

  const techLogos = [
    { Icon: SiReact, name: "React", color: "#61DAFB" },
    { Icon: SiNextdotjs, name: "Next.js", color: "#FFFFFF" },
    { Icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { Icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
    { Icon: SiHtml5, name: "HTML5", color: "#E34F26" },
    { Icon: SiCss3, name: "CSS3", color: "#1572B6" },
    { Icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
    { Icon: SiNodedotjs, name: "Node.js", color: "#339933" },
    { Icon: SiPython, name: "Python", color: "#3776AB" },
    { Icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
    { Icon: SiMongodb, name: "MongoDB", color: "#47A248" },
    { Icon: SiGit, name: "Git", color: "#F05032" },
  ];

  const skillCategories = [
    {
      icon: Code2,
      title: translations.categories.frontend,
      skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind", "Vite"],
    },
    {
      icon: Server,
      title: translations.categories.backend,
      skills: ["Node.js", "Express", "Python (Flask)", "PHP", "C#", "Java", "C++", "C"],
    },
    {
      icon: Database,
      title: translations.categories.databases,
      skills: ["PostgreSQL", "Prisma", "MySQL", "MongoDB", "Supabase", "SAP HANA"],
    },
    {
      icon: TestTube,
      title: translations.categories.testing,
      skills: ["Playwright (TS/Python/C#)", "Postman", "Manual Testing", "API Testing (Java)"],
    },
    {
      icon: Wrench,
      title: translations.categories.devtools,
      skills: ["Git/GitHub/GitLab", "Vercel", "Stripe", "Clerk Auth", "Figma"],
    },
    {
      icon: Brain,
      title: translations.categories.other,
      skills: ["OpenAI SDK", "Prompt Engineering", "PyTorch", "NumPy", "Scrum Leadership"],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef as any}
          className={`text-4xl md:text-5xl font-bold text-center mb-8 gradient-text scroll-reveal ${titleVisible ? 'is-visible' : ''}`}
        >
          {translations.title}
        </h2>

        {/* Technology Logos */}
        <div 
          ref={logosRef as any}
          className={`flex flex-wrap justify-center gap-8 mb-16 p-8 scroll-reveal ${logosVisible ? 'is-visible' : ''}`}
        >
          {techLogos.map((tech, index) => (
            <div 
              key={index}
              onMouseEnter={() => setHoveredLogo(index)}
              onMouseLeave={() => setHoveredLogo(null)}
              className="group relative flex flex-col items-center gap-2"
            >
              <div className="w-16 h-16 rounded-full bg-card border border-primary/20 flex items-center justify-center transition-all group-hover:border-primary group-hover:scale-110 group-hover:shadow-glow">
                <tech.Icon 
                  className={`w-8 h-8 transition-all duration-300 ${
                    hoveredLogo === index 
                      ? 'scale-110 rotate-6' 
                      : hoveredLogo === null 
                      ? '' 
                      : 'grayscale opacity-50'
                  }`} 
                  style={{ color: tech.color }} 
                />
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const { ref: categoryRef, isVisible: categoryVisible } = useScrollReveal({ delay: 160 + index * 80 });
            
            return (
              <Card 
                key={index}
                ref={categoryRef as any}
                className={`p-6 bg-gradient-to-br from-card to-muted/20 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-card group scroll-reveal ${categoryVisible ? 'is-visible' : ''}`}
              >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-muted/40 text-foreground/90 rounded-full text-sm hover:bg-primary/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
