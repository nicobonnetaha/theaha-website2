import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" style={{ padding: "140px 32px", borderTop: "1px solid var(--border)", background: "var(--blue-dim)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>

        <span className="tag" style={{ marginBottom: 24, display: "block", justifyContent: "center" }}>Get started</span>

        <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--fg)", lineHeight: 1.05, marginBottom: 24 }}>
          Ready to build<br />something lasting?
        </h2>

        <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.75, marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>
          Let&apos;s talk about your blockchain project. We&apos;ll find the right approach and ship fast.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://calendly.com/d/crt8-mrr-zy9/chat-with-aha-labs-30min" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Get a Demo <ArrowRight size={14} />
          </a>
          <a href="https://github.com/theahacompany" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            View GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
