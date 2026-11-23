import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { areas } from "@/content/areas";
import { getAllArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/site.config";
import { MinimalistHero } from "@/components/ui/minimalist-hero";
import { MobileMenu } from "@/components/MobileMenu";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { navItems, areaSlugMap } from "@/components/Header";
import { getPathname } from "@/i18n/navigation";
import { ContactBand } from "@/components/ContactBand";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, title: t("homeTitle"), description: t("homeDescription"), hrefs: { tr: "/", en: "/" }, absoluteTitle: true });
}

export default async function Home({ params }: Props) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const nav = await getTranslations("nav");
  const slugs = areaSlugMap();
  const a = await getTranslations("areas");
  const art = await getTranslations("articles");
  const approach = (await getTranslations()).raw("approach") as { title: string; text: string }[];
  const articles = getAllArticles().slice(0, 3);

  return (
    <>
      <MinimalistHero
        className="h-auto min-h-svh"
        logoText="aek."
        logoHref={getPathname({ href: "/", locale })}
        navLinks={navItems.map((n) => ({ label: nav(n.key).toLocaleUpperCase(locale), href: getPathname({ href: n.href, locale }) }))}
        actions={<LocaleSwitcher areaSlugs={slugs} className="rounded-full border border-foreground/20 px-3 py-1 text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:border-foreground hover:text-foreground" />}
        menu={
          <MobileMenu
            items={navItems.map((n) => ({ href: n.href, label: nav(n.key) }))}
            labels={{ menu: nav("menu"), close: nav("close"), primary: nav("primary"), appointment: nav("appointment") }}
            switcher={<LocaleSwitcher areaSlugs={slugs} className="text-small text-ink-muted" />}
          />
        }
        mainText={t("lead")}
        readMoreLink={getPathname({ href: "/hakkimda", locale })}
        readMoreLabel={t("heroReadMore")}
        imageSrc="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&h=900&q=75"
        imageAlt={t("heroImageAlt")}
        imageClassName="aspect-square w-[250px] scale-100 rounded-full grayscale md:w-[330px] lg:w-[410px]"
        overlayText={{ part1: t("heroPart1"), part2: t("heroPart2") }}
        socialLinks={[]}
        locationText={`${site.bar[locale]} · ${site.city}`}
      />

      {/* Çalışma alanları — dizin görünümü */}
      <section aria-labelledby="areas-h" className="wrap py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-12 md:items-end" data-reveal>
          <div className="md:col-span-8">
            <p className="eyebrow">{t("areasEyebrow")}</p>
            <h2 id="areas-h" className="mt-4 max-w-[22ch] text-m-h2 md:text-h2">{t("areasTitle")}</h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/calisma-alanlari" className="link">{t("areasAll")} <span aria-hidden className="arrow">→</span></Link>
          </div>
        </div>
        <ul className="mt-12 border-b border-line-strong md:mt-16">
          {areas.map((ar, i) => (
            <li key={ar.id} data-reveal style={{ transitionDelay: `${i * 50}ms` }}>
              <Link
                href={{ pathname: "/calisma-alanlari/[slug]", params: { slug: ar.slug[locale] } }}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-2 border-t border-line-strong py-7 transition-colors duration-200 hover:bg-gold md:grid-cols-[4rem_minmax(0,22rem)_1fr_auto] md:gap-x-8 md:px-4 md:py-9"
              >
                <span className="text-[1.125rem] font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[1.5rem] leading-tight md:text-h3">{ar.name[locale]}</h3>
                <p className="col-start-2 text-ink-muted md:col-start-auto">{ar.short[locale]}</p>
                <span aria-hidden className="arrow col-start-3 row-start-1 md:col-start-auto md:row-start-auto">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Çalışma yaklaşımı — sabit başlık, numaralı adımlar */}
      <section aria-labelledby="approach-h" className="bg-sand">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32" data-reveal>
              <p className="eyebrow">{t("approachEyebrow")}</p>
              <h2 id="approach-h" className="mt-4 max-w-[22ch] text-m-h2 md:text-h2">{t("approachTitle")}</h2>
            </div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {approach.map((s, i) => (
              <li key={i} className="grid grid-cols-[4.5rem_1fr] gap-4 border-t border-line-strong py-8 first:border-t-0 first:pt-0 md:grid-cols-[6rem_1fr]" data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                <span aria-hidden className="grid size-14 place-items-center rounded-full bg-gold text-[1.75rem] font-extrabold leading-none md:size-20 md:text-[2.5rem]">{i + 1}</span>
                <div>
                  <p className="sr-only">{a("step")} {i + 1}</p>
                  <h3 className="text-h4 md:text-h3">{s.title}</h3>
                  <p className="mt-2 text-ink-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Hakkımda — ortalanmış alıntı */}
      <section aria-labelledby="about-h" className="wrap py-20 text-center md:py-32" data-reveal>
        <p className="eyebrow">{t("aboutEyebrow")}</p>
        <blockquote className="mx-auto mt-8 max-w-[30ch] text-[2rem] font-extrabold leading-[1.1] tracking-[-0.035em] md:text-[3.25rem]">
          “{t("aboutQuote")}”
        </blockquote>
        <span aria-hidden className="mx-auto mt-10 block size-5 rounded-full bg-gold" />
        <h2 id="about-h" className="mt-6 text-h4">Av. Aleyna Elif Karaoğlu</h2>
        <p className="mx-auto mt-4 max-w-[58ch] text-ink-muted">
          {locale === "tr"
            ? "[Hukuk fakültesi] mezunu. [X] yıldır İstanbul Barosu’na kayıtlı olarak aile, yabancılar ve gayrimenkul hukuku başta olmak üzere bireysel uyuşmazlıklarda çalışıyor. Türkçe ve İngilizce görüşme yapıyor."
            : "Graduate of [Law School]. Registered with the Istanbul Bar Association for [X] years, working mainly on family, immigration and real estate matters for individuals. Consultations in English and Turkish."}
        </p>
        <Link href="/hakkimda" className="link mt-8 inline-block">{t("aboutMore")} <span aria-hidden className="arrow">→</span></Link>
      </section>

      {/* Son makaleler — kartlar */}
      <section aria-labelledby="articles-h" className="border-t border-line bg-paper">
        <div className="wrap py-20 md:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
            <div>
              <p className="eyebrow">{t("articlesEyebrow")}</p>
              <h2 id="articles-h" className="mt-4 text-m-h2 md:text-h2">{t("articlesTitle")}</h2>
            </div>
            <Link href="/makaleler" className="link self-start md:self-auto">{t("articlesAll")} <span aria-hidden className="arrow">→</span></Link>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {articles.map((ar, i) => {
              const area = areas.find((x) => x.id === ar.category);
              return (
                <li key={ar.slug} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                  <Link
                    href={{ pathname: "/makaleler/[slug]", params: { slug: ar.slug } }}
                    locale="tr"
                    hrefLang="tr"
                    className="group flex h-full flex-col rounded-[10px] border border-line bg-ivory p-7 transition-colors duration-200 hover:border-ink hover:bg-gold"
                  >
                    <span className="eyebrow">{area?.name[locale]}</span>
                    <span className="mt-5 text-[1.375rem] font-bold leading-snug tracking-[-0.02em]" lang="tr">{ar.title}</span>
                    <span className="mt-auto flex items-center justify-between pt-8 text-small text-ink-muted">
                      {art("readingTime", { minutes: ar.readingMinutes })}
                      <span aria-hidden className="arrow">→</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
