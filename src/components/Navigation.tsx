import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  translations: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    experience: string;
    contact: string;
  };
}

const Navigation = ({ currentLang, onLanguageChange, translations }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: translations.home, href: "#home" },
    { label: translations.about, href: "#about" },
    { label: translations.projects, href: "#projects" },
    { label: translations.skills, href: "#skills" },
    { label: translations.experience, href: "#experience" },
    { label: translations.contact, href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="text-2xl font-bold gradient-text"
          >
            AC
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className="relative text-foreground/80 hover:text-primary transition-all duration-200 font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-primary/30">
                  <Globe className="w-4 h-4 mr-2" />
                  {currentLang.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onLanguageChange("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLanguageChange("es")}>
                  Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLanguageChange("fr")}>
                  Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Globe className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onLanguageChange("en")}>EN</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLanguageChange("es")}>ES</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLanguageChange("fr")}>FR</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 bg-card/95 backdrop-blur-md rounded-lg mt-2 border border-primary/20">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className="block px-4 py-2 text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
