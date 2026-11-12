import type { IconName } from "@/src/components/Icon";
import type { Dictionary } from "@/src/i18n";

export type CertificateId = keyof Dictionary["certificates"]["items"];

export type Certificate = {
  id: CertificateId;
  icon: IconName;
  series: string;
  number: string;
  year: number;
  /** Issue date, ISO 8601 (for <time> and structured data). */
  date: string;
};

export function verifyUrl(c: Certificate) {
  return `https://career.softserveinc.com/en-us/certification/verification?series=${c.series}&number=${c.number}&year=${c.year}`;
}

export const certificateYears: { year: 2026 | 2025; items: Certificate[] }[] = [
  {
    year: 2026,
    items: [
      { id: "node", icon: "server", series: "MA", number: "31165", year: 2026, date: "2026-08-07" },
      { id: "rn", icon: "code", series: "FD", number: "30134", year: 2026, date: "2026-05-15" },
      { id: "react", icon: "code", series: "YX", number: "28480", year: 2026, date: "2026-02-20" },
    ],
  },
  {
    year: 2025,
    items: [
      { id: "db", icon: "grid", series: "NT", number: "27026", year: 2025, date: "2025-09-26" },
      { id: "devops", icon: "server", series: "PW", number: "25926", year: 2025, date: "2025-08-22" },
      { id: "jsts", icon: "code", series: "RK", number: "23689", year: 2025, date: "2025-04-11" },
      { id: "frontend", icon: "pen", series: "CY", number: "22988", year: 2025, date: "2025-01-31" },
    ],
  },
];
