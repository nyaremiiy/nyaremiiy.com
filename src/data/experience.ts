import type { IconName } from "@/src/components/Icon";
import type { Dictionary } from "@/src/i18n";

export type JobId = keyof Dictionary["experience"]["jobs"];

export type Job = {
  id: JobId;
  groupIcons: IconName[];
  projectUrl?: string;
  /** Employer site (structured data). */
  orgUrl?: string;
  /** ISO year-month (for <time> and structured data). `end` absent = current job. */
  start?: string;
  end?: string;
};

/** Order of jobs, the icon of each responsibility group, links and dates. Text lives in i18n. */
export const jobs: Job[] = [
  { id: "init", groupIcons: ["code", "grid", "server", "pen"], projectUrl: "https://init.energy/", orgUrl: "https://init.energy/", start: "2025-09" },
  { id: "komar", groupIcons: ["code", "lock"], projectUrl: "https://komar.company/", orgUrl: "https://komar.company/" },
  { id: "hackit", groupIcons: ["teach", "spark"], start: "2023-12", end: "2024-06" },
];
