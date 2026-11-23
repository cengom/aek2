import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MobileMenu } from "./MobileMenu";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { areas } from "@/content/areas";
import { site } from "@/site.config";

export const navItems = [
  { href: "/calisma-alanlari", key: "areas" },
  { href: "/hakkimda", key: "about" },
  { href: "/makaleler", key: "articles" },
  { href: "/sss", key: "faq" },
  { href: "/iletisim", key: "contact" },
] as const;

export function areaSlugMap() {
  const m: Record<string, { tr: string; en: string }> = {};
  for (const a of areas) {
    m[a.slug.tr] = a.slug;
    m[a.slug.en] = a.slug;
  }
  return m;
}

export async function Header() {
  const t = await getTranslations("nav");
  const slugs = areaSlugMap();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/90 text-ink backdrop-blur-md">
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
        <Link href="/" className="flex items-center gap-3 leading-none" aria-label={`${site.title} — ${t("home")}`}>
          <span aria-hidden className="size-4 rounded-full bg-gold" />
          <span className="whitespace-nowrap text-xl font-bold tracking-wider">aek.</span>
          <span className="hidden whitespace-nowrap text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ink-muted sm:inline">Av. Aleyna Elif Karaoğlu</span>
        </Link>

        <nav aria-label={t("primary")} className="hidden lg:block">
          <ul className="flex items-center gap-7 whitespace-nowrap text-sm font-medium uppercase tracking-widest xl:gap-9">
            {navItems.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="py-2 text-ink/60 transition-colors duration-200 hover:text-ink">
                  {t(n.key)}
                </Link>
              </li>
            ))}
            <li>
              <LocaleSwitcher areaSlugs={slugs} className="rounded-full border border-ink/20 px-3 py-1.5 text-ink/70 transition-colors hover:border-ink hover:text-ink" />
            </li>
          </ul>
        </nav>

        <MobileMenu
          items={navItems.map((n) => ({ href: n.href, label: t(n.key) }))}
          labels={{ menu: t("menu"), close: t("close"), primary: t("primary"), appointment: t("appointment") }}
          switcher={<LocaleSwitcher areaSlugs={slugs} className="text-small text-ink-muted" />}
        />
      </div>
    </header>
  );
}
