"use client";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  const navBg = scrolled
    ? theme === "dark" ? "rgba(6,6,8,0.90)" : "rgba(248,248,246,0.92)"
    : "transparent";

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        background: navBg,
        transition: "all 0.3s",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <Image
              src={theme === "dark" ? "/images/logo-white.svg" : "/images/logo-black.svg"}
              alt="The Aha Company"
              height={28}
              width={160}
              style={{ objectFit: "contain", objectPosition: "left" }}
              priority
            />
          </a>

          <nav style={{ display: "flex", alignItems: "center", gap: 36 }} className="hidden-mobile">
            {links.map((l) => (
              <a key={l.href} href={l.href}
                style={{ fontSize: 13, fontWeight: 500, color: "var(--muted)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="hidden-mobile">
            <button
              onClick={toggleTheme}
              style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, color: "var(--muted)", cursor: "pointer", padding: "8px 10px", display: "flex", alignItems: "center", transition: "border-color 0.15s, color 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "var(--fg)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--subtle)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <a href="https://calendly.com/d/crt8-mrr-zy9/chat-with-aha-labs-30min" className="btn-primary" style={{ padding: "9px 20px", fontSize: 13 }}>
              Get a Demo
            </a>
          </div>

          <button
            className="show-mobile"
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", padding: 4 }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 40, background: "var(--bg)",
          paddingTop: 80, paddingLeft: 32, paddingRight: 32, display: "flex", flexDirection: "column", gap: 8
        }}>
          {links.map((l) => (
            <a key={l.href} href={l.href}
              onClick={() => setOpen(false)}
              style={{ fontSize: 24, fontWeight: 700, color: "var(--fg)", textDecoration: "none", padding: "12px 0", borderBottom: "1px solid var(--border)" }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <a href="https://calendly.com/d/crt8-mrr-zy9/chat-with-aha-labs-30min" className="btn-primary" onClick={() => setOpen(false)} style={{ flex: 1, justifyContent: "center" }}>
              Get a Demo
            </a>
            <button onClick={toggleTheme} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, color: "var(--muted)", cursor: "pointer", padding: "12px 16px", display: "flex", alignItems: "center" }}>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .hidden-mobile { display: flex !important; align-items: center; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: block !important; } }
      `}</style>
    </>
  );
}
