import type { Dictionary, Locale } from "@/src/i18n";
import { profile } from "@/src/data/profile";
import { Icon, type IconName } from "../Icon";
import { IconTile, Section, SectionHead, cx } from "../ui";
import { ContactForm } from "./ContactForm";
import s from "./Contact.module.css";

export function contactLinks(t: Dictionary) {
  const l = t.contact.links;
  return {
    email: { href: `mailto:${profile.email}`, icon: "mail", title: l.email, value: profile.email },
    telegram: { href: profile.telegram, icon: "telegram", title: l.telegram, value: profile.telegramHandle },
    phone: { href: `tel:${profile.phone}`, icon: "phone", title: l.phone, value: profile.phoneDisplay },
    linkedin: { href: profile.linkedin, icon: "linkedin", title: l.linkedin, value: profile.linkedinHandle },
    github: { href: profile.github, icon: "github", title: l.github, value: profile.githubHandle },
  } satisfies Record<string, { href: string; icon: IconName; title: string; value: string }>;
}

export function isExternal(href: string) {
  return href.startsWith("http");
}

export function Contact({ t, locale }: { t: Dictionary; locale: Locale }) {
  const c = t.contact;
  const links = Object.values(contactLinks(t));
  return (
    <Section id="contact" minHeight={1100} innerClassName={s.inner} labelledBy="contact-title">
      <SectionHead
        num="07"
        label={c.label}
        titleId="contact-title"
        title={
          <>
            {c.title} <span className="shine" aria-hidden="true">→</span>
          </>
        }
        lead={c.lead}
      />

      <div className={s.layout}>
        <ContactForm f={c.form} locale={locale} />

        <div className={s.side} data-reveal-stagger>
          <div className={s.sideTitle}>{c.direct}</div>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cx("glass", s.link)}
              {...(isExternal(l.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <IconTile icon={l.icon} />
              <span className={s.linkText}>
                <span className={s.linkTitle}>{l.title}</span>
                <span className={s.linkValue}>{l.value}</span>
              </span>
              <span className={s.linkArrow}>
                <Icon name="external" size={18} />
              </span>
            </a>
          ))}
          <a href={profile.resume} download className={s.cv}>
            <Icon name="download" size={18} />
            {c.cv}
          </a>
        </div>
      </div>
    </Section>
  );
}
