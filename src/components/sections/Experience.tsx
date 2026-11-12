import type { Dictionary } from "@/src/i18n";
import { jobs } from "@/src/data/experience";
import { Icon } from "../Icon";
import { IconTile, Section, SectionHead, Tags, cx } from "../ui";
import s from "./Experience.module.css";

type Job = Dictionary["experience"]["jobs"][keyof Dictionary["experience"]["jobs"]];

export function Experience({ t }: { t: Dictionary }) {
  const e = t.experience;
  return (
    <Section id="experience" minHeight={2300} innerClassName={s.inner} labelledBy="experience-title">
      <SectionHead num="04" label={e.label} title={e.title} titleId="experience-title" />

      <ol className={s.list}>
        {jobs.map((j) => {
          const job: Job = e.jobs[j.id];
          const meta = "meta" in job ? job.meta : undefined;
          const period = "period" in job ? job.period : undefined;
          const project = "project" in job ? job.project : undefined;
          return (
            <li key={j.id} className={s.item} data-reveal>
              <div aria-hidden="true" className={s.rail}>
                <span className={cx("pulse", s.dot)} />
                <span className={s.line} />
              </div>
              <article className={cx("glass", s.card)}>
                <div className={s.top}>
                  <div>
                    <h3 className={s.role}>{job.role}</h3>
                    <div className={s.company}>{job.company}</div>
                    {meta && <div className={s.meta}>{meta}</div>}
                  </div>
                  {period && <span className={s.period}>{period}</span>}
                </div>

                <div className={s.groups}>
                  {job.groups.map((g, i) => (
                    <div key={g.title} className={s.group}>
                      <div className={s.groupHead}>
                        <IconTile icon={j.groupIcons[i]} />
                        <h4 className={s.groupTitle}>{g.title}</h4>
                      </div>
                      <ul className={s.bullets}>
                        {g.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {project && j.projectUrl && (
                  <a href={j.projectUrl} className={s.project} target="_blank" rel="noopener noreferrer">
                    <div>
                      <div className={s.kicker}>{project.kicker}</div>
                      <div className={s.projectName}>{project.name}</div>
                      <div className={s.projectText}>{project.text}</div>
                    </div>
                    <span className={s.projectLink}>
                      {project.link}
                      <Icon name="arrowRight" size={18} />
                    </span>
                  </a>
                )}

                <Tags items={job.tags} small />
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
