import { getDictionary, type Locale } from "@/src/i18n";
import { buildJsonLd } from "@/src/lib/seo";
import { Header } from "./header/Header";
import { RevealObserver } from "./RevealObserver";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Certificates } from "./sections/Certificates";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Mentoring } from "./sections/Mentoring";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import s from "./Portfolio.module.css";

export function Portfolio({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <>
      <script
        type="application/ld+json"
        // escape "<" so the JSON can never close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(locale)).replace(/</g, "\\u003c") }}
      />
      <a href="#main" className="skip-link">
        {t.ui.skip}
      </a>
      <Header locale={locale} t={t} />
      {/* One continuous background (grid + section blobs). Only this root clips. */}
      <div className={s.page}>
        <Hero t={t} />
        <About t={t} />
        <Skills t={t} />
        <Certificates t={t} />
        <Experience t={t} />
        <Projects t={t} />
        <Mentoring t={t} />
        <Contact t={t} locale={locale} />
        <Footer t={t} locale={locale} />
      </div>
      <RevealObserver />
    </>
  );
}
