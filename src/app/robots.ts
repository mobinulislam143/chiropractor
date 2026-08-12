import type { MetadataRoute } from "next";
import { clinic } from "@/data/clinic";

export default function robots(): MetadataRoute.Robots {
  const base = clinic.siteUrl.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
