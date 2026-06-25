"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "What chains do you build on?", a: "We specialize in Stellar, XRPL, Ethereum, and Cosmos. Each chain has unique strengths, we help you pick the right one and build the best solution on top of it." },
  { q: "Do you work with institutions?", a: "Yes. Many of our clients are financial institutions, asset managers, or regulated entities. We understand compliance requirements and build with them in mind from day one." },
  { q: "What is Scaffold Stellar?", a: "Scaffold Stellar is our open-source developer framework for building production-ready apps on Stellar. CLI tooling, project templates, smart contract scaffolding, and more." },
  { q: "Can you help with tokenization?", a: "Absolutely. We've built end-to-end tokenization infrastructure for real-world assets, from the smart contract layer to the frontend and compliance workflows." },
  { q: "How do we get started?", a: "Book a demo call with our team. We'll discuss your use case, recommend the right approach, and put together a proposal tailored to your goals." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ padding: "120px 32px", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>

        <div>
          <span className="tag" style={{ marginBottom: 16, display: "block" }}>FAQ</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--fg)", lineHeight: 1.1 }}>
            Common<br />questions
          </h2>
        </div>

        <div>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "24px 0", background: "none", border: "none", cursor: "pointer",
                  color: "var(--fg)", textAlign: "left", gap: 16
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>{f.q}</span>
                {open === i
                  ? <Minus size={16} style={{ color: "var(--muted)", flexShrink: 0 }} />
                  : <Plus size={16} style={{ color: "var(--muted)", flexShrink: 0 }} />
                }
              </button>
              {open === i && (
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75, paddingBottom: 24 }}>
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
