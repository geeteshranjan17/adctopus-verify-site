// app/privacy/page.tsx
import {
  PRODUCT_BRAND_NAME,
  COMPANY_LEGAL_NAME,
  SUPPORT_EMAIL,
  BUSINESS_ADDRESS,
  COUNTRY_JURISDICTION,
} from "@/lib/constants";

export const metadata = {
  title: "Privacy Policy — Adctopus",
  description: "Our commitment to your privacy and how we handle data.",
};
export const viewport = { themeColor: "#0B1220" };

const BRAND =
  typeof PRODUCT_BRAND_NAME === "string"
    ? PRODUCT_BRAND_NAME.charAt(0).toUpperCase() + PRODUCT_BRAND_NAME.slice(1)
    : String(PRODUCT_BRAND_NAME ?? "");
const COMPANY_NAME_TEXT =
  typeof COMPANY_LEGAL_NAME === "string" ? COMPANY_LEGAL_NAME : String(COMPANY_LEGAL_NAME ?? "");
const SUPPORT_EMAIL_TEXT =
  typeof SUPPORT_EMAIL === "string" ? SUPPORT_EMAIL : String(SUPPORT_EMAIL ?? "");
const JURIS_TEXT =
  typeof COUNTRY_JURISDICTION === "string" ? COUNTRY_JURISDICTION : String(COUNTRY_JURISDICTION ?? "");
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
      ].filter(Boolean).join(", ")
    : String(BUSINESS_ADDRESS ?? "");

export default function PrivacyPage() {
  const lastUpdated = new Date().toISOString().slice(0, 10);

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <header className="mb-6">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-white/70">Last updated: {lastUpdated}</p>
      </header>

      <section className="space-y-4 text-white/90">
        <p>
          This Privacy Policy explains how {COMPANY_NAME_TEXT} (“we”, “us”, “our”) collects,
          uses, and shares information in connection with {BRAND}. This page is for general
          information and is not legal advice.
        </p>

        <h2 className="pt-6 text-xl font-semibold text-white">Contact Us</h2>
        <p>
          Email: <a className="underline" href={`mailto:${SUPPORT_EMAIL_TEXT}`}>{SUPPORT_EMAIL_TEXT}</a><br />
          Address: {ADDRESS_TEXT}, {JURIS_TEXT}<br />
          Or use our <a className="underline" href="/contact">Contact page</a>.
        </p>
      </section>
    </article>
  );
}
