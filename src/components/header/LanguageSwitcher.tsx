"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { localePath, type Dictionary, type Locale } from "@/src/i18n";
import { Icon } from "../Icon";
import s from "./Header.module.css";

type Props = { locale: Locale; ui: Dictionary["ui"]; onNavigate?: () => void; wide?: boolean };

export function LanguageSwitcher({ locale, ui, onNavigate, wide }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const options: { code: Locale; label: string; short: string }[] = [
    { code: "uk", label: ui.langUk, short: "UA" },
    { code: "en", label: ui.langEn, short: "EN" },
  ];

  return (
    <div className={`${s.lang} ${wide ? s.langWide : ""}`} ref={ref}>
      <button
        ref={btnRef}
        type="button"
        className={`glass ${s.langBtn}`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${ui.language}: ${locale === "uk" ? ui.langUk : ui.langEn}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={s.langGlobe}>
          <Icon name="globe" size={18} />
        </span>
        {ui.langShort}
        <span className={`${s.langChevron} ${open ? s.langChevronOpen : ""}`}>
          <Icon name="chevronDown" size={16} />
        </span>
      </button>
      <ul id={menuId} className={`glass ${s.langMenu}`} hidden={!open}>
        {options.map((o) => (
          <li key={o.code}>
            <Link
              href={localePath[o.code]}
              hrefLang={o.code === "uk" ? "uk" : "en"}
              lang={o.code === "uk" ? "uk" : "en"}
              aria-current={o.code === locale ? "true" : undefined}
              className={s.langItem}
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
            >
              <span className={s.langCode}>{o.short}</span>
              {o.label}
              {o.code === locale && (
                <span className={s.langCheck}>
                  <Icon name="check" size={16} strokeWidth={3} />
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
