"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="grid-bg"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        padding: "120px 32px 80px",
      }}
    >
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 900px 600px at 50% -60px, rgba(var(--accent-rgb), 0.14) 0%, transparent 68%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0, height: 180,
        background: "linear-gradient(to bottom, transparent, var(--bg))",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: 920, width: "100%", textAlign: "center" }}>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px",
            border: "1px solid rgba(var(--accent-rgb), 0.25)",
            borderRadius: 100,
            background: "rgba(var(--accent-rgb), 0.07)",
            fontSize: 12, fontWeight: 600, letterSpacing: "0.1em",
            color: "var(--muted)", textTransform: "uppercase",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            Trusted by institutions and web3 teams - since 2019
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: "clamp(3.8rem, 9vw, 9rem)", lineHeight: 1.0, letterSpacing: "-0.04em", marginBottom: 32 }}
        >
          <span style={{
            display: "block",
            fontFamily: "var(--font-spectral), Georgia, serif",
            fontWeight: 400, fontStyle: "italic",
            color: "rgba(var(--fg-rgb), 0.88)",
          }}>
            Blockchain Solutions
          </span>
          <span style={{
            display: "block",
            fontFamily: "var(--font-space), sans-serif",
            fontWeight: 900,
            color: "var(--accent)",
          }}>
            Built to Last.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          style={{
            fontSize: "clamp(16px, 1.8vw, 19px)",
            color: "rgba(var(--fg-rgb), 0.4)",
            lineHeight: 1.6,
            maxWidth: 500,
            margin: "0 auto 44px",
          }}
        >
          We design and deploy compliant blockchain infrastructure for financial institutions, from stablecoin rails to tokenized funds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
        >
          <a
            href="https://calendly.com/d/crt8-mrr-zy9/chat-with-aha-labs-30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Talk to our team <ArrowRight size={15} />
          </a>
          <a href="#work" className="btn-ghost">View Our Work</a>
        </motion.div>
      </div>
    </section>
  );
}
