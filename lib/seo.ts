// lib/seo.ts
import type { Metadata } from "next";
import { PRODUCT_BRAND_NAME, DOMAIN } from "@/lib/constants";

const SITE = new URL(DOMAIN);
const BRAND = PRODUCT_BRAND_NAME.charAt(0).toUpperCase() + PRODUCT_BRAND_NAME.slice(1);

export type SEOInput = {
  title?: string;
  description?: string;
  path?: string;       // e.g. "/pricing"
  image?: string;      // absolute or /relative
  keywords?: string[];
  noindex?: boolean;
};

export const absoluteUrl = (path = "/") => new URL(path, SITE).toString();

const imageUrl = (src?: string) => {
  // ✅ Default to the actual file we ship in /public
  if (!src) return absoluteUrl("/og-image.png");
  return src.startsWith("http") ? src : absoluteUrl(src);
};

function buildRobots(noindex?: boolean): Metadata["robots"] {
  if (noindex) {
    return {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        "max-image-preview": "none",
        "max-snippet": 0,
        "max-video-preview": 0,
      },
    } as const;
  }
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  } as const;
}

export function seo(input: SEOInput = {}): Metadata {
  const title = input.title ?? `${BRAND} — Chaos → Calm for Ad Comments`;
  const description =
    input.description ??
    "Turn messy Facebook & Instagram ad comments into clean, on-brand conversations automatically.";
  const canonical = absoluteUrl(input.path ?? "/");
  const ogImage = imageUrl(input.image);

  return {
    title,
    description,
    metadataBase: SITE,
    alternates: { canonical },
    keywords: input.keywords,
    robots: buildRobots(input.noindex),
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: BRAND,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: BRAND }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
