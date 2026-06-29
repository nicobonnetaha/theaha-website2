"use client";

const logos = [
  { src: "/images/partners/1.png", alt: "Stellar Development Foundation" },
  { src: "/images/partners/2.png", alt: "Société Générale FORGE" },
  { src: "/images/partners/3.png", alt: "Filecoin" },
  { src: "/images/partners/4.png", alt: "NEAR Protocol" },
  { src: "/images/partners/5.png", alt: "Cardano" },
  { src: "/images/partners/6.png", alt: "XRPL" },
  { src: "/images/partners/7.png", alt: "Ethereum" },
  { src: "/images/partners/8.png", alt: "Cosmos" },
  { src: "/images/partners/9.png", alt: "LI.FI" },
];

// Filter applied via CSS (see <style> block) to handle dark/light mode

export default function LogoTicker() {
  const items = [...logos, ...logos, ...logos];

  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "rgba(var(--fg-rgb), 0.015)",
        padding: "14px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 120,
        background: "linear-gradient(to right, var(--bg), transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 120,
        background: "linear-gradient(to left, var(--bg), transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />

      <div className="ticker-track">
        {items.map((logo, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0 56px",
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.alt}
              className="partner-logo"
              style={{ height: 64, width: "auto", display: "block", objectFit: "contain" }}
            />
          </span>
        ))}
      </div>

      <style>{`
        .partner-logo { filter: grayscale(1) invert(1) opacity(0.3); }
        [data-theme="light"] .partner-logo { filter: grayscale(1) opacity(0.35); }
      `}</style>
    </div>
  );
}
