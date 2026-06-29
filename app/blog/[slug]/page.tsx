import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCTA from "@/components/ArticleCTA";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1.15rem;font-weight:700;color:var(--fg);margin:36px 0 12px;letter-spacing:-0.02em">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--fg);font-weight:600">$1</strong>')
    .replace(/^- (.+)$/gm, '<li style="color:var(--muted);font-size:15px;line-height:1.75;margin-left:20px;list-style:disc">$1</li>')
    .replace(/(<li[^>]*>[\s\S]*?<\/li>)/g, '<ul style="margin-bottom:24px">$1</ul>')
    .replace(/^(?!<[h|l|u])(.+)$/gm, (line) => {
      if (!line.trim()) return "";
      if (line.startsWith("<")) return line;
      return `<p style="color:var(--muted);font-size:15px;line-height:1.8;margin-bottom:20px">${line}</p>`;
    });
}

function getPost(slug: string) {
  const filePath = join(process.cwd(), "content/blog", `${slug}.mdx`);
  if (!existsSync(filePath)) return null;
  const raw = readFileSync(filePath, "utf-8");
  return parseFrontmatter(raw);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const { meta } = post;
  const title = `${meta.title}, The Aha Company`;
  const description = meta.excerpt || meta.title;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: meta.date,
      authors: [meta.author],
      url: `/blog/${slug}`,
      siteName: "The Aha Company",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { meta, body } = post;
  const html = mdToHtml(body);

  const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://theaha-website2.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.excerpt || meta.title,
    datePublished: meta.date,
    author: { "@type": "Person", name: meta.author },
    publisher: { "@type": "Organization", name: "The Aha Company", url: BASE },
    url: `${BASE}/blog/${slug}`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: meta.title, item: `${BASE}/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 120, paddingBottom: 120, paddingLeft: 32, paddingRight: 32 }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>

          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)", textDecoration: "none", marginBottom: 48 }}>
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          <header style={{ marginBottom: 56, paddingBottom: 40, borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {meta.category}
              </span>
              <span style={{ fontSize: 11, color: "var(--subtle)" }}>
                {meta.date} · {meta.readTime}
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--fg)", lineHeight: 1.1, marginBottom: 16 }}>
              {meta.title}
            </h1>
            <p style={{ fontSize: 13, color: "var(--subtle)" }}>By {meta.author}</p>
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
  const { readdirSync } = await import("fs");
  const { join } = await import("path");
  const dir = join(process.cwd(), "content/blog");
  const files = readdirSync(dir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  return files.map((f) => ({ slug: f.replace(/\.mdx?$/, "") }));
}
