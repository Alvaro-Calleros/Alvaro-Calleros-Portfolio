import { ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ProjectsProps {
  translations: {
    title: string;
    projects: {
      flowinsights: {
        title: string;
        description: string;
        role: string;
      };
      blitzscan: {
        title: string;
        description: string;
        role: string;
      };
      mercart: {
        title: string;
        description: string;
        role: string;
      };
      chess: {
        title: string;
        description: string;
        role: string;
      };
    };
    viewLive: string;
    viewCode: string;
  };
}

const Projects = ({ translations }: ProjectsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  
  const projects = [
    {
      name: translations.projects.flowinsights.title,
      description: translations.projects.flowinsights.description,
      role: translations.projects.flowinsights.role,
      tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind", "Prisma", "OpenAI", "Stripe"],
      live: "https://flow-insights.vercel.app",
      github: "#",
      featured: true,
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80"
    },
    {
      name: translations.projects.blitzscan.title,
      description: translations.projects.blitzscan.description,
      role: translations.projects.blitzscan.role,
      tech: ["React", "TypeScript", "Python", "Flask", "Supabase", "OpenAI"],
      live: "#",
      github: "#",
      featured: true,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80"
    },
    {
      name: translations.projects.mercart.title,
      description: translations.projects.mercart.description,
      role: translations.projects.mercart.role,
      tech: ["Node.js", "MongoDB", "React", "Express"],
      live: "#",
      github: "#",
      featured: false,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    },
    {
      name: translations.projects.chess.title,
      description: translations.projects.chess.description,
      role: translations.projects.chess.role,
      tech: ["React", "Vite", "Node.js", "Express", "Stockfish", "TypeScript"],
      live: "#",
      github: "https://github.com/your-username/chess-review-api",
      featured: false,
      image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80"
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef as any}
          className={`text-4xl md:text-5xl font-bold text-center mb-16 gradient-text scroll-reveal ${titleVisible ? 'is-visible' : ''}`}
        >
          {translations.title}
        </h2>

        <div className="grid gap-8">
          {projects.map((project, index) => {
            const { ref: cardRef, isVisible: cardVisible } = useScrollReveal({ delay: index * 120 });
            
            return (
              <Card 
                key={index}
                ref={cardRef as any}
                className={`overflow-hidden bg-gradient-to-br from-card to-muted/20 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-card scroll-reveal ${
                  cardVisible ? 'is-visible' : ''
                } ${project.featured ? 'md:col-span-2 glow-effect' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
              <div className="relative h-64 overflow-hidden bg-muted">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-95' : 'opacity-80'}`} />
                {project.featured && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground shadow-glow z-10">
                    Featured
                  </Badge>
                )}
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2 hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-secondary italic text-sm">{project.role}</p>
                    </div>
                    <div className="flex gap-2">
                      {project.live !== "#" && (
                        <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                          <a href={project.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {translations.viewLive}
                          </a>
                        </Button>
                      )}
                      {project.github !== "#" && (
                        <Button size="sm" variant="outline" className="hover:bg-muted" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            {translations.viewCode}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  <p className="text-foreground/90 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="bg-secondary/20 text-secondary hover:bg-secondary/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
