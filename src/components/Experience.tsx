import { Card } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ExperienceProps {
  translations: {
    title: string;
    experiences: {
      qa: {
        title: string;
        company: string;
        period: string;
        description: string[];
      };
      sales: {
        title: string;
        company: string;
        period: string;
        description: string[];
      };
      sap: {
        title: string;
        company: string;
        period: string;
        description: string[];
      };
    };
  };
}

const Experience = ({ translations }: ExperienceProps) => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  
  const experiences = [
    {
      title: translations.experiences.qa.title,
      company: translations.experiences.qa.company,
      period: translations.experiences.qa.period,
      description: translations.experiences.qa.description,
      color: "primary",
    },
    {
      title: translations.experiences.sales.title,
      company: translations.experiences.sales.company,
      period: translations.experiences.sales.period,
      description: translations.experiences.sales.description,
      color: "secondary",
    },
    {
      title: translations.experiences.sap.title,
      company: translations.experiences.sap.company,
      period: translations.experiences.sap.period,
      description: translations.experiences.sap.description,
      color: "accent",
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-4xl">
        <h2 
          ref={titleRef as any}
          className={`text-4xl md:text-5xl font-bold text-center mb-16 gradient-text scroll-reveal ${titleVisible ? 'is-visible' : ''}`}
        >
          {translations.title}
        </h2>

        <div className="relative space-y-8">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/30 hidden md:block" />

          {experiences.map((exp, index) => {
            const { ref: expRef, isVisible: expVisible } = useScrollReveal({ delay: index * 120 });
            
            return (
              <Card 
                key={index}
                ref={expRef as any}
                className={`p-6 md:pl-20 bg-gradient-to-br from-card to-muted/20 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-card hover:-translate-y-1 relative scroll-reveal ${expVisible ? 'is-visible' : ''}`}
              >
              <div className="absolute left-4 top-6 w-8 h-8 bg-primary rounded-full flex items-center justify-center hidden md:flex">
                <Briefcase className="w-4 h-4 text-primary-foreground" />
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">{exp.title}</h3>
                  <p className="text-secondary font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                </div>
                <ul className="space-y-2 text-foreground/90">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
