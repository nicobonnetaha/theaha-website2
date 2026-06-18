"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CX = 200, CY = 200, MAX_R = 215;

function polar(angleDeg: number, r: number) {
  const a = (angleDeg - 90) * Math.PI / 180;
  return { cx: +(CX + r * Math.cos(a)).toFixed(1), cy: +(CY + r * Math.sin(a)).toFixed(1) };
}

function distC(cx: number, cy: number) { return Math.hypot(cx - CX, cy - CY); }

function nodeOp(cx: number, cy: number) {
  return +Math.max(0.04, Math.pow(Math.max(0, 1 - distC(cx, cy) / MAX_R), 0.85)).toFixed(3);
}

function edgeOp(ax: number, ay: number, bx: number, by: number, active = false) {
  const avg = (distC(ax, ay) + distC(bx, by)) / 2;
  const base = Math.pow(Math.max(0, 1 - avg / MAX_R), 1.5);
  return +Math.max(0.015, base * (active ? 0.7 : 0.38)).toFixed(3);
}

const CENTER = { id: 0, cx: CX, cy: CY, r: 7 };
const L1 = [0,60,120,180,240,300].map((a, i) => ({ id: i+1, ...polar(a, 75), r: 5 }));
const L2 = [30,90,150,210,270,330].map((a, i) => ({ id: i+7, ...polar(a, 138), r: 3.5 }));
const L3 = [0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => ({ id: i+13, ...polar(a, 200), r: 2.5 }));

const NODES = [CENTER, ...L1, ...L2, ...L3];

type Node = typeof NODES[0];
type Edge = { a: Node; b: Node; active: boolean };

function mkEdge(aid: number, bid: number, active = false): Edge {
  return { a: NODES[aid], b: NODES[bid], active };
}

const EDGES: Edge[] = [
  // Center → L1 (animated)
  ...L1.map(n => mkEdge(0, n.id, true)),
  // L1 ring
  ...L1.map((n, i) => mkEdge(n.id, L1[(i+1)%6].id)),
  // L1 → L2
  ...L1.flatMap((n, i) => [mkEdge(n.id, L2[i].id), mkEdge(n.id, L2[(i+5)%6].id)]),
  // L2 ring
  ...L2.map((n, i) => mkEdge(n.id, L2[(i+1)%6].id)),
  // L2 → L3
  ...L2.flatMap((n, i) => [
    mkEdge(n.id, L3[i*2].id),
    mkEdge(n.id, L3[(i*2+1)%12].id),
    mkEdge(n.id, L3[(i*2+2)%12].id),
  ]),
  // L3 ring (sparse)
  ...L3.filter((_, i) => i%2===0).map((_, i) => mkEdge(L3[i*2].id, L3[(i*2+1)%12].id)),
];


export default function Hero() {
  return (
    <section className="grid-bg" style={{ minHeight: "100vh", padding: "0 32px", paddingTop: 100, overflow: "hidden", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", minHeight: "calc(100vh - 100px)", display: "flex", alignItems: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", width: "100%", paddingBottom: 60 }}>

          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ marginBottom: 40, display: "flex", alignItems: "center", gap: 12 }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", letterSpacing: "0.08em" }}>
                Trusted by Stellar Development Foundation
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: "clamp(3.2rem, 5.5vw, 5.8rem)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.04em", color: "var(--fg)", marginBottom: 32 }}
            >
              Blockchain<br />
              Solutions<br />
              <span style={{ color: "var(--accent)" }}>Built to Last</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
              style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.65, maxWidth: 480, marginBottom: 48, fontWeight: 400 }}
            >
              The Aha Company unlocks next-generation financial infrastructure for top-tier banks & institutions. From stablecoin rails to tokenized funds, we design and deploy the systems that make it real.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24, ease: "easeOut" }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <a href="https://calendly.com/d/crt8-mrr-zy9/chat-with-aha-labs-30min" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Get a Demo <ArrowRight size={15} />
              </a>
              <a href="#work" className="btn-ghost">View Case Studies</a>
            </motion.div>

            <div className="line" style={{ marginTop: 64 }} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.32 }}
              style={{ display: "flex", gap: 40, marginTop: 24, flexWrap: "wrap" }}
            >
              {["Stellar", "XRPL", "Ethereum", "Cosmos"].map((c) => (
                <span key={c} style={{ fontSize: 13, color: "var(--subtle)", fontWeight: 500, letterSpacing: "0.05em" }}>{c}</span>
              ))}
            </motion.div>
          </div>

          {/* Right: radial network graph */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <svg viewBox="0 0 400 400" width="100%" style={{ maxWidth: 460 }} aria-hidden>

              {/* Edges */}
              {EDGES.map((edge, i) => (
                <line
                  key={i}
                  x1={edge.a.cx} y1={edge.a.cy}
                  x2={edge.b.cx} y2={edge.b.cy}
                  stroke={edge.active ? "var(--accent)" : "var(--fg)"}
                  strokeOpacity={edgeOp(edge.a.cx, edge.a.cy, edge.b.cx, edge.b.cy, edge.active)}
                  strokeWidth={edge.active ? 1.2 : 0.8}
                />
              ))}


              {/* Nodes */}
              {NODES.map((n) => (
                <circle key={n.id} cx={n.cx} cy={n.cy} r={n.r} fill="var(--accent)" opacity={nodeOp(n.cx, n.cy)} />
              ))}
            </svg>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          section > div > div > div:last-child { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
}
