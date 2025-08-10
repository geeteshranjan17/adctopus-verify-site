/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false, // hide "X-Powered-By" for a tiny security win
    images: {
      // smaller, sharper images where supported
      formats: ["image/avif", "image/webp"],
    },
    experimental: {
      // trims your bundle a bit when using framer-motion
      optimizePackageImports: ["framer-motion"],
    },
    async headers() {
      // conservative security headers that won’t break your current setup
      const securityHeaders = [
        // Only load resources from our origin by default
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline'", // needed for the JSON-LD Script block
            "style-src 'self' 'unsafe-inline'",  // inline styles used in layout
            "img-src 'self' data: https:",
            "font-src 'self' data:",
            "connect-src 'self'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
          ].join("; "),
        },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        // enable only if you’re 100% HTTPS everywhere (you are) and want preload later
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ];
  
      return [
        { source: "/:path*", headers: securityHeaders },
      ];
    },
    async redirects() {
      // ensure non-www → www (also set primary domain in your hosting)
      return [
        {
          source: "/:path*",
          has: [{ type: "host", value: "adctopus.com" }],
          destination: "https://www.adctopus.com/:path*",
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;
  