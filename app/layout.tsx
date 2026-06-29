import type { Metadata } from "next";
import { Space_Grotesk, Spectral } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
});

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://theaha-website2.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "The Aha Company, Blockchain Solutions Built to Last",
    template: "%s, The Aha Company",
  },
  description: "The Aha Company bridges institutions and startups with blockchain. Developer tooling, tokenization, and DeFi, compliance-ready solutions across Stellar, XRPL, Ethereum & Cosmos.",
  metadataBase: new URL(BASE),
  openGraph: {
    siteName: "The Aha Company",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@theahaco",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spectral.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{__html: `
          (function() {
            try {
              var t = localStorage.getItem('aha-theme');
              if (t !== 'dark') document.documentElement.setAttribute('data-theme', 'light');
            } catch(e) {
              document.documentElement.setAttribute('data-theme', 'light');
            }
          })();
        `}} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
