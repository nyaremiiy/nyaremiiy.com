"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/src/i18n";
import { profile } from "@/src/data/profile";
import { navIds } from "@/src/lib/nav";
import { Icon } from "../Icon";
import { Logo } from "../Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import s from "./Header.module.css";


type Props = { locale: Locale; t: Dictionary };

export function Header({ locale, t }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const openBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
      // keep focus inside the dialog
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      openBtn.current?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  // close the menu if the viewport grows past the mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1200px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setMenuOpen(false);

  // Unlock scrolling first, then scroll — otherwise the body lock cancels the smooth scroll.
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hash = e.currentTarget.getAttribute("href") ?? "";
    const target = hash.startsWith("#") ? document.getElementById(hash.slice(1)) : null;
    if (!target) return close();
    e.preventDefault();
    close();
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", hash);
      }),
    );
  };

  return (
    <header className={s.header}>
      <div className={`glass ${s.bar}`}>
        <Logo label={t.ui.home} />
        <nav aria-label={locale === "uk" ? "Головна навігація" : "Main"} className={s.nav}>
          {navIds.map((id) => (
            <a key={id} href={`#${id}`} className={s.navLink}>
              {t.nav[id]}
            </a>
          ))}
        </nav>
        <div className={s.controls}>
          <div className={s.desktopOnly}>
            <LanguageSwitcher locale={locale} ui={t.ui} />
          </div>
          <ThemeToggle label={t.ui.theme} />
          <a href={profile.resume} download className={`${s.cv} ${s.desktopOnly}`}>
            <Icon name="download" size={18} />
            {t.header.cv}
          </a>
          <button
            ref={openBtn}
            type="button"
            className={`glass ${s.iconBtn} ${s.burger}`}
            aria-label={t.ui.menuOpen}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" size={20} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={t.ui.menuOpen}
        className={`glass ${s.menu}`}
        hidden={!menuOpen}
      >
        <div className={s.menuTop}>
          <Logo label={t.ui.home} onClick={goTo} />
          <button ref={closeBtn} type="button" className={`glass ${s.iconBtn}`} aria-label={t.ui.menuClose} onClick={close}>
            <Icon name="close" size={20} />
          </button>
        </div>
        <nav aria-label={locale === "uk" ? "Мобільна навігація" : "Mobile"} className={s.menuNav}>
          {navIds.map((id, i) => (
            <a key={id} href={`#${id}`} className={s.menuLink} onClick={goTo}>
              <span className={s.menuNum}>0{i + 1}</span>
              {t.nav[id]}
            </a>
          ))}
        </nav>
        <div className={s.menuFoot}>
          <LanguageSwitcher locale={locale} ui={t.ui} onNavigate={close} wide />
          <a href={profile.resume} download className={`${s.cv} ${s.cvWide}`}>
            <Icon name="download" size={18} />
            {t.header.cv}
          </a>
        </div>
      </div>
    </header>
  );
}
