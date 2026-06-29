import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoTicker from "@/components/LogoTicker";
import Stats from "@/components/Stats";
import About from "@/components/About";
import WhatWeDo from "@/components/WhatWeDo";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";
import Cases from "@/components/Cases";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://theaha-website2.vercel.app";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Aha Company",
  url: BASE,
  logo: `${BASE}/images/logo-black.svg`,
  description: "The Aha Company builds institutional-grade blockchain infrastructure — tokenization, stablecoins, cross-chain protocols, and developer tooling across Stellar, XRPL, Ethereum and Cosmos.",
  sameAs: [
    "https://github.com/theahaco",
    "https://linkedin.com/company/theahaco",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://calendly.com/d/crt8-mrr-zy9/chat-with-aha-labs-30min",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Aha Company",
  url: BASE,
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <Stats />
        <WhatWeDo />
        <WhyUs />
        <Cases />
        <About />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
