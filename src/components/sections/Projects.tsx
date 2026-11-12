import type { CSSProperties } from "react";
import type { Dictionary } from "@/src/i18n";
import { projects, type Project } from "@/src/data/projects";
import { Icon } from "../Icon";
import { ImagePlaceholder } from "../ImagePlaceholder";
import { Section, SectionHead, Tags, ui, cx } from "../ui";
import s from "./Projects.module.css";

function BrowserFrame({ p, name, alt }: { p: Project; name: string; alt: string }) {
  return (
    <div
      className={cx("bob", p.bob, s.frame)}
      data-reveal={p.mediaFirst ? "left" : "right"}
      style={{ "--frame-bg": p.frameBg } as CSSProperties}>
      <div className={s.frameBar}>
        <span className={s.dot} style={{ background: "#FF5F57" }} />
        <span className={s.dot} style={{ background: "#FEBC2E" }} />
        <span className={s.dot} style={{ background: "#28C840" }} />
        <span className={s.address}>{p.address}</span>
      </div>
      <ImagePlaceholder image={p.image} imageSize={p.imageSize} name={name} alt={alt} colors={p.placeholder} />
    </div>
  );
}

export function Projects({ t }: { t: Dictionary }) {
  const pr = t.projects;
  return (
    <Section id="projects" minHeight={3900} innerClassName={s.inner} labelledBy="projects-title">
      <SectionHead num="05" label={pr.label} title={pr.title} titleId="projects-title" lead={pr.lead} />

      <div className={s.list}>
        {projects.map((p) => {
          const item = pr.items[p.id];
          const frame = <BrowserFrame p={p} name={item.name} alt={item.alt} />;
          return (
            <article key={p.id} className={cx("glass", s.card, p.mediaFirst && s.mediaFirst)} data-reveal>
              {p.mediaFirst && frame}
              <div className={s.copy}>
                <div className={s.kicker}>{item.kicker}</div>
                <h3 className={s.name}>{item.name}</h3>
                <p className={s.text}>{item.text}</p>

                <div className={s.built}>
                  <div className={s.subTitle}>{pr.builtAll}</div>
                  <ol className={s.flow}>
                    {item.flow.map((step, i) => (
                      <li key={step} className={s.flowItem}>
                        {i > 0 && (
                          <span aria-hidden="true" className={s.flowArrow}>
                            <Icon name="arrowRight" size={18} />
                          </span>
                        )}
                        <span className={s.step}>
                          <span className={s.stepIcon}>
                            <Icon name={p.flowIcons[i]} size={16} />
                          </span>
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <div className={cx(s.subTitle, s.featuresTitle)}>{pr.whatsOn}</div>
                  <ul className={s.features}>
                    {item.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>

                <Tags items={item.tags} small />

                <div className={s.actions}>
                  <a href={p.url} className={cx(ui.btn, ui.btnGrad)} target="_blank" rel="noopener noreferrer">
                    {pr.visit}
                    <Icon name="external" size={18} />
                  </a>
                  {p.github && (
                    <a
                      href={p.github}
                      className={cx("glass", ui.btn, ui.btnGlass, s.githubBtn)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name="github" size={18} />
                      {pr.github}
                    </a>
                  )}
                </div>
              </div>
              {!p.mediaFirst && frame}
            </article>
          );
        })}
      </div>

      <p className={s.footnote}>{pr.footnote}</p>
    </Section>
  );
}
