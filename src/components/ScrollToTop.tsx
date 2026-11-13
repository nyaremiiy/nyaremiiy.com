"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import s from "./ScrollToTop.module.css";

const SHOW_AFTER = 500;

export function ScrollToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > SHOW_AFTER);

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
      className={`${s.button} ${visible ? s.visible : ""}`}
      aria-label={label}
      title={label}
      tabIndex={visible ? 0 : -1}
      onClick={scrollToTop}
    >
      <Icon name="arrowUp" size={22} strokeWidth={2.2} />
    </button>
  );
}
