// Compare element boxes between the design HTML (rendered from disk) and the app.
// Usage: node scripts/measure.mjs <designHtmlPath> <appUrl> <selectorJson>
// selectorJson: [["label","designSelector","appSelector"], ...]
import { chromium } from "playwright";
import { pathToFileURL } from "node:url";

const [designPath, appUrl, selJson, widthArg = "1440"] = process.argv.slice(2);
const sels = JSON.parse(selJson);
const width = Number(widthArg);
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "chrome" });

async function boxes(url, idx, theme) {
  const ctx = await browser.newContext({ viewport: { width, height: 1000 } });
  if (theme) await ctx.addInitScript((t) => localStorage.setItem("nyaremiiy-theme", t), theme);
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: `*{animation:none!important;transition:none!important}.js [data-reveal],.js [data-reveal-stagger]>*{opacity:1!important;transform:none!important;translate:none!important;scale:none!important}` });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const res = await page.evaluate(
    ({ sels, idx }) =>
      sels.map((s) => {
        const els = document.querySelectorAll(s[idx]);
        return Array.from(els)
          .slice(0, 6)
          .map((el) => {
            const b = el.getBoundingClientRect();
            return `${Math.round(b.x)},${Math.round(b.y + scrollY)} ${Math.round(b.width * 10) / 10}x${Math.round(b.height * 10) / 10}`;
          });
      }),
    { sels, idx },
  );
  await ctx.close();
  return res;
}

const d = await boxes(pathToFileURL(designPath).href, 1);
const a = await boxes(appUrl, 2, appUrl.includes("/en") ? "dark" : "light");
sels.forEach((s, i) => {
  console.log(`== ${s[0]}`);
  console.log("  design:", d[i].join(" | "));
  console.log("  app:   ", a[i].join(" | "));
});
await browser.close();
