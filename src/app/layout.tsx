import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";

import { getSiteOrigin } from "@/lib/site-origin";

import "./globals.css";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
  display: "swap",
});

const site = getSiteOrigin();

const TITLE_DEFAULT =
  "יפת אקוע — סוכן ביטוח, פנסיה ופיננסים";

const SITE_DESCRIPTION =
  "מתכנן פנסיוני ופיננסי המתמחה בתחום הסיכונים. תואר ראשון במימון ומנהל עסקים ורישיון פנסיוני ממשרד האוצר. ייעוץ בביטוח, פנסיה, השקעות ונסיעות לחול — צרו קשר בטלפון או ווטסאפ.";

export const metadata: Metadata = {
  metadataBase: site,
  title: {
    default: TITLE_DEFAULT,
    template: "%s | יפת אקוע",
  },
  description: SITE_DESCRIPTION,
  applicationName: "יפת אקוע",
  keywords: [
    "יפת אקוע",
    "ביטוח חיים",
    "ביטוח בריאות",
    "פנסיה",
    "תוכניות פנסיוניות",
    "מתכנן פנסיוני",
    "מתכנן פיננסי",
    "ביטוח אלמנטרי",
    "נסיעות לחול",
    "השקעות",
    "תיק אישי",
  ],
  authors: [{ name: "יפת אקוע" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "/",
    siteName: TITLE_DEFAULT,
    title: TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/yefet-akua.png",
        width: 800,
        height: 1000,
        alt: "יפת אקוע, סוכן ביטוח ומתכנן פנסיוני",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    images: ["/images/yefet-akua.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#3d4554",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full min-h-[100dvh] flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
