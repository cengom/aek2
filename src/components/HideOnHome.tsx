"use client";
import { usePathname } from "next/navigation";

/** Ana sayfada MinimalistHero kendi üst menüsünü getirdiği için genel üst menüyü gizler. */
export function HideOnHome({ children }: { children: React.ReactNode }) {
  const p = usePathname();
  if (p === "/" || p === "/en" || p === "/tr") return null;
  return <>{children}</>;
}
