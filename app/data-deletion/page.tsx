// app/data-deletion/page.tsx
import { SUPPORT_EMAIL } from "@/lib/constants";

export const metadata = {
  title: "Data Deletion — Adctopus",
  description: "How to request deletion of your data.",
};
export const viewport = { themeColor: "#0B1220" };

const SUPPORT_EMAIL_TEXT =
  typeof SUPPORT_EMAIL === "string" ? SUPPORT_EMAIL : String(SUPPORT_EMAIL ?? "");

export default function DataDeletionPage() {
  const lastUpdated = new Date().toISOString().slice(0, 10);

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <header className="mb-6">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Data Deletion</h1>
        <p className="text-sm text-white/70">Last updated: {lastUpdated}</p>
      </header>

      <section className="space-y-5 text-white/90">
        <p>
          To delete your data, email{" "}
          <a className="underline" href={`mailto:${SUPPORT_EMAIL_TEXT}`}>{SUPPORT_EMAIL_TEXT}</a>{" "}
          with the subject <span className="font-semibold">“Data Deletion Request”</span>. We’ll confirm and process it promptly.
        </p>
      </section>
    </article>
  );
}
