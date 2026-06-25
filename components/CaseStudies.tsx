"use client";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const cases = [
  {
    num: "01",
    category: "Developer Tooling · Stellar",
    title: "Scaffold Stellar",
    desc: "Open-source framework that cut Stellar smart contract setup from days to minutes. Used by thousands of developers worldwide.",
    year: "2024",
  },
  {
    num: "02",
    category: "Tokenization · XRPL",
    title: "RWA Tokenization Platform",
    desc: "End-to-end real-world asset tokenization infrastructure with compliance at its core, from smart contract to investor dashboard.",
    year: "2024",
  },
  {
    num: "03",
    category: "DeFi · XRPL",
    title: "Compliant DeFi Protocol",
    desc: "Liquidity management and AMM integrations leveraging XRPL's native DEX for regulated, institutional DeFi.",
    year: "2025",
  },
];

export default function CaseStudies() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" ref={ref} style={{ padding: "120px 32px", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 64, flexWrap: "wrap", gap: 16 }}
        >
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--fg)" }}>
            From vision to reality
          </h2>
          <span className="tag">Case Studies</span>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {cases.map((c, i) => (
            <motion.div
              key={c.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ x: 6 }}
              className="hover-dim"
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 120px",
                gap: 40,
                padding: "36px 0",
                borderTop: i === 0 ? "1px solid var(--border)" : undefined,
                borderBottom: "1px solid var(--border)",
                alignItems: "center",
                cursor: "pointer",
                transition: "opacity 0.15s",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em" }}>
                {c.num}
              </span>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  {c.category}
                </span>
                <h3 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", fontWeight: 800, color: "var(--fg)", letterSpacing: "-0.025em", marginBottom: 8 }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, maxWidth: 560 }}>
                  {c.desc}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 16 }}>
                <span style={{ fontSize: 12, color: "var(--subtle)" }}>{c.year}</span>
                <ArrowUpRight size={16} style={{ color: "var(--muted)" }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #work > div > div > div { grid-template-columns: 48px 1fr !important; }
          #work > div > div > div > :last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
