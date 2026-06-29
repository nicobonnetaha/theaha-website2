import { MetadataRoute } from "next";
import { readdirSync } from "fs";
import { join } from "path";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://theaha-website2.vercel.app";

function getBlogSlugs(): string[] {
  try {
    const dir = join(process.cwd(), "content/blog");
    return readdirSync(dir)
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map((f) => f.replace(/\.mdx?$/, ""));
  } catch {
    return [];
  }
}

function getCaseSlugs(): string[] {
  try {
    const dir = join(process.cwd(), "content/cases");
    return readdirSync(dir)
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map((f) => f.replace(/\.mdx?$/, ""));
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const blogPages: MetadataRoute.Sitemap = getBlogSlugs().map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const casePages: MetadataRoute.Sitemap = getCaseSlugs().map((slug) => ({
    url: `${BASE}/work/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...casePages];
}
