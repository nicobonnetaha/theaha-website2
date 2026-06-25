"use client";
import Image from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";

const testimonials = [
  {
    quote: "Industry-leading developer experience",
    body: "When we undertook the biggest update to Stellar since its inception, fully programmable smart contracts, we knew we needed to ship an industry-leading developer experience.\n\nWe searched far and wide for capable teams to help us. We found one. We've been glad to work with The Aha Company ever since.",
    author: "Tomer Weller",
    role: "Chief Product Officer · Stellar Development Foundation",
    photo: "/images/tomer.jpg",
  },
  {
    quote: "True co-creators who bring ideas to life",
    body: "Since working alongside Chad and Willem, I've always appreciated that they fill critical gaps in the ecosystems they work in. More recently, collaborating on Scaffold Stellar with the talented team they've built, I'm consistently impressed by their speed, capacity, and commitment to quality. For true co-creators who bring ideas to life, look no further than The Aha Company.",
    author: "Jane Wang",
    role: "PM, Developer Experience & RWA Tokenization · Stellar Development Foundation",
    photo: "/images/jane.jpg",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ padding: "120px 32px", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div style={{
          display: "flex", alignItems: "baseline", justifyContent: "space-between",
          marginBottom: 64, flexWrap: "wrap", gap: 16,
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--fg)" }}>
            What they say
          </h2>
          <span className="tag">Testimonials</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              style={{
                padding: "48px",
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                display: "flex", flexDirection: "column",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(24px)",
                transition: `opacity 0.55s ${i * 0.12}s ease, transform 0.55s ${i * 0.12}s ease`,
              }}
            >
              <p style={{
                fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
                fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.35,
                marginBottom: 28,
                color: "var(--fg)",
                fontFamily: "var(--font-spectral), Georgia, serif",
                fontStyle: "italic",
              }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
                {t.body.split("\n\n").map((para, j) => (
                  <p key={j} style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.8 }}>
                    {para}
                  </p>
                ))}
              </div>

              <div style={{
                borderTop: "1px solid var(--border)", paddingTop: 24,
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <Image
                  src={t.photo}
                  alt={t.author}
                  width={44}
                  height={44}
                  style={{ borderRadius: "50%", flexShrink: 0, objectFit: "cover" }}
                />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--fg)" }}>{t.author}</p>
                  <p style={{ fontSize: 11, color: "rgba(var(--fg-rgb), 0.4)", marginTop: 3, lineHeight: 1.4 }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
