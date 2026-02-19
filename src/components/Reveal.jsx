import React, { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

/**
 * Reveal: micro-animação leve e compatível (sem libs) para dar sensação premium no mobile.
 * - Anima ao entrar na viewport
 * - Respeita prefers-reduced-motion
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  y = 14,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return (
    <section
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible ? "opacity-100 translate-y-0" : `opacity-0 translate-y-[${y}px]`,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}
