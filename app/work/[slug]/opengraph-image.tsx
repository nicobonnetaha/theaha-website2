import { ImageResponse } from "next/og";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {} as Record<string, string>;
  const meta: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const [key, ...val] = line.split(": ");
    if (key) meta[key.trim()] = val.join(": ").trim().replace(/^"|"$/g, "");
  });
  return meta;
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = join(process.cwd(), "content/cases", `${slug}.mdx`);
  const meta = existsSync(filePath) ? parseFrontmatter(readFileSync(filePath, "utf-8")) : {};

  const title = meta.title || "Case Study";
  const category = meta.category || "Blockchain";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#6366f1", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Case Study · {category}
          </span>
          <span style={{ fontSize: 56, fontWeight: 900, color: "#f4f4f5", lineHeight: 1.1, letterSpacing: "-0.03em", maxWidth: 900 }}>
            {title}
          </span>
          {meta.excerpt && (
            <span style={{ fontSize: 22, color: "#a1a1aa", lineHeight: 1.5, maxWidth: 800 }}>
              {meta.excerpt}
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: "#f4f4f5", letterSpacing: "-0.02em" }}>
            The Aha Company
          </span>
          <span style={{ fontSize: 16, color: "#71717a" }}>theaha.co</span>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "#6366f1", display: "flex" }} />
      </div>
    ),
    { ...size }
  );
}
