// app/page.tsx
import ConcentricOrbits from "./components/ConcentricOrbits";
import {
  PRODUCT_BRAND_NAME,
  SUPPORT_EMAIL,
  BUSINESS_ADDRESS,
  PHONE,
  COUNTRY_JURISDICTION,
} from "@/lib/constants";

export const metadata = {
  title: "Adctopus — Coming Soon",
  description:
    "Official website of Adctopus. We are preparing our launch. For any questions, contact us by email or phone.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Adctopus — Coming Soon",
    description:
      "Official website of Adctopus. We are preparing our launch. For any questions, contact us by email or phone.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Adctopus" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adctopus — Coming Soon",
    description:
      "Official website of Adctopus. We are preparing our launch. For any questions, contact us by email or phone.",
    images: ["/og-image.png"],
  },
};

// safe coercions
const BRAND =
  typeof PRODUCT_BRAND_NAME === "string"
    ? PRODUCT_BRAND_NAME.charAt(0).toUpperCase() + PRODUCT_BRAND_NAME.slice(1)
    : String(PRODUCT_BRAND_NAME ?? "");
const SUPPORT_EMAIL_TEXT =
  typeof SUPPORT_EMAIL === "string" ? SUPPORT_EMAIL : String(SUPPORT_EMAIL ?? "");
const PHONE_TEXT = typeof PHONE === "string" ? PHONE : String(PHONE ?? "");
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

export default function Page() {
  const telHref = `tel:+91${PHONE_TEXT.replace(/\D+/g, "")}`;

  return (
    <main className="relative isolate bg-[#0B1220] text-white">
      <div className="mx-auto max-w-5xl px-6 pt-12">
        <ConcentricOrbits className="mx-auto" size={640} rings={7} dots={14} speed={0.25} />
      </div>

      <section className="mx-auto max-w-3xl px-6 pb-24 pt-8 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Coming Soon</h1>
        <p className="mt-3 text-white/80">
          The official website for <span className="font-semibold">{BRAND}</span> is under preparation.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-lg font-semibold text-white">Business Contact</h2>
          <div className="mt-3 space-y-2 text-white/90">
            <p><span className="inline-block w-24 text-white/70">Email</span>
              <a className="underline" href={`mailto:${SUPPORT_EMAIL_TEXT}`}>{SUPPORT_EMAIL_TEXT}</a></p>
            <p><span className="inline-block w-24 text-white/70">Phone</span>
              <a className="underline" href={telHref}>+91 {PHONE_TEXT}</a></p>
            <p><span className="inline-block w-24 text-white/70">Address</span>
              {ADDRESS_TEXT}, {JURIS_TEXT}</p>
          </div>

          <div className="mt-4 text-sm text-white/70">
            For data deletion requests, see <a className="underline" href="/data-deletion">Data Deletion</a>.{" "}
            Read our <a className="underline" href="/privacy">Privacy Policy</a> and{" "}
            <a className="underline" href="/terms">Terms</a>.
          </div>
        </div>
      </section>
    </main>
  );
}
