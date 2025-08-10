// app/contact/page.tsx
import {
  PRODUCT_BRAND_NAME,
  SUPPORT_EMAIL,
  BUSINESS_ADDRESS,
  PHONE,
  COUNTRY_JURISDICTION,
} from "@/lib/constants";

export const viewport = { themeColor: "#0B1220" };

const BRAND_DISPLAY =
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

export default function ContactPage() {
  const telHref = `tel:+91${PHONE_TEXT.replace(/\D+/g, "")}`;

  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-2 text-white/80">For any inquiries about {BRAND_DISPLAY}, reach us at:</p>

      <div className="mt-6 rounded-lg border border-white/15 bg-black/30 p-6 backdrop-blur">
        <div className="space-y-3 text-white/90">
          <p><span className="inline-block w-24 text-white/70">Email</span>
            <a className="underline" href={`mailto:${SUPPORT_EMAIL_TEXT}`}>{SUPPORT_EMAIL_TEXT}</a></p>
          <p><span className="inline-block w-24 text-white/70">Phone</span>
            <a className="underline" href={telHref}>+91 {PHONE_TEXT}</a></p>
          <p><span className="inline-block w-24 text-white/70">Address</span>
            <span>{ADDRESS_TEXT}, {JURIS_TEXT}</span></p>
        </div>

        <p className="mt-6 text-sm text-white/60">Business hours: Mon–Fri, 10:00–18:00 IST</p>
      </div>
    </section>
  );
}
