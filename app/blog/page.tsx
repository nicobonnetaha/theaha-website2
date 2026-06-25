import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    category: "Tokenization",
    title: "Why Stellar is the Right Chain for Tokenization in 2025",
    excerpt: "From RWA to stablecoins, Stellar's compliance-first architecture makes it the go-to chain for institutional tokenization. Here's why we keep building on it.",
    date: "Sep 15, 2025",
    readTime: "6 min",
    author: "Chad Barraford",
    slug: "stellar-tokenization-2025",
  },
  {
    category: "Developer Tools",
    title: "Scaffold Stellar: How We Built the Developer Toolkit for the Next Wave of dApps",
    excerpt: "A deep dive into Scaffold Stellar, the open-source framework we built to make it easier for developers to ship production-ready apps on Stellar.",
    date: "Oct 20, 2025",
    readTime: "8 min",
    author: "Willem Wyndham",
    slug: "scaffold-stellar-developer-toolkit",
  },
  {
    category: "DeFi",
    title: "DeFi on XRPL: Compliance, Liquidity and the Road Ahead",
    excerpt: "XRPL's native DEX and AMM features make it uniquely positioned for compliant DeFi. We explore the opportunities and challenges for builders.",
    date: "Nov 10, 2025",
    readTime: "5 min",
    author: "Chad Barraford",
    slug: "defi-xrpl-compliance-liquidity",
  },
];

export default function BlogPage() {
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
                      <span style={{ fontSize: 11, color: "var(--subtle)" }}>{p.date} · {p.readTime} read</span>
                    </div>
                    <h2 style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 800, color: "var(--fg)", lineHeight: 1.3, letterSpacing: "-0.025em", marginBottom: 10 }}>
                      {p.title}
                    </h2>
                    <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, marginBottom: 10, maxWidth: 620 }}>
                      {p.excerpt}
                    </p>
                    <span style={{ fontSize: 12, color: "var(--subtle)" }}>By {p.author}</span>
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
