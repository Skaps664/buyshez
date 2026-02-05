import { Header } from "@/components/boty/header"
import { Hero } from "@/components/boty/hero"
import { TrustBadges } from "@/components/boty/trust-badges"
import { ShopShowcase } from "@/components/boty/shop-showcase"
import { ShopPopup } from "@/components/boty/shop-popup"
import { Services } from "@/components/boty/services"
import { FeatureSection } from "@/components/boty/feature-section"
import { WhatWeOffer } from "@/components/boty/what-we-offer"
import { Team } from "@/components/boty/team"
import { Testimonials } from "@/components/boty/testimonials"
import { CTABanner } from "@/components/boty/cta-banner"
import { Newsletter } from "@/components/boty/newsletter"
import { Contact } from "@/components/boty/contact"
import { Footer } from "@/components/boty/footer"

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustBadges />
      <ShopShowcase />
      <Services />
      <FeatureSection />
      <WhatWeOffer />
      <Team />
      <Testimonials />
      <CTABanner />
      {/* <Newsletter /> */}
      <Contact />
      <Footer />
      <ShopPopup />
    </main>
  )
}
