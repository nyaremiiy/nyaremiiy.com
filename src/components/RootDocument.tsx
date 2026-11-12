import type { ReactNode } from "react";
import { htmlLang, type Locale } from "@/src/i18n";
import { fontVariables } from "@/src/lib/fonts";
import "@/src/styles/globals.css";

/**
 * Runs before first paint: applies the saved theme (dark by default) and
 * marks JS as available so scroll-reveal styles may hide content.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('nyaremiiy-theme');if(t==='dark'||t==='light'){d.setAttribute('data-theme',t)}}catch(e){}})();`;

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={htmlLang[locale]} data-theme="dark" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
