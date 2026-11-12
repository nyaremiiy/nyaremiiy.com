import { getDictionary } from "@/src/i18n";
import { profile } from "@/src/data/profile";
import { projects } from "@/src/data/projects";
import { jobs } from "@/src/data/experience";
import { certificateYears, verifyUrl } from "@/src/data/certificates";
import { skillGroups } from "@/src/data/skills";
import { abs } from "@/src/lib/seo";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-Markdown summary for AI assistants and answer engines (GEO).
 * Built from the same i18n + data files as the page, so it never drifts from the site.
 */
export function GET() {
  const en = getDictionary("en");
  const uk = getDictionary("uk");
  const certs = certificateYears.flatMap((y) => y.items);
  const lines: string[] = [];
  const add = (...l: string[]) => lines.push(...l);

  add(
    `# ${profile.name}`,
    "",
    `> ${en.footer.tagline} ${en.hero.lead}`,
    "",
    `Ukrainian version / Українською: ${abs("/")} · English: ${abs("/en")}`,
    `Status: ${en.hero.status}. ${en.hero.nowText}.`,
    "",
    "## Contact",
    `- Email: ${profile.email}`,
    `- Telegram: ${profile.telegramHandle} (${profile.telegram})`,
    `- Phone: ${profile.phoneDisplay}`,
    `- LinkedIn: ${profile.linkedin}`,
    `- GitHub: ${profile.github}`,
    `- Resume (PDF): ${abs(profile.resume)}`,
    "",
    "## About",
    en.about.lead,
    ...en.about.cards.map((c) => `- ${c.title}: ${c.text}`),
    `- ${en.about.ai}`,
    "",
    "## Skills",
    ...skillGroups.map((g) => `- ${en.skills.groups[g.id].title}: ${en.skills.groups[g.id].tags.join(", ")}`),
    `- ${en.skills.spoken.title}: ${en.skills.spoken.items.map((l) => `${l.name} (${l.level})`).join(", ")}`,
    "",
    "## Experience",
  );
  for (const j of jobs) {
    const job = en.experience.jobs[j.id];
    const meta = "meta" in job ? ` · ${job.meta}` : "";
    const period = "period" in job ? ` · ${job.period}` : "";
    add(`### ${job.role}, ${job.company}${period}${meta}`);
    for (const g of job.groups) add(`- ${g.title}: ${g.items.join("; ")}`);
    if ("project" in job && j.projectUrl) add(`- ${job.project.kicker}: ${job.project.name} (${j.projectUrl})`);
    add(`- Stack: ${job.tags.join(", ")}`, "");
  }

  add("## Projects", en.projects.lead, "");
  for (const p of projects) {
    const it = en.projects.items[p.id];
    add(`### ${it.name}`, `${it.kicker}. ${it.text}`, `- Website: ${p.url}`);
    if (p.github) add(`- Source code: ${p.github}`);
    add(`- Built: ${it.flow.join(" → ")}`, `- Features: ${it.features.join("; ")}`, `- Stack: ${it.tags.join(", ")}`, "");
  }

  add("## Certificates (SoftServe Academy)", en.certificates.lead);
  for (const c of certs) {
    const it = en.certificates.items[c.id];
    add(`- ${it.title} (${it.category}), ${it.date}, ${en.certificates.series} ${c.series} № ${c.number}/${c.year}. Verify: ${verifyUrl(c)}`);
  }

  add(
    "",
    "## Mentoring: programming lessons",
    en.mentoring.lead,
    ...en.mentoring.plans.map((p) => `- ${p.title}: ${p.price} ${p.per}. ${p.text}`),
    `- ${en.mentoring.topicsTitle}: ${en.mentoring.topics.join(", ")}`,
    `- ${en.mentoring.schedule}`,
    `- Sign up: ${abs("/en#contact")} or ${profile.telegram}`,
    "",
    "## Українською (коротко)",
    `${uk.hero.title} ${uk.hero.titleShine}. ${uk.hero.lead}`,
    `${uk.mentoring.title}: ${uk.mentoring.plans.map((p) => `${p.title.toLowerCase()} ${p.price} ${p.per}`).join("; ")}.`,
    `Контакти: ${profile.email}, Telegram ${profile.telegramHandle}, ${profile.phoneDisplay}.`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
