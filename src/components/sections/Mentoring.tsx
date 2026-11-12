import type { Dictionary } from "@/src/i18n";
import { mentoringPlans } from "@/src/data/mentoring";
import { Icon } from "../Icon";
import { Section, cx } from "../ui";
import s from "./Mentoring.module.css";

const bobs = ["", "d1"];

export function Mentoring({ t }: { t: Dictionary }) {
  const m = t.mentoring;
  return (
    <Section id="mentoring" minHeight={1180} labelledBy="mentoring-title">
      <div className={s.panel} data-reveal="scale">
        <div aria-hidden="true" className={cx("blob", s.blobA)} />
        <div aria-hidden="true" className={cx("blob b2", s.blobB)} />

        <div className={s.copy}>
          <div className={cx("glass", s.label)}>
            <span className={s.labelStrong}>06</span>
            <span aria-hidden="true">//</span>
            <span className={s.labelText}>{m.label}</span>
          </div>
          <h2 id="mentoring-title" className={s.h2}>
            {m.title}
          </h2>
          <p className={s.lead}>{m.lead}</p>

          <h3 className={s.sub}>{m.benefitsTitle}</h3>
          <ul className={s.benefits}>
            {m.benefits.map((b) => (
              <li key={b} className={s.benefit}>
                <span className={s.check}>
                  <Icon name="check" size={16} strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <h3 className={s.sub}>{m.topicsTitle}</h3>
          <ul className={s.topics}>
            {m.topics.map((x) => (
              <li key={x} className={s.topic}>
                {x}
              </li>
            ))}
          </ul>

          <a href="#contact" className={s.cta}>
            {m.cta}
            <Icon name="arrowRight" size={18} />
          </a>
        </div>

        <div className={s.side} data-reveal-stagger>
          {m.plans.map((p, i) => (
            <div key={p.title} className={cx("glass bob", bobs[i], s.plan)}>
              <div className={s.planTop}>
                <div className={s.planIcon}>
                  <Icon name={mentoringPlans[i].icon} />
                </div>
                <div className={s.price}>
                  <div className={s.priceValue}>{p.price}</div>
                  <div className={s.pricePer}>{p.per}</div>
                </div>
              </div>
              <h3 className={s.planTitle}>{p.title}</h3>
              <p className={s.planText}>{p.text}</p>
            </div>
          ))}
          <div className={s.note}>
            <span className={s.noteIcon}>
              <Icon name="clock" size={20} />
            </span>
            <p className={s.noteText}>{m.schedule}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
