// Usage: node scripts/shoot.mjs <sectionId|full> [width=1440] [outDir]
// Captures the section in light/UA (/) and dark/EN (/en) and, at 1440px,
// builds a side-by-side with the matching crop of the reference PNGs.
import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const [id = "top", widthArg = "1440", outArg] = process.argv.slice(2);
const width = Number(widthArg);
const base = process.env.BASE_URL ?? "http://localhost:3001";
const out = outArg ?? process.env.SHOT_DIR ?? "shots";
const refDir = process.env.REF_DIR; // folder with light.png / dark.png (1233px wide = 1440 * 0.85625)
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "chrome" });
const runs = [
  { theme: "light", url: `${base}/`, ref: "light.png" },
  { theme: "dark", url: `${base}/en`, ref: "dark.png" },
];

for (const r of runs) {
  const ctx = await browser.newContext({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
  await ctx.addInitScript((theme) => localStorage.setItem("nyaremiiy-theme", theme), r.theme);
  const page = await ctx.newPage();
  await page.goto(r.url, { waitUntil: "networkidle" });
  // freeze animations for stable captures and reveal everything
  await page.addStyleTag({
    content: `*,*::before,*::after{animation-play-state:paused!important;animation-delay:0s!important;transition:none!important}
      .js [data-reveal],.js [data-reveal-stagger]>*{opacity:1!important;transform:none!important;translate:none!important;scale:none!important}`,
  });
  await page.evaluate(() => document.fonts.ready);
  // scroll through once so lazy-loaded images (next/image) are fetched
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15000 }).catch(() => {});
  const file = path.join(out, `${id}-${r.theme}-${width}.png`);
  let box;
  if (id === "full") {
    await page.screenshot({ path: file, fullPage: true });
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log(`${r.theme} full height=${h} scrollWidth=${sw} (viewport ${width})`);
    box = { y: 0, height: h };
  } else {
    box = await page.evaluate((sid) => {
      const el = document.getElementById(sid);
      const b = el.getBoundingClientRect();
      return { y: b.top + window.scrollY, height: b.height };
    }, id);
    await page.screenshot({ path: file, fullPage: true, clip: { x: 0, y: box.y, width, height: box.height } });
    console.log(`${r.theme} #${id} y=${Math.round(box.y)} h=${Math.round(box.height)}`);
  }

  if (refDir && width === 1440) {
    const scale = 1233 / 1440;
    const ref = sharp(path.join(refDir, r.ref));
    const meta = await ref.metadata();
    const top = Math.round(box.y * scale);
    const h = Math.min(Math.round(box.height * scale), meta.height - top);
    if (h > 0) {
      const refCrop = await sharp(path.join(refDir, r.ref)).extract({ left: 0, top, width: 1233, height: h }).png().toBuffer();
      const mine = await sharp(file).resize(1233, h, { fit: "fill" }).png().toBuffer();
      await sharp({ create: { width: 1233 * 2 + 12, height: h, channels: 4, background: "#ff00aa" } })
        .composite([
          { input: refCrop, left: 0, top: 0 },
          { input: mine, left: 1233 + 12, top: 0 },
        ])
        .png()
        .toFile(path.join(out, `${id}-${r.theme}-compare.png`));
    }
  }
  await ctx.close();
}
await browser.close();
