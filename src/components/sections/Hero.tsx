import type { CSSProperties } from "react";
import type { Dictionary } from "@/src/i18n";
import { Icon } from "../Icon";
import { Blobs, IconTile, Tags, ui, cx } from "../ui";
import s from "./Hero.module.css";

export function Hero({ t }: { t: Dictionary }) {
  const h = t.hero;
  return (
    <div id="top" className={cx(ui.section, s.top)} style={{ "--min-h": "860px" } as CSSProperties}>
      <Blobs />
      <main id="main" className={s.main}>
        <div className={s.copy}>
          <div className={cx("glass", s.status)}>
            <span className={cx("pulse", s.dot)} />
            {h.status}
          </div>
          <div className={s.greeting}>
            <span className={s.slashes}>//</span> {h.greeting}
          </div>
          <h1 className={s.h1}>
            {h.title}
            <br />
            <span className="shine">{h.titleShine}</span>
          </h1>
          <p className={s.lead}>{h.lead}</p>
          <div className={s.ctas}>
            <a href="#projects" className={cx(ui.btn, s.ctaPrimary)}>
              {h.ctaProjects}
              <Icon name="arrowRight" size={18} />
            </a>
            <a href="#contact" className={cx("glass", ui.btn, ui.btnGlass)}>
              {h.ctaContact}
            </a>
          </div>
        </div>

        <div className={s.cards}>
          <div className={cx("glass bob", s.card, s.cardWide)}>
            <div className={s.stackHead}>
              <IconTile icon="code" />
              <div className={s.stackTitle}>{h.stackTitle}</div>
            </div>
            <Tags items={h.stack} />
          </div>
          <div className={cx("glass bob d1", s.card)}>
            <IconTile icon="briefcase" />
            <div className={s.cardTitle}>{h.nowTitle}</div>
            <div className={s.cardText}>{h.nowText}</div>
          </div>
          <div className={cx("glass bob d2", s.card)}>
            <IconTile icon="users" />
            <div className={s.cardTitle}>{h.mentorTitle}</div>
            <div className={s.cardText}>{h.mentorText}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
