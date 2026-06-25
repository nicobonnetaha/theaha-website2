"use client";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "160px 32px",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 800px 500px at 50% 100%, rgba(var(--accent-rgb), 0.11) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative",
        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        <p style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(var(--fg-rgb), 0.28)", marginBottom: 32,
        }}>
          Let&apos;s build together
        </p>

        <h2 style={{
          fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
          letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: 40,
        }}>
          <span style={{
            display: "block",
            fontFamily: "var(--font-spectral), Georgia, serif",
            fontWeight: 400, fontStyle: "italic",
            color: "var(--fg)",
          }}>
            Ready to build
          </span>
          <span style={{
            display: "block",
            fontFamily: "var(--font-space), sans-serif",
            fontWeight: 900,
            color: "var(--accent)",
          }}>
            something that lasts?
          </span>
        </h2>

        <p style={{
          fontSize: 17, color: "rgba(var(--fg-rgb), 0.38)", lineHeight: 1.75,
          maxWidth: 480, margin: "0 auto 56px",
        }}>
          Let&apos;s talk about your blockchain project. We&apos;ll find the right approach and ship fast.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="https://calendly.com/d/crt8-mrr-zy9/chat-with-aha-labs-30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Get a Demo <ArrowRight size={15} />
          </a>
          <a
            href="https://github.com/theahacompany"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            View GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
