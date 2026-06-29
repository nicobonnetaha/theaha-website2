import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCTA from "@/components/ArticleCTA";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {} as Record<string, string>, body: content };
  const meta: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const [key, ...val] = line.split(": ");
    if (key) meta[key.trim()] = val.join(": ").trim().replace(/^"|"$/g, "");
  });
  return { meta, body: match[2] };
}

function mdToHtml(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.4rem;font-weight:800;color:var(--fg);margin:48px 0 16px;letter-spacing:-0.025em">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1.1rem;font-weight:700;color:var(--fg);margin:32px 0 10px;letter-spacing:-0.02em">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--fg);font-weight:600">$1</strong>')
    .replace(/^- (.+)$/gm, '<li style="color:var(--muted);font-size:15px;line-height:1.75;margin-left:20px;list-style:disc">$1</li>')
    .replace(/(<li[^>]*>[\s\S]*?<\/li>)/g, '<ul style="margin-bottom:24px">$1</ul>')
    .replace(/^(?!<[h|l|u])(.+)$/gm, (line) => {
      if (!line.trim()) return "";
      if (line.startsWith("<")) return line;
      return `<p style="color:var(--muted);font-size:15px;line-height:1.8;margin-bottom:20px">${line}</p>`;
    });
}

const slugMap: Record<string, { github?: string }> = {
  "scaffold-stellar": { github: "https://github.com/theahaco/soroban-init-template" },
  "equitx": { github: "https://github.com/theahaco/equitxdev" },
  "authline": { github: "https://github.com/theahaco/authline" },
};

function getCase(slug: string) {
  const filePath = join(process.cwd(), "content/cases", `${slug}.mdx`);
  if (!existsSync(filePath)) return null;
  const raw = readFileSync(filePath, "utf-8");
  return parseFrontmatter(raw);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) return {};
  const { meta } = item;
  const title = `${meta.title}, The Aha Company`;
  return {
    title,
    description: meta.excerpt,
    openGraph: { title, description: meta.excerpt, type: "website", siteName: "The Aha Company", url: `/work/${slug}` },
    twitter: { card: "summary_large_image", title, description: meta.excerpt },
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) notFound();
  const { meta, body } = item;
  const html = mdToHtml(body);
  const extra = slugMap[slug] ?? {};

  const tags = meta.tags
    ? meta.tags.replace(/^\[|\]$/g, "").split(",").map((t) => t.trim().replace(/^"|"$/g, ""))
    : [];

  const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://theaha-website2.vercel.app";

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Work", item: `${BASE}/#work` },
      { "@type": "ListItem", position: 3, name: meta.title, item: `${BASE}/work/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 120, paddingBottom: 120, paddingLeft: 32, paddingRight: 32 }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>

          <Link href="/#work" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)", textDecoration: "none", marginBottom: 48 }}>
            <ArrowLeft size={14} /> Back to Work
          </Link>

          <header style={{ marginBottom: 56, paddingBottom: 40, borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {meta.category}
              </span>
              <span style={{ fontSize: 11, color: "rgba(var(--fg-rgb), 0.25)" }}>{meta.date}</span>
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--fg)", lineHeight: 1.05, marginBottom: 16 }}>
              {meta.title}
            </h1>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, marginBottom: 28 }}>
              {meta.excerpt}
            </p>

            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
              {meta.client && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(var(--fg-rgb), 0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Client</p>
                  <p style={{ fontSize: 14, color: "var(--fg)", fontWeight: 600 }}>{meta.client}</p>
                </div>
              )}
              {tags.length > 0 && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(var(--fg-rgb), 0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Tags</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
              {extra.github && (
                <a
                  href={extra.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--accent)", textDecoration: "none", marginLeft: "auto" }}
                >
                  View on GitHub <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </header>

          <div dangerouslySetInnerHTML={{ __html: html }} />
          <ArticleCTA />

        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return ["scaffold-stellar", "equitx", "authline"].map((slug) => ({ slug }));
}
