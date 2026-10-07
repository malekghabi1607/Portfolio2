import { useEffect } from 'react';

/**
 * Observe les éléments .scroll-animate et ajoute .visible
 * quand ils entrent dans le viewport.
 */
export function useScrollAnimation(): void {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.scroll-animate'));

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      }
      observer.observe(el);
    });

    const fallback = window.setTimeout(() => {
      elements.forEach((el) => el.classList.add('visible'));
    }, 800);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);
}
