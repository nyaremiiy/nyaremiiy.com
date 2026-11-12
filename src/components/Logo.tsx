import s from "./Logo.module.css";

type Props = { label: string; size?: "md" | "lg"; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void };

/** "{ Nazar / Yaremiiy }" — JetBrains Mono, braces at weight 300. */
export function Logo({ label, size = "md", onClick }: Props) {
  return (
    <a href="#top" title={label} className={`${s.logo} ${size === "lg" ? s.lg : ""}`} onClick={onClick}>
      <span aria-hidden="true" className={s.brace}>
        {"{"}
      </span>
      <span className={s.name}>
        <span>Nazar</span> <span>Yaremiiy</span>
      </span>
      <span aria-hidden="true" className={s.brace}>
        {"}"}
      </span>
    </a>
  );
}
