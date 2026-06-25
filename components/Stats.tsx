"use client";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { value: 7, suffix: "+", label: "Chains" },
  { value: 20, suffix: "+", label: "Projects shipped" },
  { value: 20, suffix: "M+", prefix: "$", label: "Stablecoins issued onchain" },
  { value: 100, suffix: "M+", prefix: "€", label: "Funds tokenized" },
];

function Counter({ target, suffix, prefix = "" }: { target: number | string; suffix: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState<number | string>(typeof target === "number" ? 0 : target);

  useEffect(() => {
    if (typeof target !== "number" || !inView) return;
    let start = 0;
    const duration = 1600;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section ref={ref} style={{ padding: "100px 32px", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "48px 40px",
                background: hovered === i
                  ? "linear-gradient(135deg, rgba(var(--accent-rgb), 0.12) 0%, rgba(var(--accent-rgb), 0.04) 100%)"
                  : "var(--card-bg)",
                border: "1px solid var(--border)",
                borderRadius: i === 0 ? "12px 0 0 12px" : i === 3 ? "0 12px 12px 0" : "0",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(16px)",
                transition: `opacity 0.5s ${i * 0.1}s ease, transform 0.5s ${i * 0.1}s ease, background 0.25s ease`,
                cursor: "default",
              }}
            >
              <div style={{
                fontSize: "clamp(2.4rem, 3.5vw, 3.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: hovered === i ? "var(--accent)" : "var(--fg)",
                marginBottom: 12,
                lineHeight: 1,
                transition: "color 0.25s ease",
              }}>
                <Counter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p style={{
                fontSize: 13,
                color: "var(--muted)",
                lineHeight: 1.6,
                fontWeight: 500,
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
