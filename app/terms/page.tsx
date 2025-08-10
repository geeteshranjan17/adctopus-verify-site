// app/terms/page.tsx
import {
  PRODUCT_BRAND_NAME,
  COMPANY_LEGAL_NAME,
  SUPPORT_EMAIL,
  COUNTRY_JURISDICTION,
} from "@/lib/constants";

export const metadata = {
  title: "Terms of Service — Adctopus",
  description: "Terms and conditions for using Adctopus.",
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

export default function TermsPage() {
  const lastUpdated = new Date().toISOString().slice(0, 10);

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <header className="mb-6">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="text-sm text-white/70">Last updated: {lastUpdated}</p>
      </header>

      <section className="space-y-5 text-white/90">
        <p>
          These Terms of Service (“Terms”) govern your access to and use of {BRAND}. By using {BRAND}, you agree to these Terms.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-white">Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by {JURIS_TEXT} law, {COMPANY_NAME_TEXT} will not be liable for any indirect, incidental,
          special, consequential, exemplary, or punitive damages, or for loss of profits, revenues, data, or goodwill.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-white">Contact</h2>
        <p>
          Questions about these Terms? Email{" "}
          <a className="underline" href={`mailto:${SUPPORT_EMAIL_TEXT}`}>{SUPPORT_EMAIL_TEXT}</a>.
        </p>
      </section>
    </article>
  );
}
