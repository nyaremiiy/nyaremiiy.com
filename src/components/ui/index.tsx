import type { CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "../Icon";
import s from "./ui.module.css";

export { s as ui };

export function cx(...names: (string | false | null | undefined)[]) {
  return names.filter(Boolean).join(" ");
}

export function Blobs() {
  return (
    <>
      <div aria-hidden="true" className={cx("blob", s.blob1)} />
      <div aria-hidden="true" className={cx("blob b2", s.blob2)} />
      <div aria-hidden="true" className={cx("blob b3", s.blob3)} />
    </>
  );
}

type SectionProps = {
  id: string;
  /** Artboard height of this section at 1440px (applied ≥1200px only). */
  minHeight: number;
  as?: "section" | "footer" | "div";
  className?: string;
  innerClassName?: string;
  labelledBy?: string;
  children: ReactNode;
};

export function Section({ id, minHeight, as: Tag = "section", className, innerClassName, labelledBy, children }: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cx(s.section, className)}
      style={{ "--min-h": `${minHeight}px` } as CSSProperties}
    >
      <Blobs />
      <div className={cx(s.container, innerClassName)}>{children}</div>
    </Tag>
  );
}

export function SectionLabel({ num, text, className }: { num: string; text: string; className?: string }) {
  return (
    <div className={cx("glass", s.label, className)}>
      <span className={s.labelNum}>{num}</span>
      <span aria-hidden="true">//</span>
      <span className={s.labelText}>{text}</span>
    </div>
  );
}

type HeadProps = { num: string; label: string; title: ReactNode; titleId: string; lead?: string };

export function SectionHead({ num, label, title, titleId, lead }: HeadProps) {
  return (
    <div className={s.head} data-reveal-stagger>
      <SectionLabel num={num} text={label} />
      <h2 id={titleId} className={s.h2}>
        {title}
      </h2>
      {lead && <p className={s.lead}>{lead}</p>}
    </div>
  );
}

export function Tags({ items, small, className }: { items: string[]; small?: boolean; className?: string }) {
  return (
    <ul className={cx(s.tags, className)}>
      {items.map((t, i) => (
        <li key={`${t}-${i}`} className={cx(s.tag, small && s.tagSm)}>
          {t}
        </li>
      ))}
    </ul>
  );
}

export function IconTile({ icon, className }: { icon: IconName; className?: string }) {
  return (
    <div className={cx(s.tile, className)}>
      <Icon name={icon} />
    </div>
  );
}
