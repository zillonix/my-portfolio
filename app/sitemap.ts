import type { MetadataRoute } from "next";

const SITE_URL = "https://zulhusni.org";

/** Dynamic sitemap served at /sitemap.xml. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
