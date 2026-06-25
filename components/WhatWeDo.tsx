"use client";
import { useRef } from "react";
import { useInView } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Stablecoin Infrastructure",
    desc: "End-to-end infrastructure for issuing, managing, and distributing stablecoins on Stellar, Ethereum, and beyond. Compliance-ready from day one.",
    tag: "Payments",
  },
  {
    num: "02",
    title: "RWA Tokenization",
    desc: "Bring real-world assets on-chain — funds, securities, commodities. Smart contracts, custody integration, and regulatory wrapper included.",
    tag: "DeFi",
  },
  {
    num: "03",
    title: "Smart Contract Systems",
    desc: "Production-grade smart contract development across Soroban, EVM, and Cosmos. From architecture and audit to deployment and monitoring.",
    tag: "Engineering",
  },
  {
    num: "04",
    title: "Developer Tooling & DX",
    desc: "SDKs, scaffolding templates, and documentation that power blockchain ecosystems. We build the tools developers actually use.",
    tag: "Open Source",
  },
  {
    num: "05",
    title: "Compliance Layer",
    desc: "KYC/AML integrations, on-chain monitoring, and regulatory reporting built into your blockchain stack — not bolted on after the fact.",
    tag: "Compliance",
  },
  {
    num: "06",
    title: "Cross-Chain Bridges",
    desc: "Interoperability solutions for moving value across Stellar, XRPL, Cosmos, and EVM chains — production-grade, audited, and battle-tested.",
    tag: "Multi-chain",
  },
];

export default function WhatWeDo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" ref={ref} style={{ padding: "120px 32px", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          marginBottom: 80, flexWrap: "wrap", gap: 24,
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>
          <div>
            <p style={{
              fontSize: 11, fontWeight: 600, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "rgba(var(--fg-rgb), 0.3)", marginBottom: 16,
            }}>
              What we do
            </p>
            <h2 style={{
              fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900,
              letterSpacing: "-0.04em", color: "var(--fg)", lineHeight: 1.05,
            }}>
              Our services.
            </h2>
          </div>
          <a
            href="#contact"
            style={{
              fontSize: 14, fontWeight: 600, color: "var(--accent)",
              textDecoration: "none", paddingBottom: 8,
            }}
          >
            Get in touch →
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}>
          {services.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "44px 40px",
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                transition: `opacity 0.5s ${i * 0.07}s ease, transform 0.5s ${i * 0.07}s ease, background 0.2s`,
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(24px)",
                cursor: "default",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(var(--accent-rgb), 0.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--card-bg)")}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(var(--fg-rgb), 0.15)", letterSpacing: "0.1em" }}>
                  {s.num}
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "var(--accent)", padding: "4px 10px",
                  border: "1px solid rgba(var(--accent-rgb), 0.25)", borderRadius: 4,
                }}>
                  {s.tag}
                </span>
              </div>
              <h3 style={{
                fontSize: "1.15rem", fontWeight: 700, letterSpacing: "-0.02em",
                color: "var(--fg)", marginBottom: 14,
              }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 14, color: "rgba(var(--fg-rgb), 0.38)", lineHeight: 1.7 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #services > div > div:last-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          #services > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
