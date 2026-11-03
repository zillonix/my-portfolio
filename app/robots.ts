import type { MetadataRoute } from "next";

const SITE_URL = "https://zulhusni.org";

/** robots directives served at /robots.txt. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
