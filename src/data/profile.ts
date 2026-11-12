export const profile = {
  name: "Nazar Yaremiiy",
  /** Resume PDF in /public/cv. Used by every "Resume / Download resume" button. */
  resume: "/cv/Nazar_Yaremiiy_Resume.pdf",
  /** Number of pages in the resume, shown on the "PDF · N" badge in About. */
  resumePages: 2,
  /**
   * First page of the resume shown in About. Rendered straight from the PDF at the
   * exact on-screen width (350 CSS px) for each pixel density, as lossless WebP, so the
   * tiny text is never rescaled or re-compressed. Files: /public/resume/preview-<width>.webp.
   * Regenerate them when the PDF changes.
   */
  resumePreview: {
    src: (w: number) => `/resume/preview-${w}.webp`,
    /** [file width, device pixel ratio] — 350 × DPR */
    densities: [
      [350, 1],
      [438, 1.25],
      [525, 1.5],
      [613, 1.75],
      [700, 2],
      [875, 2.5],
      [1050, 3],
    ] as [number, number][],
    size: [350, 496] as [number, number],
  },
  email: "nazar.yaremiiy@gmail.com",
  phone: "+380989927765",
  phoneDisplay: "+38 098 992 77 65",
  telegram: "https://t.me/nyaremiiy",
  telegramHandle: "@nyaremiiy",
  linkedin: "https://www.linkedin.com/in/nyaremiiy/",
  linkedinHandle: "in/nyaremiiy",
  github: "https://github.com/nyaremiiy",
  githubHandle: "nyaremiiy",
} as const;

/** Public site URL, used for canonical / Open Graph URLs. Override with SITE_URL. */
export const siteUrl = process.env.SITE_URL ?? "https://nyaremiiy.github.io";
