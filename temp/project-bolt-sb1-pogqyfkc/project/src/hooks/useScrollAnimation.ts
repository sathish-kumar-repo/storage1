import { useEffect, useRef, RefObject } from 'react';

interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  once?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  options: AnimationOptions = {}
): RefObject<T> {
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    delay = 0,
    once = true
  } = options;
  
  const ref = useRef<T>(null);
  
  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              currentRef.classList.add('animate-in');
            }, delay);
            
            if (once) {
              observer.unobserve(currentRef);
            }
          } else if (!once) {
            currentRef.classList.remove('animate-in');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, delay, once]);

  return ref;
}