import type { MetadataRoute } from "next";
import { clinic } from "@/data/clinic";
import { services } from "@/data/services";
import { conditions } from "@/data/conditions";

/** Every route the site actually serves, derived from the same data the pages read. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = clinic.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: Array<[string, number]> = [
    ["", 1],
    ["/services", 0.9],
    ["/conditions", 0.9],
    ["/book", 0.9],
    ["/about", 0.7],
    ["/reviews", 0.7],
    ["/contact", 0.7],
    ["/faq", 0.6],
  ];

  return [
    ...staticRoutes.map(([path, priority]) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...conditions.map((c) => ({
      url: `${base}/conditions/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
