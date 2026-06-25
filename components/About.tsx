"use client";
import Image from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about" ref={ref} style={{ padding: "120px 32px", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 80, alignItems: "start", marginBottom: 64,
        }}>
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
            <p style={{
              fontSize: 11, fontWeight: 600, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "rgba(var(--fg-rgb), 0.3)", marginBottom: 24,
            }}>
              Who we are
            </p>
            <h2 style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 900,
              letterSpacing: "-0.04em", color: "var(--fg)", lineHeight: 1.1,
            }}>
              The team behind your blockchain infrastructure
            </h2>
          </div>

          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(24px)",
            transition: "opacity 0.6s 0.15s ease, transform 0.6s 0.15s ease",
            paddingTop: 8,
          }}>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>
              We help financial institutions and fintechs design and deploy compliant blockchain infrastructure, from tokenized fund rails to stablecoin issuance and smart contract systems.
            </p>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8 }}>
              We implemented SG Forge&apos;s Euro stablecoin (EURCV) on Stellar, built tokenization infrastructure with Ripple and a Big Four consultancy, and continue to ship the developer tooling the ecosystem runs on.
            </p>
          </div>
        </div>

        <div style={{
          borderRadius: 16, overflow: "hidden",
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(30px)",
          transition: "opacity 0.7s 0.25s ease, transform 0.7s 0.25s ease",
        }}>
          <Image
            src="/images/team.jpg"
            alt="The Aha Company team"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", maxHeight: 520 }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div > div:first-child { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
