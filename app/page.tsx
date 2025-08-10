import type { Metadata } from "next";
import Script from "next/script";
import { PRODUCT_BRAND_NAME, DOMAIN } from "@/lib/constants";
import ParticleOrbit from "./components/ParticleOrbit";

export const metadata: Metadata = {
  title: `${PRODUCT_BRAND_NAME} — Coming Soon`,
  description: `${PRODUCT_BRAND_NAME} is a modern SaaS product. Coming soon.`,
  alternates: { canonical: `${DOMAIN}/` },
  openGraph: {
    title: `${PRODUCT_BRAND_NAME} — Coming Soon`,
    description: `${PRODUCT_BRAND_NAME} is a modern SaaS product. Coming soon.`,
    url: `${DOMAIN}/`,
    siteName: PRODUCT_BRAND_NAME,
    images: [{ url: `${DOMAIN}/og-image.png`, width: 1200, height: 630, alt: `${PRODUCT_BRAND_NAME} — Open Graph` }],
    type: "website"
  }
};

export default function HomePage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "COMPANY_LEGAL_NAME",
    url: "DOMAIN",
    sameAs: [
      "https://twitter.com/PRODUCT_BRAND_NAME",
      "https://www.linkedin.com/company/PRODUCT_BRAND_NAME"
    ],
    logo: "DOMAIN/og-image.png"
  };

  return (
    <>
      <Script id="org-json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">{PRODUCT_BRAND_NAME}</h1>
        <div className="mt-6 flex flex-col items-center">
          <ParticleOrbit size={280} />
          <div className="mt-4 text-xl font-semibold tracking-wide">Coming Soon</div>
        </div>
        <div className="mt-8">
          <a href="/contact" className="inline-flex items-center rounded-md border px-5 py-2 text-sm font-medium hover:bg-sand">
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}