import { getDictionary, type Locale } from "@/src/i18n";
import { profile, siteUrl } from "@/src/data/profile";
import { projects } from "@/src/data/projects";
import { jobs } from "@/src/data/experience";
import { certificateYears, verifyUrl } from "@/src/data/certificates";
import { skillGroups } from "@/src/data/skills";
import { mentoringPlans } from "@/src/data/mentoring";

/** Absolute URL for a path on this site. */
export const abs = (path: string) => new URL(path, siteUrl).toString();
export const pagePath = (locale: Locale) => (locale === "uk" ? "/" : "/en");

/** Every skill tag once, in page order (for `knowsAbout`). */
export function allSkills(locale: Locale) {
  const t = getDictionary(locale);
  return [...new Set(skillGroups.flatMap((g) => t.skills.groups[g.id].tags))];
}

/**
 * schema.org graph for the page: who the person is, what they built, their
 * credentials and what they offer. Read by search engines and AI assistants.
 */
export function buildJsonLd(locale: Locale) {
  const t = getDictionary(locale);
  const url = abs(pagePath(locale));
  const personId = abs("/#person");
  const lang = locale === "uk" ? "uk-UA" : "en";

  const certs = certificateYears.flatMap((y) => y.items);

  const person = {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    alternateName: profile.alternateNames,
    givenName: "Nazar",
    familyName: "Yaremiiy",
    jobTitle: "Software Engineer",
    description: t.footer.tagline,
    url,
    image: abs("/og.png"),
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    sameAs: [profile.linkedin, profile.github, profile.telegram],
    knowsLanguage: ["uk", "en"],
    knowsAbout: allSkills(locale),
    worksFor: { "@type": "Organization", name: "INIT Energy", url: "https://init.energy/" },
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Engineer",
      skills: allSkills(locale).join(", "),
    },
    hasCredential: certs.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: t.certificates.items[c.id].title,
      credentialCategory: "certificate",
      dateCreated: c.date,
      identifier: `${c.series} № ${c.number}/${c.year}`,
      url: verifyUrl(c),
      recognizedBy: { "@type": "Organization", name: "SoftServe Academy", url: "https://career.softserveinc.com/" },
    })),
    makesOffer: mentoringPlans.map((plan, i) => ({
      "@type": "Offer",
      name: `${t.mentoring.title}: ${t.mentoring.plans[i].title}`,
      description: t.mentoring.plans[i].text,
      price: plan.price,
      priceCurrency: plan.currency,
      url: `${url}#mentoring`,
      itemOffered: {
        "@type": "Service",
        name: t.mentoring.title,
        serviceType: "Programming lessons",
        description: t.mentoring.lead,
        provider: { "@id": personId },
      },
    })),
  };

  const work = projects.map((p) => {
    const it = t.projects.items[p.id];
    return {
      "@type": "CreativeWork",
      "@id": abs(`/#project-${p.id}`),
      name: it.name,
      description: it.text,
      url: p.url,
      ...(p.github ? { codeRepository: p.github } : {}),
      ...(p.image ? { image: abs(p.image) } : {}),
      keywords: it.tags.join(", "),
      creator: { "@id": personId },
      inLanguage: lang,
    };
  });

  const experience = jobs.map((j) => {
    const job = t.experience.jobs[j.id];
    return {
      "@type": "EmployeeRole",
      roleName: job.role,
      ...(j.start ? { startDate: j.start } : {}),
      ...(j.end ? { endDate: j.end } : {}),
      worksFor: { "@type": "Organization", name: job.company, ...(j.orgUrl ? { url: j.orgUrl } : {}) },
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": abs("/#website"),
        url: abs("/"),
        name: profile.name,
        alternateName: profile.alternateNames,
        inLanguage: ["uk-UA", "en"],
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#page`,
        url,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: lang,
        isPartOf: { "@id": abs("/#website") },
        mainEntity: { "@id": personId },
        hasPart: work.map((w) => ({ "@id": w["@id"] })),
      },
      person,
      ...work,
      {
        "@type": "ItemList",
        name: t.experience.title,
        itemListElement: experience.map((e, i) => ({ "@type": "ListItem", position: i + 1, item: e })),
      },
    ],
  };
}
