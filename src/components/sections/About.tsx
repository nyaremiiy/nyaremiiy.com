import type { Dictionary } from "@/src/i18n";
import { profile } from "@/src/data/profile";
import { Icon } from "../Icon";
import { Section, SectionLabel, ui, cx } from "../ui";
import s from "./About.module.css";

const bobs = ["", "d1", "d2"];

export function About({ t }: { t: Dictionary }) {
  const a = t.about;
  return (
    <Section id="about" minHeight={1060} innerClassName={s.inner} labelledBy="about-title">
      {/* Resume preview: click opens the PDF; buttons download / open it */}
      <div className={s.resumeCol} data-reveal="left">
        <div className={s.frameWrap}>
          <div aria-hidden="true" className={s.glow} />
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className={cx("glass", s.frame)} title={a.resume.open}>
            {/* Pre-rendered from the PDF at the exact displayed size per pixel density.
                Not next/image: rescaling / re-compressing would blur the tiny text. */}
            <picture>
              {/* ≥768px the page is always exactly 350 CSS px wide → pick by pixel density */}
              <source
                media="(min-width: 768px)"
                srcSet={profile.resumePreview.densities.map(([w, d]) => `${profile.resumePreview.src(w)} ${d}x`).join(", ")}
              />
              {/* phones: width varies with the screen → pick by width */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.resumePreview.src(700)}
                srcSet={profile.resumePreview.densities.map(([w]) => `${profile.resumePreview.src(w)} ${w}w`).join(", ")}
                sizes="calc(min(100vw - 32px, 340px) - 30px)"
                width={profile.resumePreview.size[0]}
                height={profile.resumePreview.size[1]}
                alt={a.resume.previewAlt}
                loading="lazy"
                decoding="async"
                className={s.page}
              />
            </picture>
            <span className="sr-only"> ({a.resume.open})</span>
            <span className={s.badge} aria-hidden="true">
              {a.resume.badge} · {profile.resumePages}
            </span>
          </a>
        </div>
        <div className={s.actions}>
          <a href={profile.resume} download className={cx(ui.btn, ui.btnGrad, s.action)}>
            <Icon name="download" size={18} />
            {a.resume.download}
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={cx("glass", ui.btn, ui.btnGlass, s.action)}
            aria-label={`${a.resume.view}: ${a.resume.open}`}
          >
            {a.resume.view}
            <Icon name="external" size={18} />
          </a>
        </div>
      </div>

      <div className={s.body}>
        <div className={ui.head} data-reveal-stagger>
          <SectionLabel num="01" text={a.label} />
          <h2 id="about-title" className={ui.h2}>
            {a.title}
          </h2>
          <p className={s.lead}>{a.lead}</p>
        </div>

        <div className={s.cards} data-reveal-stagger>
          {a.cards.map((c, i) => (
            <div key={c.title} className={cx("glass bob", bobs[i], s.card)}>
              <div className={cx("shine", s.num)} aria-hidden="true">
                0{i + 1}
              </div>
              <h3 className={s.cardTitle}>{c.title}</h3>
              <p className={s.cardText}>{c.text}</p>
            </div>
          ))}
        </div>

        <div className={s.ai} data-reveal>
          <span className={s.aiTile}>
            <Icon name="bot" />
          </span>
          <p className={s.aiText}>{a.ai}</p>
        </div>

        <ul className={s.chips} data-reveal-stagger>
          {a.chips.map((c) => (
            <li key={c} className={s.chip}>
              <span className={s.chipDot} />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
