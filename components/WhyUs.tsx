"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const items = [
  {
    num: "01",
    title: "We're Core Contributors",
    desc: "We don't just build on Stellar, we help build Stellar itself. As core contributors, we've shipped protocol updates, SDKs, and the developer tooling the ecosystem runs on.",
  },
  {
    num: "02",
    title: "DevX is in our DNA",
    desc: "We've built developer tools used by thousands of blockchain developers worldwide. Great developer experience isn't a nice-to-have, it's the foundation everything else is built on.",
  },
  {
    num: "03",
    title: "Multi-Chain, No Bias",
    desc: "We work across Stellar, XRPL, Ethereum, and Cosmos. We recommend what's right for your use case, not what happens to be our comfort zone.",
  },
  {
    num: "04",
    title: "Artisan Mindset",
    desc: "We sweat the details others skip. From API ergonomics to audit trails, from documentation to deployment, we build things we'd be proud to use ourselves.",
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section id="why-us" ref={ref} style={{ padding: "120px 32px", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex", alignItems: "baseline", justifyContent: "space-between",
            marginBottom: 64, flexWrap: "wrap", gap: 16,
          }}
        >
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--fg)" }}>
            The Aha Difference
          </h2>
          <span className="tag">Why Us?</span>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {items.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActive(i)}
                style={{
                  padding: "28px 0",
                  borderBottom: "1px solid var(--border)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                    paddingTop: 3, flexShrink: 0,
                    color: active === i ? "var(--accent)" : "var(--subtle)",
                    transition: "color 0.2s",
                  }}>
                    {item.num}
                  </span>
                  <div>
                    <h3 style={{
                      fontSize: "clamp(1rem, 1.5vw, 1.2rem)", fontWeight: 700,
                      letterSpacing: "-0.02em", transition: "color 0.2s",
                      color: active === i ? "var(--fg)" : "var(--muted)",
                    }}>
                      {item.title}
                    </h3>
                    <AnimatePresence>
                      {active === i && (
                        <motion.p
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, marginTop: 12 }}
                        >
                          {item.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "sticky", top: 120,
              background: "var(--card-bg)",
              borderRadius: 20, border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 48, minHeight: 380, overflow: "hidden",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: "center" }}
              >
                <div style={{
                  fontSize: "7rem", fontWeight: 900, letterSpacing: "-0.05em",
                  color: "rgba(var(--accent-rgb), 0.07)", lineHeight: 1,
                  fontFamily: "var(--font-space), sans-serif",
                  marginBottom: 20, userSelect: "none",
                }}>
                  {items[active].num}
                </div>
                <h3 style={{
                  fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", fontWeight: 700,
                  color: "var(--fg)", letterSpacing: "-0.03em", marginBottom: 16,
                }}>
                  {items[active].title}
                </h3>
                <p style={{
                  fontSize: 14, color: "rgba(var(--fg-rgb), 0.45)",
                  lineHeight: 1.75, maxWidth: 300,
                }}>
                  {items[active].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #why-us > div > div:last-child { grid-template-columns: 1fr !important; gap: 40px !important; }
          #why-us > div > div:last-child > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
