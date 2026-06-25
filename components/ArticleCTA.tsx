"use client";
import { ArrowRight } from "lucide-react";

export default function ArticleCTA() {
  return (
    <div style={{
      marginTop: 80,
      padding: "56px 48px",
      background: "rgba(var(--accent-rgb), 0.05)",
      border: "1px solid rgba(var(--accent-rgb), 0.15)",
      borderRadius: 16,
      textAlign: "center",
    }}>
      <p style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.16em",
        textTransform: "uppercase", color: "rgba(var(--fg-rgb), 0.3)",
        marginBottom: 16,
      }}>
        Let&apos;s work together
      </p>
      <h2 style={{
        fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900,
        letterSpacing: "-0.035em", color: "var(--fg)",
        lineHeight: 1.15, marginBottom: 12,
      }}>
        Ready to build something that lasts?
      </h2>
      <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7, marginBottom: 32, maxWidth: 440, margin: "0 auto 32px" }}>
        Tell us about your project, we&apos;ll get back to you within 24 hours.
      </p>
      <a
        href="https://calendly.com/d/crt8-mrr-zy9/chat-with-aha-labs-30min"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
        style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
      >
        Schedule a call <ArrowRight size={15} />
      </a>
    </div>
  );
}
