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

export default function Home() {
  return (
    <>
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
