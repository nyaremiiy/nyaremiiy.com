# Nazar Yaremiiy: portfolio

Next.js (App Router) + TypeScript, built from the `FullLight.dc.html` / `FullDark.dc.html` design references.
Styling uses CSS Modules and global CSS variables. No UI kits, no Tailwind.

## Run

```bash
npm install
npm run dev        # http://localhost:3001
npm run build && npm start
```

- Ukrainian (default): `/`. English: `/en`.
- Theme: dark by default. The toggle saves the choice in `localStorage` (`nyaremiiy-theme`) and an inline script applies it before first paint, so the page never flashes.
- Set `SITE_URL` (e.g. `https://example.com`) at build time so canonical, hreflang and Open Graph URLs are absolute and correct.

## Images

To add images, put files in /public/images and set the path in src/data/*.ts

- Project screenshots: `image` per project in `src/data/projects.ts`, e.g. `"/images/komar.jpg"`, plus `imageSize: [width, height]` (shown whole, at its own aspect ratio, inside the browser frame).

When the field is empty, the design's placeholder is shown instead.

Resume: `public/cv/Nazar_Yaremiiy_Resume.pdf`. To replace it, swap the file or change `resume` in `src/data/profile.ts`.
The About section shows its first page from `public/resume/preview-{352,528,704,1056}.webp` (rendered straight
from the PDF at each width, so the small text stays sharp) with a "PDF · N" badge (`resumePages`).
When the PDF changes, re-render page 1 at those widths.

## Content

- All copy: `src/i18n/uk.json` and `src/i18n/en.json` (same shape, copied verbatim from the design HTML).
- Structure, links, icons and order: `src/data/profile.ts`, `projects.ts`, `experience.ts`, `skills.ts`, `certificates.ts`.

## Contact form

- Required: **name** and **at least one of** phone or email/Telegram. The message is optional.
  The same rules run in the browser and on the server (`src/lib/contact.ts`).
- After sending, a pop-up toast confirms success or reports an error.
- `POST /api/contact` returns 200, 422 with field errors, or 429 after 5 submissions per IP in 10 minutes.
  A hidden honeypot field silently drops bot submissions.
- Submissions are appended to **`data/submissions.jsonl`** (one JSON object per line: id, date, locale, name,
  phone, contact, message, user agent). The folder is git-ignored. Override the path with `SUBMISSIONS_FILE`.
  Note: this needs a server with a persistent disk (`npm start` on a VPS). It won't persist on serverless hosting.
- Telegram bot: add it in `saveSubmission()` in `src/lib/submissions.ts` (marked `TODO(telegram)`).

## Visual QA scripts

```bash
# side-by-side with the reference PNGs (light.png / dark.png in REF_DIR)
BASE_URL=http://localhost:3001 REF_DIR=path/to/refs node scripts/shoot.mjs projects 1440 out/
# element-box diff against the design HTML rendered in the same browser
node scripts/measure.mjs path/to/FullLight.dc.html http://localhost:3001/ '[["cards","#skills .glass","#skills [class*=card]"]]'
```
