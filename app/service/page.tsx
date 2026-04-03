import { Header } from "@/components/boty/header"
import { Hero } from "@/components/boty/hero"
import { TrustBadges } from "@/components/boty/trust-badges"
import { Services } from "@/components/boty/services"
import { FeatureSection } from "@/components/boty/feature-section"
import { WhatWeOffer } from "@/components/boty/what-we-offer"
import { Team } from "@/components/boty/team"
import { Testimonials } from "@/components/boty/testimonials"
import { CTABanner } from "@/components/boty/cta-banner"
import { Contact } from "@/components/boty/contact"
import { Footer } from "@/components/boty/footer"

export default function ServicePage() {
  return (
    <main>
      <Header mode="services" />
      <Hero />
      <TrustBadges />
      <Services />
      <FeatureSection />
      <WhatWeOffer />
      <Team />
      <Testimonials />
      <CTABanner />
      <Contact />
      <Footer mode="services" />
    </main>
  )
}
