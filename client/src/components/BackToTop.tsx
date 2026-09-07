import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 400;

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > SCROLL_THRESHOLD);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={scrollToTop}
      className={`fixed bottom-5 right-4 z-[60] inline-flex h-12 items-center gap-2 border border-primary/50 bg-background/92 px-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary shadow-[0_12px_32px_rgba(0,0,0,0.42)] backdrop-blur-md transition-[opacity,transform,border-color,background-color] duration-200 ease-out hover:border-primary hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] sm:bottom-6 sm:right-6 ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
      <span>Top</span>
    </button>
  );
}
