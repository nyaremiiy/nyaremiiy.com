"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Icon";
import s from "./Toast.module.css";

export type ToastData = { kind: "success" | "error"; title: string; text: string };

type Props = { toast: ToastData | null; onClose: () => void; closeLabel: string; duration?: number };

/** Pop-up notification, bottom-right (bottom-center on phones). Announced to screen readers. */
export function Toast({ toast, onClose, closeLabel, duration = 6000 }: Props) {
  // render into <body> so no section's stacking context can cover it
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(onClose, duration);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener("keydown", onKey);
    };
  }, [toast, onClose, duration]);

  if (!mounted) return null;
  return createPortal(
    // the live region stays mounted so the announcement is reliable
    <div className={s.region} role={toast?.kind === "error" ? "alert" : "status"} aria-live={toast?.kind === "error" ? "assertive" : "polite"}>
      {toast && (
        <div key={toast.title + toast.text} className={`glass ${s.toast} ${toast.kind === "error" ? s.error : s.success}`}>
          <span className={s.icon}>
            <Icon name={toast.kind === "error" ? "close" : "check"} size={18} strokeWidth={3} />
          </span>
          <div className={s.body}>
            <div className={s.title}>{toast.title}</div>
            <div className={s.text}>{toast.text}</div>
          </div>
          <button type="button" className={s.close} aria-label={closeLabel} onClick={onClose}>
            <Icon name="close" size={16} />
          </button>
          <span aria-hidden="true" className={s.timer} style={{ animationDuration: `${duration}ms` }} />
        </div>
      )}
    </div>,
    document.body,
  );
}
