import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactCompiler: isProd,
  outputFileTracingRoot: process.cwd(),
  // @ts-ignore
  allowedDevOrigins: ['192.168.0.104', 'localhost'],
  images: {
    // Cloudflare/OpenNext deployment: serve local images directly instead of /_next/image optimizer route
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
    ];
  },
  webpack(config: any) {
    // Fix: Tailwind CSS v4 + Next.js 16 Webpack incompatibility
    // css-loader misidentifies `&` CSS nesting as module path `./&`
    const patchCssLoader = (rules: any[]) => {
      for (const rule of rules ?? []) {
        const uses = Array.isArray(rule.use) ? rule.use : rule.use ? [rule.use] : [];
        for (const use of uses) {
          if (
            typeof use === "object" &&
            use?.loader?.includes?.("css-loader") &&
            !use?.loader?.includes?.("postcss-loader") &&
            use?.options &&
            !use.options.modules
          ) {
            use.options.url = false;
          }
        }
        if (rule.oneOf) patchCssLoader(rule.oneOf);
      }
    };
    patchCssLoader(config.module.rules);
    return config;
  },
};

export default nextConfig;
