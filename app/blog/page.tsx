import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {} as Record<string, string>;
  const meta: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const [key, ...val] = line.split(": ");
    if (key) meta[key.trim()] = val.join(": ").trim().replace(/^"|"$/g, "");
  });
  return meta;
}

function formatDate(date: string) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

type Post = { slug: string; title: string; category: string; excerpt: string; date: string; readTime?: string; author?: string };

function getAllPosts(): Post[] {
  const dir = join(process.cwd(), "content/blog");
  const files = readdirSync(dir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = readFileSync(join(dir, file), "utf-8");
      const meta = parseFrontmatter(raw);
      return { slug, title: meta.title ?? "", category: meta.category ?? "", excerpt: meta.excerpt ?? "", date: meta.date ?? "", readTime: meta.readTime, author: meta.author };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 120, paddingBottom: 120, paddingLeft: 32, paddingRight: 32 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          <div style={{ marginBottom: 80 }}>
            <span className="tag" style={{ marginBottom: 16, display: "block" }}>Blog</span>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--fg)", lineHeight: 1.05, marginBottom: 16 }}>
              Insights from the field
            </h1>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7 }}>
              Blockchain, DeFi, tokenization, written by the people building it.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {posts.map((p, i) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
                <article
                  className="hover-dim"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 40,
                    padding: "36px 0",
                    borderTop: i === 0 ? "1px solid var(--border)" : undefined,
                    borderBottom: "1px solid var(--border)",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", gap: 16, marginBottom: 12, alignItems: "center" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {p.category}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--subtle)" }}>{formatDate(p.date)}{p.readTime ? ` · ${p.readTime}` : ""}</span>
                    </div>
                    <h2 style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 800, color: "var(--fg)", lineHeight: 1.3, letterSpacing: "-0.025em", marginBottom: 10 }}>
                      {p.title}
                    </h2>
                    <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, marginBottom: 10, maxWidth: 620 }}>
                      {p.excerpt}
                    </p>
                    {p.author && <span style={{ fontSize: 12, color: "var(--subtle)" }}>By {p.author}</span>}
                  </div>
                  <ArrowUpRight size={18} style={{ color: "var(--muted)", flexShrink: 0 }} />
                </article>
              </Link>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
