"use client";

import { Icon } from "../Icon";
import s from "./Header.module.css";

export const THEME_KEY = "nyaremiiy-theme";

/** Both icons are rendered; CSS shows the right one from html[data-theme], so there is no hydration flash. */
export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this page view */
    }
  };

  return (
    <button type="button" className={`glass ${s.iconBtn}`} aria-label={label} onClick={toggle}>
      <span className={s.moon}>
        <Icon name="moon" size={20} />
      </span>
      <span className={s.sun}>
        <Icon name="sun" size={20} />
      </span>
    </button>
  );
}
