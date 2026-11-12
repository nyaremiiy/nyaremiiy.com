"use client";

import { useEffect } from "react";

const STEP_MS = 80; // delay between staggered children
const MAX_STEPS = 8; // cap so long lists don't take forever
const DURATION_MS = 900;

function show(el: HTMLElement, delay = 0) {
  if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
  el.classList.add("is-visible");
  // drop the delay afterwards so hover transitions aren't delayed
  if (delay) window.setTimeout(() => el.style.removeProperty("--reveal-delay"), delay + DURATION_MS);
}

/**
 * Scroll reveal:
 * - [data-reveal]         → the element gets .is-visible when it enters the viewport
 * - [data-reveal-stagger] → its children get .is-visible one after another
 */
export function RevealObserver() {
  useEffect(() => {
    const singles = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const groups = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-stagger]"));
    const childrenOf = (g: HTMLElement) => Array.from(g.children) as HTMLElement[];

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      singles.forEach((el) => show(el));
      groups.forEach((g) => childrenOf(g).forEach((c) => show(c)));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          if (el.hasAttribute("data-reveal-stagger")) {
            childrenOf(el).forEach((c, i) => show(c, Math.min(i, MAX_STEPS) * STEP_MS));
          } else {
            show(el);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    singles.forEach((el) => io.observe(el));
    groups.forEach((g) => io.observe(g));
    return () => io.disconnect();
  }, []);

  return null;
}
