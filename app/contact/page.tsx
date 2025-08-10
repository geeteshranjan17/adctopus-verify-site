import { PRODUCT_BRAND_NAME, SUPPORT_EMAIL, BUSINESS_ADDRESS, PHONE } from "@/lib/constants";

export default function ContactPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-2 text-slate">For any inquiries about {PRODUCT_BRAND_NAME}, reach us at:</p>
      <div className="mt-6 rounded-lg border p-6">
        <p>
          Email: <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a><br />
          Phone: <a className="underline" href={`tel:+91${PHONE}`}>+91 {PHONE}</a><br />
          Address: {BUSINESS_ADDRESS}
        </p>
        <form className="mt-6 space-y-3" action={`mailto:${SUPPORT_EMAIL}`} method="post" encType="text/plain">
          <div>
            <label className="block text-sm mb-1">Your Name</label>
            <input name="name" required className="w-full rounded-md border px-3 py-2" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm mb-1">Your Email</label>
            <input type="email" name="email" required className="w-full rounded-md border px-3 py-2" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea name="message" rows={4} className="w-full rounded-md border px-3 py-2" placeholder="How can we help?" />
          </div>
          <button type="submit" className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-sand" title="This opens your email client to send the message">
            Send
          </button>
        </form>
      </div>
    </section>
  );
}