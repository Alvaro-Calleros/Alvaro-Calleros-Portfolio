import { Mail, Phone, MapPin, Github, Linkedin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ContactProps {
  translations: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    downloadCV: string;
    footer: string;
  };
}

const Contact = ({ translations }: ContactProps) => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { ref: cardRef, isVisible: cardVisible } = useScrollReveal({ delay: 100 });

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-4xl">
        <h2 
          ref={titleRef as any}
          className={`text-4xl md:text-5xl font-bold text-center mb-8 gradient-text scroll-reveal ${titleVisible ? 'is-visible' : ''}`}
        >
          {translations.title}
        </h2>
        <p className={`text-center text-muted-foreground mb-12 text-lg transition-all duration-500 delay-100 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {translations.subtitle}
        </p>

        <Card 
          ref={cardRef as any}
          className={`p-8 bg-gradient-to-br from-card to-muted/20 border-primary/20 mb-8 scroll-reveal ${cardVisible ? 'is-visible' : ''}`}
        >
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <a 
              href="mailto:alvarocalleros44@gmail.com"
              className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-primary/10 transition-colors group"
            >
              <Mail className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              <div className="text-center">
                <p className="font-semibold">{translations.email}</p>
                <p className="text-sm text-muted-foreground">alvarocalleros44@gmail.com</p>
              </div>
            </a>

            <div className="flex flex-col items-center gap-3 p-4 rounded-lg">
              <Phone className="w-8 h-8 text-primary" />
              <div className="text-center">
                <p className="font-semibold">{translations.phone}</p>
                <p className="text-sm text-muted-foreground">+52 669 264 8685</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 p-4 rounded-lg">
              <MapPin className="w-8 h-8 text-primary" />
              <div className="text-center">
                <p className="font-semibold">{translations.location}</p>
                <p className="text-sm text-muted-foreground">Mazatlan, Sinaloa, Mexico</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-effect w-full sm:w-auto"
              asChild
            >
              <a href="/cv-placeholder.pdf" download>
                <Download className="w-5 h-5 mr-2" />
                {translations.downloadCV}
              </a>
            </Button>

            <div className="flex gap-4">
              <Button size="lg" variant="outline" className="border-primary" asChild>
                <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary" asChild>
                <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </Card>

        <p className="text-center text-muted-foreground text-sm">
          {translations.footer}
        </p>
      </div>
    </section>
  );
};

export default Contact;
