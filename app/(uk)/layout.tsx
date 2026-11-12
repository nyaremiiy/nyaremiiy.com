import type { ReactNode } from "react";
import { RootDocument } from "@/src/components/RootDocument";
import { buildMetadata } from "@/src/lib/metadata";

export const metadata = buildMetadata("uk");
export { viewport } from "@/src/lib/metadata";

export default function UkLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="uk">{children}</RootDocument>;
}
