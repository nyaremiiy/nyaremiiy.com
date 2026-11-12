import type { Dictionary, Locale } from "@/src/i18n";
import { profile } from "@/src/data/profile";
import { navIds } from "@/src/lib/nav";
import { Icon } from "../Icon";
import { Logo } from "../Logo";
import { Section, ui, cx } from "../ui";
import { contactLinks, isExternal } from "./Contact";
import s from "./Footer.module.css";

type LinkItem = ReturnType<typeof contactLinks>[keyof ReturnType<typeof contactLinks>];

function FooterLink({ l }: { l: LinkItem }) {
  return (
    <a href={l.href} className={s.link} {...(isExternal(l.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <span className={s.linkIcon}>
        <Icon name={l.icon} size={18} />
      </span>
      <span className={s.linkText}>
        <span className={s.linkTitle}>{l.title}</span>
        <span className={s.linkValue}>{l.value}</span>
      </span>
    </a>
  );
}

export function Footer({ t, locale }: { t: Dictionary; locale: Locale }) {
  const f = t.footer;
  const links = contactLinks(t);
  return (
    <Section id="footer" as="footer" minHeight={820} innerClassName={s.inner}>
      <div className={cx("glass", s.card)} data-reveal>
        <div className={s.cols}>
          <div className={s.brand}>
            <Logo label={t.ui.home} size="lg" />
            <p className={s.tagline}>{f.tagline}</p>
            <div className={s.status}>
              <span className={cx("pulse", s.dot)} />
              {f.status}
            </div>
            <div className={s.ctas}>
              <a href={`mailto:${profile.email}`} className={cx(ui.btn, ui.btnGrad, s.btnSm, s.btnMail)}>
                {f.emailMe}
                <Icon name="arrowRight" size={18} />
              </a>
              <a href={profile.resume} download className={cx("glass", ui.btn, ui.btnGlass, s.btnSm, s.btnCv)}>
                <Icon name="download" size={18} />
                {f.cv}
              </a>
            </div>
          </div>

          <div className={s.colContacts}>
            <h2 className={s.colTitle}>{f.contactsTitle}</h2>
            <div className={s.links}>
              <FooterLink l={links.email} />
              <FooterLink l={links.telegram} />
              <FooterLink l={links.phone} />
            </div>
          </div>

          <div className={s.colProfiles}>
            <h2 className={s.colTitle}>{f.profilesTitle}</h2>
            <div className={s.links}>
              <FooterLink l={links.linkedin} />
              <FooterLink l={links.github} />
            </div>
          </div>

          <nav aria-label={locale === "uk" ? "Навігація у футері" : "Footer"} className={s.colNav}>
            <h2 className={s.colTitle}>{f.navTitle}</h2>
            {navIds.map((id) => (
              <a key={id} href={`#${id}`} className={s.navLink}>
                {t.nav[id]}
              </a>
            ))}
          </nav>
        </div>

        <div className={s.bottom}>
          <span className={s.copy}>{f.copyright}</span>
          <a href="#top" className={cx("glass", s.toTop)}>
            {f.toTop}
            <Icon name="arrowUp" size={18} />
          </a>
        </div>
      </div>
      <div aria-hidden="true" className={cx("shine", s.bigName)} data-reveal="scale">
        {f.bigName}
      </div>
    </Section>
  );
}
