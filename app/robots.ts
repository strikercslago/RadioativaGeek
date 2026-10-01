import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    ...(process.env.SITE_URL ? { sitemap: new URL("/sitemap.xml", process.env.SITE_URL).href } : {}),
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
