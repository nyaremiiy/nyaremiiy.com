import type { Dictionary } from "@/src/i18n";
import { skillGroups, spokenLevels } from "@/src/data/skills";
import { IconTile, Section, SectionHead, Tags, cx } from "../ui";
import s from "./Skills.module.css";

export function Skills({ t }: { t: Dictionary }) {
  const k = t.skills;
  return (
    <Section id="skills" minHeight={1560} innerClassName={s.inner} labelledBy="skills-title">
      <SectionHead num="02" label={k.label} title={k.title} titleId="skills-title" lead={k.lead} />

      <div className={s.grid} data-reveal-stagger>
        {skillGroups.map((g) => (
          <div key={g.id} className={cx("glass", s.card, g.span === 2 && s.span2)}>
            <div className={s.head}>
              <IconTile icon={g.icon} />
              <h3 className={s.title}>{k.groups[g.id].title}</h3>
            </div>
            <Tags items={k.groups[g.id].tags} />
          </div>
        ))}

        <div className={cx("glass", s.card, s.full)}>
          <div className={s.head}>
            <IconTile icon="chat" />
            <h3 className={s.title}>{k.spoken.title}</h3>
          </div>
          <div className={s.langs}>
            {k.spoken.items.map((l, i) => (
              <div key={l.name} className={s.lang}>
                <div className={s.langRow}>
                  <span className={s.langName}>{l.name}</span>
                  <span className={s.langLevel}>{l.level}</span>
                </div>
                <div aria-hidden="true" className={s.meter}>
                  {Array.from({ length: 5 }, (_, n) => (
                    <span key={n} className={n < spokenLevels[i] ? s.segOn : s.segOff} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
