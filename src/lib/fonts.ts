import { JetBrains_Mono, Manrope, Unbounded } from "next/font/google";

export const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

// only 700 is used. Not preloaded: the LCP text is Manrope, so this must not compete for bandwidth.
export const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
  variable: "--font-unbounded",
  display: "swap",
  preload: false,
});

// 600/700 are used by mono labels in the design (status pill, project kickers).
export const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const fontVariables = `${manrope.variable} ${unbounded.variable} ${jetbrains.variable}`;
