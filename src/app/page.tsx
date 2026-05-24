import Image from "next/image";
import Link from "next/link";

import { getSiteOrigin } from "@/lib/site-origin";

const CONTACT = {
  phoneE164: "+972504823319",
  phoneDisplay: "050-4823319",
  email: "yefet.smart@gmail.com",
  whatsappHref: "https://wa.me/972504823319",
} as const;

const SERVICE_AREAS = [
  { emoji: "🏥", title: "ביטוח בריאות" },
  { emoji: "🏦", title: "תוכניות פנסיוניות" },
  { emoji: "📈", title: "פיננסים והשקעות" },
  { emoji: "✈️", title: "נסיעות לחול" },
  { emoji: "❤️", title: "ביטוח חיים" },
  { emoji: "🏠", title: "ביטוח אלמנטרי" },
  { emoji: "📁", title: "תיק אישי" },
  { emoji: "🧮", title: "מחשבון חיסכון לילד" },
  { emoji: "🌐", title: "רשתות חברתיות" },
] as const;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const focusRingClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function Home() {
  const site = getSiteOrigin();
  const siteRoot = `${site.origin}/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgent",
    name: "יפת אקוע",
    description:
      "מתכנן פנסיוני ופיננסי המתמחה בתחום הסיכונים, עם רישיון פנסיוני ממשרד האוצר.",
    jobTitle: "סוכן ביטוח ומתכנן פנסיוני",
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    url: siteRoot,
    image: `${site.origin}/images/yefet-akua.png`,
    knowsAbout: SERVICE_AREAS.map((area) => area.title),
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Israel",
    },
  };

  return (
    <div className="relative flex flex-1 flex-col">
      <a
        href="#main"
        className={`absolute top-4 -start-[9999px] z-50 touch-manipulation rounded-md bg-surface px-3 py-2 text-sm font-medium text-foreground shadow focus-visible:start-4 ${focusRingClass}`}
      >
        דלג לתוכן
      </a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-40 border-b border-border-soft bg-background/95 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3 max-[420px]:px-3 sm:px-8">
          <Link
            href="/"
            className={`text-sm font-semibold text-foreground touch-manipulation transition-colors hover:text-brand ${focusRingClass} rounded-sm`}
          >
            יפת אקוע
          </Link>
          <nav
            className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm font-medium text-muted"
            aria-label="ניווט עמוד"
          >
            <Link
              href="#areas"
              className={`touch-manipulation transition-colors hover:text-brand ${focusRingClass} rounded-sm`}
            >
              תחומי פעילות
            </Link>
            <Link
              href="#contact"
              className={`touch-manipulation transition-colors hover:text-brand ${focusRingClass} rounded-sm`}
            >
              צור קשר
            </Link>
          </nav>
        </div>
      </header>

      <main id="main" className="scroll-mt-28 flex flex-1 flex-col sm:scroll-mt-24">
        {/* Hero */}
        <section
          className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-12 max-[420px]:px-3 sm:flex-row sm:items-center sm:gap-14 sm:px-8"
          aria-labelledby="hero-heading"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[min(100%,380px)] overflow-hidden rounded-3xl shadow-lg ring-1 ring-border-soft sm:mx-0 sm:max-w-[320px] sm:flex-shrink-0">
            <Image
              src="/images/yefet-akua.png"
              alt="יפת אקוע, סוכן ביטוח, מתכנן פנסיוני ופיננסי, תמונה מקצועית"
              fill
              className="object-cover object-[center_top]"
              priority
              sizes="(max-width: 640px) 100vw, 320px"
            />
          </div>
          <div className="flex flex-col gap-5 text-center sm:grow sm:text-start">
            <p className="text-sm font-medium text-brand">
              מתכנן פנסיוני ופיננסי • רישיון פנסיוני מטעם משרד האוצר
            </p>
            <h1
              id="hero-heading"
              className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              יפת אקוע
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-muted">
              מתכנן פנסיוני ופיננסי ומתמחה בתחום הסיכונים, בעל תואר ראשון במימון
              ומנהל עסקים ובעל רישיון פנסיוני מטעם משרד האוצר.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-start">
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-12 min-h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#1ebe57] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                שלחו ווצאפ
              </a>
              <a
                href={`tel:${CONTACT.phoneE164}`}
                className={`inline-flex h-12 min-h-12 items-center justify-center rounded-full border border-border-soft bg-surface px-6 text-base font-semibold text-foreground shadow-sm transition-colors hover:border-brand hover:text-brand touch-manipulation ${focusRingClass}`}
              >
                התקשרו: {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* תחומי פעילות */}
        <section
          id="areas"
          className="scroll-mt-28 border-t border-border-soft bg-surface px-4 py-14 max-[420px]:px-3 sm:scroll-mt-24 sm:px-8"
          aria-labelledby="areas-heading"
        >
          <div className="mx-auto max-w-4xl">
            <h2
              id="areas-heading"
              className="text-center text-2xl font-bold text-foreground sm:text-start sm:text-3xl"
            >
              תחומי פעילות
            </h2>
            <p className="mt-2 text-center text-muted sm:text-start">
              ליווי והתאמת מוצרים בגישה אישית — לכל תחום אפשר לשוחח עם יפת
              ישירות בווטסאפ או בטלפון.
            </p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_AREAS.map(({ emoji, title }) => (
                <li
                  key={title}
                  className="flex items-center gap-4 rounded-2xl border border-border-soft bg-background p-5 shadow-sm"
                >
                  <span className="text-3xl" aria-hidden>
                    {emoji}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-foreground">
                      {title}
                    </h3>
                    {title === "רשתות חברתיות" && (
                      <p className="mt-1 text-sm text-muted">
                        ניתן להעביר קישורים לפרופילים בתיאום עם הסוכן.
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* צור קשר */}
        <section
          id="contact"
          className="mx-auto w-full max-w-4xl scroll-mt-28 px-4 py-14 max-[420px]:px-3 sm:scroll-mt-24 sm:px-8"
          aria-labelledby="contact-heading"
        >
          <h2
            id="contact-heading"
            className="text-2xl font-bold text-foreground sm:text-3xl"
          >
            צור קשר
          </h2>
          <p className="mt-2 max-w-xl text-muted">
            בחרו בדרך הנוחה לכם: הודעה בווטסאפ, שיחה, מייל או שמירת פרטי הסוכן
            באנשי הקשר.
          </p>
          <dl className="mt-8 space-y-4 text-lg">
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <dt className="font-semibold text-foreground shrink-0">טלפון</dt>
              <dd>
                <a
                  href={`tel:${CONTACT.phoneE164}`}
                  className={`text-brand underline decoration-brand/35 underline-offset-4 hover:decoration-brand ${focusRingClass} rounded-sm touch-manipulation`}
                >
                  {CONTACT.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <dt className="font-semibold text-foreground shrink-0">
                דוא״ל
              </dt>
              <dd className="min-w-0 break-all">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className={`text-brand underline decoration-brand/35 underline-offset-4 hover:decoration-brand ${focusRingClass} rounded-sm touch-manipulation`}
                >
                  {CONTACT.email}
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-12 min-h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#1ebe57] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                שליחת הודעה בווצאפ
              </a>
            <a
              href="/contact/yefet-akua.vcf"
              download="yefet-akua.vcf"
              className={`inline-flex h-12 min-h-12 items-center justify-center rounded-full border border-border-soft bg-surface px-6 text-base font-semibold text-foreground shadow-sm transition-colors hover:border-brand hover:text-brand touch-manipulation ${focusRingClass}`}
            >
              שמירה לאנשי הקשר (קובץ .vcf)
            </a>
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-border-soft bg-surface px-4 py-8 pb-[max(2rem,calc(env(safe-area-inset-bottom,0px)+1.5rem))] text-center text-sm text-muted sm:px-8">
        <p>© {new Date().getFullYear()} יפת אקוע. כל הזכויות שמורות.</p>
        <p className="mt-2 max-w-2xl mx-auto leading-relaxed">
          המידע באתר אינו מהווה ייעוץ פנסיוני, משפטי או השקעות אישי; לקבלת
          החלטות מושכלות פנו לסוכן.
        </p>
      </footer>
    </div>
  );
}
