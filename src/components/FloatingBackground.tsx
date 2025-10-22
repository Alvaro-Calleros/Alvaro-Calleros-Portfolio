import { useEffect, useState } from "react";

const FloatingBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxOffset = scrollY * 0.3;

  return (
    <div className="floating-background" aria-hidden="true">
      <div 
        className="floating-orb floating-orb-1"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />
      <div 
        className="floating-orb floating-orb-2"
        style={{ transform: `translateY(${parallaxOffset * 0.7}px)` }}
      />
      <div 
        className="floating-orb floating-orb-3"
        style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
      />
    </div>
  );
};

export default FloatingBackground;
