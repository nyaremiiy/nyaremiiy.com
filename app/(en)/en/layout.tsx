import type { ReactNode } from "react";
import { RootDocument } from "@/src/components/RootDocument";
import { buildMetadata } from "@/src/lib/metadata";

export const metadata = buildMetadata("en");
export { viewport } from "@/src/lib/metadata";

export default function EnLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
