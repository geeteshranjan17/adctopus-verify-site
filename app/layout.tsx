// app/layout.tsx
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

import {
  COMPANY_LEGAL_NAME,
  DOMAIN,
  SUPPORT_EMAIL,
  BUSINESS_ADDRESS,
  COUNTRY_JURISDICTION,
  META_DOMAIN_VERIFICATION,
  PHONE,
} from "@/lib/constants";

// Safe string coercions (avoid rendering objects)
const COMPANY_NAME_TEXT =
  typeof COMPANY_LEGAL_NAME === "string" ? COMPANY_LEGAL_NAME : String(COMPANY_LEGAL_NAME ?? "");
const DOMAIN_TEXT = typeof DOMAIN === "string" ? DOMAIN : String(DOMAIN ?? "");
const SUPPORT_EMAIL_TEXT =
  typeof SUPPORT_EMAIL === "string" ? SUPPORT_EMAIL : String(SUPPORT_EMAIL ?? "");
const PHONE_TEXT = typeof PHONE === "string" ? PHONE : String(PHONE ?? "");
const telHref = `tel:+91${PHONE_TEXT.replace(/\D+/g, "")}`;
const ADDRESS_TEXT =
  typeof BUSINESS_ADDRESS === "string"
    ? BUSINESS_ADDRESS
    : BUSINESS_ADDRESS && typeof BUSINESS_ADDRESS === "object"
    ? [
        (BUSINESS_ADDRESS as any).line1,
        (BUSINESS_ADDRESS as any).line2,
        (BUSINESS_ADDRESS as any).city,
        (BUSINESS_ADDRESS as any).state,
        (BUSINESS_ADDRESS as any).postalCode,
      ]
        .filter(Boolean)
        .join(", ")
    : String(BUSINESS_ADDRESS ?? "");
const JURIS_TEXT =
  typeof COUNTRY_JURISDICTION === "string"
    ? COUNTRY_JURISDICTION
    : String(COUNTRY_JURISDICTION ?? "");

export const metadata: Metadata = {
  metadataBase: DOMAIN_TEXT.startsWith("http") ? new URL(DOMAIN_TEXT) : undefined,
  title: "Coming Soon",
  description: "Official website — coming soon.",
  alternates: { canonical: DOMAIN_TEXT || "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Coming Soon",
    description: "Official website — coming soon.",
    url: DOMAIN_TEXT || "/",
    siteName: COMPANY_NAME_TEXT || "Company",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Website" }],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coming Soon",
    description: "Official website — coming soon.",
    images: ["/og-image.png"],
  },
  icons: { icon: [{ url: "/favicon.ico" }] },
  other: { "facebook-domain-verification": String(META_DOMAIN_VERIFICATION ?? "") },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B1220",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-[#0B1220] text-white antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-black focus:px-3 focus:py-2"
        >
          Skip to content
        </a>

        {/* Background */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-40 opacity-30"
          style={{
            background:
              "repeating-radial-gradient(circle at 50% -10%, rgba(56,255,195,0.08) 0px, rgba(56,255,195,0.08) 2px, transparent 2px, transparent 80px)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-30 animate-[rings_28s_linear_infinite]"
          style={{
            background:
              "repeating-radial-gradient(circle at 50% -10%, rgba(255,59,127,0.06) 0px, rgba(255,59,127,0.06) 2px, transparent 2px, transparent 120px)",
          }}
        />
        <div className="pointer-events-none fixed inset-0 -z-10 backdrop-blur-[6px]" />

        {/* Header (logo OK to keep here) */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/20">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2" aria-label="Home">
              <img src="/logo.png" alt="Company logo" className="h-7 w-7" />
            </Link>

            <nav className="flex gap-6 text-sm text-white/85">
              <Link href="/privacy" className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60">Privacy</Link>
              <Link href="/terms" className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60">Terms</Link>
              <Link href="/data-deletion" className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60">Data Deletion</Link>
              <Link href="/contact" className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60">Contact</Link>
            </nav>
          </div>
        </header>

        <main id="content" className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        {/* Footer (logo removed; 2 columns so Contact sits left) */}
        <footer className="border-t border-white/10 bg-black/50 backdrop-blur">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-semibold">Contact</h4>
              <ul className="space-y-1 text-sm text-white/90">
                <li>Email: <a className="underline" href={`mailto:${SUPPORT_EMAIL_TEXT}`}>{SUPPORT_EMAIL_TEXT}</a></li>
                <li>Phone: <a className="underline" href={telHref}>+91 {PHONE_TEXT}</a></li>
                <li><Link className="underline" href="/contact">Contact page</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-semibold">Address</h4>
              <address className="not-italic text-sm text-white/85 leading-6">
                {ADDRESS_TEXT}<br />
                {JURIS_TEXT}
              </address>
            </div>
          </div>

          <div className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-white/65">
              © {new Date().getFullYear()} {COMPANY_NAME_TEXT}. All rights reserved.
            </div>
          </div>
        </footer>

        {/* Organization JSON-LD (legal details only) */}
        <Script id="org-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: COMPANY_NAME_TEXT,
            url: DOMAIN_TEXT || "/",
            logo: `${DOMAIN_TEXT || ""}/logo.png`,
            email: SUPPORT_EMAIL_TEXT,
            telephone: `+91 ${PHONE_TEXT}`,
            address: {
              "@type": "PostalAddress",
              streetAddress: ADDRESS_TEXT,
              addressCountry: JURIS_TEXT,
            },
          })}
        </Script>
      </body>
    </html>
  );
}
