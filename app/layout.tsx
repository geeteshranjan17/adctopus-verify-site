import "./globals.css";
import type { ReactNode } from "react";
import { PRODUCT_BRAND_NAME, META_DOMAIN_VERIFICATION, SUPPORT_EMAIL, BUSINESS_ADDRESS, PHONE } from "@/lib/constants";

export const metadata = { metadataBase: new URL("https://DOMAIN") };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="facebook-domain-verification" content={META_DOMAIN_VERIFICATION} />
        <meta name="theme-color" content="#0B1220" />
      </head>
      <body>
        <header className="border-b">
          <div className="container flex items-center h-14 justify-between">
            <a href="/" className="font-semibold tracking-tight">{PRODUCT_BRAND_NAME}</a>
            <nav className="text-sm text-slate">
              <a className="hover:underline mr-4" href="/privacy">Privacy</a>
              <a className="hover:underline mr-4" href="/terms">Terms</a>
              <a className="hover:underline mr-4" href="/data-deletion">Data Deletion</a>
              <a className="hover:underline" href="/contact">Contact</a>
            </nav>
          </div>
        </header>
        <main className="container py-10">{children}</main>
        <footer className="border-t mt-12">
          <div className="container py-8 text-sm text-slate">
            <div className="grid gap-2">
              <div>© {new Date().getFullYear()} {PRODUCT_BRAND_NAME}. All rights reserved.</div>
              <div><span className="mr-2">Email:</span><a href={`mailto:${SUPPORT_EMAIL}`} className="underline">{SUPPORT_EMAIL}</a></div>
              <div><span className="mr-2">Phone:</span><a href={`tel:+91${PHONE}`} className="underline">+91 {PHONE}</a></div>
              <div><span className="mr-2">Address:</span><span className="not-italic">{BUSINESS_ADDRESS}</span></div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}