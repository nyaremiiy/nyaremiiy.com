import type { Dictionary } from "@/src/i18n";
import { certificateYears, verifyUrl } from "@/src/data/certificates";
import { Icon } from "../Icon";
import { IconTile, Section, SectionHead, cx } from "../ui";
import s from "./Certificates.module.css";

export function Certificates({ t }: { t: Dictionary }) {
  const c = t.certificates;
  return (
    <Section id="certificates" minHeight={1240} innerClassName={s.inner} labelledBy="certificates-title">
      <SectionHead num="03" label={c.label} title={c.title} titleId="certificates-title" lead={c.lead} />

      <div className={s.years}>
        {certificateYears.map((y) => (
          <div key={y.year} className={s.year}>
            <div className={s.yearCol} data-reveal="left">
              <div className={cx("shine", s.yearNum)}>{y.year}</div>
              <div className={s.count}>{c.years[String(y.year) as keyof typeof c.years]}</div>
            </div>
            <ul className={s.list} data-reveal-stagger>
              {y.items.map((item) => {
                const text = c.items[item.id];
                return (
                  <li key={item.id} className={cx("glass", s.row)}>
                    <IconTile icon={item.icon} />
                    <div className={s.info}>
                      <h3 className={s.title}>{text.title}</h3>
                      <div className={s.sub}>
                        SoftServe Academy · {c.series} {item.series} № {item.number}/{item.year}
                      </div>
                    </div>
                    <span className={s.category}>{text.category}</span>
                    <time dateTime={item.date} className={s.date}>
                      {text.date}
                    </time>
                    <a
                      href={verifyUrl(item)}
                      className={s.verify}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${c.verify}: ${text.title}`}
                    >
                      {c.verify}
                      <Icon name="external" size={18} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
