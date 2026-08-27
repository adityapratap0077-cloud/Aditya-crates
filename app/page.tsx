"use client";

import dynamic from "next/dynamic";

const GlassOverlay = dynamic(() => import("@/components/Hero/GlassOverlay"), { ssr: false });
const HeroScrollSequence = dynamic(() => import("@/components/HeroScrollSequence"), { ssr: false });
const ProductGrid = dynamic(() => import("@/components/Shop/ProductGrid"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
import TrustedSection from "@/components/TrustedSection";
import ProductReviews from "@/components/Shop/Reviews/ProductReviews";
import CreatorProfile from "@/components/About/CreatorProfile";
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  // JSON-LD: WebSite + Organization structured data
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aditya Creates",
    url: "https://adityacreates.com",
    description:
      "Shop premium digital assets: reel bundles, Canva templates, courses, eBooks, Lightroom presets, AI prompts, and more.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://adityacreates.com/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aditya Creates",
    url: "https://adityacreates.com",
    logo: "https://adityacreates.com/favicon.ico",
    sameAs: [],
    description:
      "Premium digital assets marketplace for content creators. Reel bundles, templates, courses, and more.",
  };

  return (
    <main className="relative bg-background-dark min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <Navbar />

      {/* The Anti-Gravity Engine (HeroScrollSequence) */}
      <HeroScrollSequence>
        {/* Scrollytelling Overlay passed as children */}
        <GlassOverlay />
      </HeroScrollSequence>

      {/* Store Section (appears after the scroll sequence) */}
      <section id="products-section" aria-label="Digital Asset Collection" className="relative z-10 bg-background-dark/80 backdrop-blur-xl border-t border-white/10">
        <ProductGrid />
        <ProductReviews />
      </section>

      <section id="trusted-section" aria-label="Trusted by Creators">
        <TrustedSection />
      </section>

      <section id="about-section" aria-label="About the Creator">
        <CreatorProfile />
      </section>

      <Footer />
    </main>
  );
}
