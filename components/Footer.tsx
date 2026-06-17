"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const links = {
  Company: [
    { label: "Services", href: "/#services" },
    { label: "Case Studies", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Blog", href: "/blog" },
  ],
  Contact: [
    { label: "hello@theaha.co", href: "mailto:hello@theaha.co" },
    { label: "GitHub", href: "https://github.com/theahacompany", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/company/theahacompany", external: true },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

type LinkItem = { label: string; href: string; external?: boolean };

export default function Footer() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const update = () => setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "80px 32px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 64 }}>
          <div>
            <a href="/" style={{ display: "inline-block", marginBottom: 16 }}>
              <Image
                src={theme === "light" ? "/images/logo-black.svg" : "/images/logo-white.svg"}
                alt="The Aha Company"
                width={140}
                height={24}
                style={{ objectFit: "contain", objectPosition: "left" }}
              />
            </a>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, maxWidth: 200 }}>
              Blockchain solutions built to last.
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: "var(--subtle)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>
                {category}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {(items as LinkItem[]).map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="hover-color"
                      style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: 32, flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "var(--subtle)" }}>© 2025 The Aha Company. All rights reserved.</p>
          <p style={{ fontSize: 12, color: "var(--subtle)" }}>Built on-chain. Shipped to prod.</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
          footer > div > div:first-child > div:first-child { grid-column: 1 / -1; }
        }
      `}</style>
    </footer>
  );
}
