"use client";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const caseStudies = [
  {
    num: "01",
    category: "Developer Tooling · Stellar",
    title: "Scaffold Stellar",
    desc: "Open-source scaffolding template for Soroban smart contracts, cutting project setup from days to minutes. The go-to starting point for Stellar developers worldwide.",
    year: "2024",
    slug: "scaffold-stellar",
  },
  {
    num: "02",
    category: "Tokenization · Stellar",
    title: "Equitx",
    desc: "Equity tokenization infrastructure built on Stellar, bringing real-world asset issuance on-chain with compliance at the protocol layer.",
    year: "2024",
    slug: "equitx",
  },
  {
    num: "03",
    category: "Asset Management · Stellar",
    title: "Authline",
    desc: "Stellar asset and trustline management dApp, enabling institutions to manage tokenized assets, issuance rights, and account authorization at scale.",
    year: "2025",
    slug: "authline",
  },
];

const articles = [
  {
    num: "01",
    category: "Tokenization",
    title: "Why Stellar is the Right Chain for Tokenization in 2025",
    desc: "From RWA to stablecoins, Stellar's compliance-first architecture makes it the go-to chain for institutional tokenization.",
    date: "Sep 2025",
    slug: "stellar-tokenization-2025",
  },
  {
    num: "02",
    category: "Developer Tools",
    title: "Scaffold Stellar: How We Built the Developer Toolkit for the Next Wave of dApps",
    desc: "A deep dive into the open-source framework we built to make it easier for developers to ship production-ready apps on Stellar.",
    date: "Oct 2025",
    slug: "scaffold-stellar-developer-toolkit",
  },
  {
    num: "03",
    category: "DeFi",
    title: "DeFi on XRPL: Compliance, Liquidity and the Road Ahead",
    desc: "XRPL's native DEX and AMM features make it uniquely positioned for compliant DeFi. We explore the opportunities and challenges for builders.",
    date: "Nov 2025",
    slug: "defi-xrpl-compliance-liquidity",
  },
];

const rowStyle = (i: number, inView: boolean) => ({
  display: "grid" as const,
  gridTemplateColumns: "80px 1fr 120px",
  gap: 40,
  padding: "36px 0",
  borderTop: i === 0 ? "1px solid var(--border)" : "none",
  borderBottom: "1px solid var(--border)",
  alignItems: "center" as const,
  textDecoration: "none" as const,
  opacity: inView ? 1 : 0,
  transform: inView ? "none" : "translateY(20px)",
  transition: `opacity 0.55s ${i * 0.1}s ease, transform 0.55s ${i * 0.1}s ease`,
});

export default function Cases() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [tab, setTab] = useState<"cases" | "articles">("cases");

  return (
    <section id="work" ref={ref} style={{ padding: "120px 32px", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 56, flexWrap: "wrap", gap: 20,
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--fg)" }}>
            From vision to reality
          </h2>

          <div style={{
            display: "flex", gap: 4, padding: 4,
            background: "rgba(var(--fg-rgb), 0.04)",
            borderRadius: 10, border: "1px solid var(--border)",
          }}>
            {(["cases", "articles"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "8px 20px", borderRadius: 7, border: "none",
                  cursor: "pointer", fontSize: 13, fontWeight: 600,
                  fontFamily: "var(--font-space), sans-serif", letterSpacing: "-0.01em",
                  background: tab === t ? "var(--bg)" : "transparent",
                  color: tab === t ? "var(--fg)" : "var(--muted)",
                  boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                {t === "cases" ? "Case Studies" : "Articles"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {tab === "cases" ? caseStudies.map((c, i) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              style={rowStyle(i, inView)}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em" }}>
                {c.num}
              </span>
              <div>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: "var(--muted)",
                  letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8,
                }}>
                  {c.category}
                </span>
                <h3 style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", fontWeight: 800,
                  color: "var(--fg)", letterSpacing: "-0.025em", marginBottom: 8,
                }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, maxWidth: 560 }}>
                  {c.desc}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 16 }}>
                <span style={{ fontSize: 12, color: "rgba(var(--fg-rgb), 0.25)" }}>{c.year}</span>
                <ArrowUpRight size={16} style={{ color: "var(--muted)" }} />
              </div>
            </Link>
          )) : articles.map((a, i) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              style={rowStyle(i, inView)}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em" }}>
                {a.num}
              </span>
              <div>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: "var(--muted)",
                  letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8,
                }}>
                  {a.category}
                </span>
                <h3 style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", fontWeight: 800,
                  color: "var(--fg)", letterSpacing: "-0.025em", marginBottom: 8,
                }}>
                  {a.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, maxWidth: 560 }}>
                  {a.desc}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 16 }}>
                <span style={{ fontSize: 12, color: "rgba(var(--fg-rgb), 0.25)" }}>{a.date}</span>
                <ArrowUpRight size={16} style={{ color: "var(--muted)" }} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #work a[style*="grid"] > span:first-child { display: none; }
          #work a[style*="grid"] { grid-template-columns: 1fr auto !important; }
        }
      `}</style>
    </section>
  );
}
