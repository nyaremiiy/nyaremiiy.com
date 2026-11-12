import type { IconName } from "@/src/components/Icon";
import type { Dictionary } from "@/src/i18n";

export type SkillGroupId = keyof Dictionary["skills"]["groups"];

/** Order, icon and column span (of 4) for each card in the Skills grid. Text lives in i18n. */
export const skillGroups: { id: SkillGroupId; icon: IconName; span: 1 | 2 }[] = [
  { id: "languages", icon: "code", span: 2 },
  { id: "frontend", icon: "code", span: 2 },
  { id: "styling", icon: "pen", span: 1 },
  { id: "backend", icon: "server", span: 1 },
  { id: "databases", icon: "database", span: 1 },
  { id: "mobile", icon: "mobile", span: 1 },
  { id: "devops", icon: "server", span: 2 },
  { id: "tools", icon: "grid", span: 1 },
  { id: "cms", icon: "grid", span: 1 },
  { id: "design", icon: "pen", span: 1 },
  { id: "seo", icon: "search", span: 1 },
  { id: "ai", icon: "bot", span: 1 },
  { id: "other", icon: "spark", span: 1 },
];

/** Spoken languages: filled segments out of 5 (same order as i18n skills.spoken.items). */
export const spokenLevels = [5, 3];
