"use client";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="grid-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 32px 80px", paddingTop: 120 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>

        <div style={{ marginBottom: 40, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", letterSpacing: "0.08em" }}>
            Trusted by Stellar Development Foundation
          </span>
        </div>

        <h1 style={{
          fontSize: "clamp(3rem, 7vw, 6.5rem)",
          fontWeight: 900,
          lineHeight: 1.02,
          letterSpacing: "-0.04em",
          color: "var(--fg)",
          marginBottom: 32,
          maxWidth: 900,
        }}>
          Blockchain<br />
          Solutions<br />
          <span style={{ color: "var(--accent)" }}>Built to Last</span>
        </h1>

        <p style={{ fontSize: 18, color: "var(--muted)", lineHeight: 1.65, maxWidth: 520, marginBottom: 48, fontWeight: 400 }}>
          We bridge institutions and startups with blockchain — developer tooling, tokenization, and DeFi. Compliance-ready solutions that scale across Stellar, XRPL, Ethereum & Cosmos.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="https://calendly.com/d/crt8-mrr-zy9/chat-with-aha-labs-30min" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Get a Demo <ArrowRight size={15} />
          </a>
          <a href="#work" className="btn-ghost">
            View Case Studies
          </a>
        </div>

        <div className="line" style={{ marginTop: 80 }} />
        <div style={{ display: "flex", gap: 40, marginTop: 24, flexWrap: "wrap" }}>
          {["Stellar", "XRPL", "Ethereum", "Cosmos"].map((c) => (
            <span key={c} style={{ fontSize: 13, color: "var(--subtle)", fontWeight: 500, letterSpacing: "0.05em" }}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
