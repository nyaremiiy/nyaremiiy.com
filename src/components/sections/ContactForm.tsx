"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import type { Dictionary, Locale } from "@/src/i18n";
import { normalize, validateContact, type ContactErrors, type ContactField } from "@/src/lib/contact";
import { Icon } from "../Icon";
import { Toast, type ToastData } from "../Toast";
import s from "./Contact.module.css";

type Props = { f: Dictionary["contact"]["form"]; locale: Locale };

const order: ContactField[] = ["name", "phone", "contact", "message"];

export function ContactForm({ f, locale }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  const read = () => normalize(Object.fromEntries(new FormData(formRef.current!)));

  // once a field has been flagged, re-validate as the user fixes it
  const revalidate = () => {
    if (Object.keys(errors).length === 0) return;
    const next = validateContact(read());
    setErrors((prev) => {
      const kept: ContactErrors = {};
      for (const k of order) if (prev[k] && next[k]) kept[k] = next[k];
      return kept;
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const data = read();
    const found = validateContact(data);
    setErrors(found);
    const first = order.find((k) => found[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setSending(true);
    setToast(null);
    try {
      const website = (new FormData(formRef.current!).get("website") as string) ?? "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website, locale }),
      });
      if (res.status === 422) {
        const json = await res.json().catch(() => ({}));
        if (json.errors) setErrors(json.errors);
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      formRef.current?.reset();
      setErrors({});
      setToast({ kind: "success", title: f.toast.successTitle, text: f.toast.successText });
    } catch {
      setToast({ kind: "error", title: f.toast.errorTitle, text: f.toast.errorText });
    } finally {
      setSending(false);
    }
  };

  const describedBy = (name: ContactField) => {
    if (!errors[name]) {
      if (name !== "phone" && name !== "contact") return undefined;
      return errors.contact ? "cf-contact-err" : "cf-oneof";
    }
    // the "add phone or email" error is printed once, under the email/Telegram field
    if (name === "phone" && errors.phone === "contactRequired") return "cf-contact-err";
    return `cf-${name}-err`;
  };

  const field = (name: ContactField) => ({
    name,
    id: `cf-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": describedBy(name),
    onChange: revalidate,
    className: s.input,
  });

  const err = (name: ContactField) => {
    const code = errors[name];
    if (!code || (name === "phone" && code === "contactRequired")) return null;
    return (
      <span id={`cf-${name}-err`} className={s.error}>
        {f.errors[code]}
      </span>
    );
  };

  return (
    <>
      <form ref={formRef} className={`glass ${s.form}`} onSubmit={onSubmit} noValidate data-reveal="left" aria-busy={sending}>
        <div className={s.row2}>
          <label className={s.label} htmlFor="cf-name">
            <span>
              {f.name}
              <span className={s.req} aria-hidden="true">
                {" "}
                *
              </span>
              <span className="sr-only"> ({f.required})</span>
            </span>
            <input {...field("name")} type="text" autoComplete="name" placeholder={f.namePlaceholder} required aria-required="true" />
            {err("name")}
          </label>
          <label className={s.label} htmlFor="cf-phone">
            {f.phone}
            <input {...field("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder={f.phonePlaceholder} />
            {err("phone")}
          </label>
        </div>
        <label className={s.label} htmlFor="cf-contact">
          {f.contact}
          <input {...field("contact")} type="text" autoComplete="email" placeholder={f.contactPlaceholder} />
          {err("contact") ?? (
            <span id="cf-oneof" className={s.hint}>
              {f.oneOfHint}
            </span>
          )}
        </label>
        <label className={s.label} htmlFor="cf-message">
          {f.message}
          <textarea {...field("message")} className={`${s.input} ${s.textarea}`} rows={5} placeholder={f.messagePlaceholder} />
          {err("message")}
        </label>

        {/* honeypot for bots: hidden from people and assistive tech */}
        <div className={s.hp} aria-hidden="true">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className={s.formFoot}>
          <p className={s.consent}>{f.consent}</p>
          <button type="submit" className={s.submit} disabled={sending}>
            {sending ? f.sending : f.submit}
            {sending ? <span className={s.spinner} aria-hidden="true" /> : <Icon name="send" size={18} />}
          </button>
        </div>
      </form>
      <Toast toast={toast} onClose={closeToast} closeLabel={f.toast.close} />
    </>
  );
}
