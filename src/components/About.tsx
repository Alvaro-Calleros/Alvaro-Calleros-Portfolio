import { GraduationCap, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface AboutProps {
  translations: {
    title: string;
    description: string;
    education: string;
    university: string;
    degree: string;
    gpa: string;
    coursework: string;
    certifications: string;
    asuCert: string;
    languages: string;
    english: string;
    spanish: string;
    french: string;
  };
}

const About = ({ translations }: AboutProps) => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { ref: card1Ref, isVisible: card1Visible } = useScrollReveal({ delay: 80 });
  const { ref: card2Ref, isVisible: card2Visible } = useScrollReveal({ delay: 160 });
  const { ref: descRef, isVisible: descVisible } = useScrollReveal({ delay: 240 });

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef as any}
          className={`text-4xl md:text-5xl font-bold text-center mb-16 gradient-text scroll-reveal ${titleVisible ? 'is-visible' : ''}`}
        >
          {translations.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card 
            ref={card1Ref as any}
            className={`p-8 bg-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-card scroll-reveal ${card1Visible ? 'is-visible' : ''}`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{translations.education}</h3>
                <p className="text-muted-foreground">{translations.university}</p>
              </div>
            </div>
            <div className="space-y-2 text-foreground/90">
              <p><strong>{translations.degree}</strong></p>
              <p>{translations.gpa}</p>
              <p className="text-sm text-muted-foreground">
                {translations.coursework}
              </p>
            </div>
          </Card>

          <Card 
            ref={card2Ref as any}
            className={`p-8 bg-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-card scroll-reveal ${card2Visible ? 'is-visible' : ''}`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{translations.certifications}</h3>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-foreground/90">{translations.asuCert}</p>
                <p className="text-sm text-muted-foreground">~150 hours</p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="font-semibold mb-2">{translations.languages}</p>
                <ul className="space-y-1 text-foreground/90">
                  <li>• {translations.english}</li>
                  <li>• {translations.spanish}</li>
                  <li>• {translations.french}</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <Card 
          ref={descRef as any}
          className={`p-8 bg-gradient-to-br from-card to-muted/20 border-primary/20 scroll-reveal ${descVisible ? 'is-visible' : ''}`}
        >
          <p className="text-lg leading-relaxed text-foreground/90 text-center max-w-4xl mx-auto">
            {translations.description}
          </p>
        </Card>
      </div>
    </section>
  );
};

export default About;
