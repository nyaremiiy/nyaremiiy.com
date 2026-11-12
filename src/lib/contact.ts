/** Contact-form validation shared by the client form and /api/contact. */

export type ContactPayload = { name: string; phone: string; contact: string; message: string };
export type ContactField = keyof ContactPayload;
export type ContactErrorCode = "nameRequired" | "phoneInvalid" | "contactRequired" | "contactInvalid" | "messageTooLong";
export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

export const MESSAGE_MAX = 5000;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEGRAM = /^(@|https?:\/\/t\.me\/|t\.me\/)?[a-zA-Z][a-zA-Z0-9_]{4,31}$/;
const PHONE_CHARS = /^\+?[\d\s()-]+$/;

export function normalize(input: Partial<Record<string, unknown>>): ContactPayload {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  return { name: str(input.name), phone: str(input.phone), contact: str(input.contact), message: str(input.message) };
}

/**
 * Rules:
 * - name is required;
 * - at least one way to reply: phone OR email/Telegram;
 * - whatever is filled in must be valid;
 * - message is optional.
 */
export function validateContact(p: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  if (p.name.length < 2 || p.name.length > 100) errors.name = "nameRequired";

  if (!p.phone && !p.contact) {
    // shown once (under the email/Telegram field); both fields are marked invalid
    errors.phone = "contactRequired";
    errors.contact = "contactRequired";
  }

  if (p.phone) {
    const digits = p.phone.replace(/\D/g, "").length;
    if (!PHONE_CHARS.test(p.phone) || digits < 10 || digits > 15) errors.phone = "phoneInvalid";
  }

  if (p.contact) {
    const looksLikeEmail = p.contact.includes("@") && !p.contact.startsWith("@");
    if (looksLikeEmail ? !EMAIL.test(p.contact) : !TELEGRAM.test(p.contact)) errors.contact = "contactInvalid";
  }

  if (p.message.length > MESSAGE_MAX) errors.message = "messageTooLong";
  return errors;
}
