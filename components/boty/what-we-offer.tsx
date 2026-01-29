"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2, Zap, Shield, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const offerings = [
  {
    title: "Startup Solutions",
    description: "From idea to market-ready product. We provide the full spectrum of services startups need: strategy, branding, development, and go-to-market support.",
    features: [
      "Business model validation",
      "MVP development",
      "Growth strategy",
      "Pitch deck & investor relations"
    ],
    image: "/images/offerings/startup.jpg"
  },
  {
    title: "SME Transformation",
    description: "Help established small and medium businesses modernize and scale. We streamline operations, improve digital presence, and unlock growth potential.",
    features: [
      "Digital infrastructure overhaul",
      "Process automation",
      "E-commerce solutions",
      "Team training & support"
    ],
    image: "/images/offerings/sme.jpg"
  },
  {
    title: "Enterprise Services",
    description: "Complex solutions for large organizations. Our enterprise-grade approach ensures security, scalability, and seamless integration with existing systems.",
    features: [
      "Custom software architecture",
      "Multi-team coordination",
      "Enterprise security",
      "24/7 support & maintenance"
    ],
    image: "/images/offerings/enterprise.jpg"
  },
  {
    title: "Digital-First Strategy",
    description: "Complete reimagining of your business model for the digital age. We help you understand your market, define your strategy, and execute flawlessly.",
    features: [
      "Market analysis & positioning",
      "Technology roadmap",
      "Change management",
      "Performance metrics & KPIs"
    ],
    image: "/images/offerings/strategy.jpg"
  }
]

const highlights = [
  {
    icon: Shield,
    title: "Security First",
    description: "All solutions built with enterprise-grade security protocols and compliance standards"
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Agile methodology ensures rapid iteration and quick time-to-market"
  },
  {
    icon: TrendingUp,
    title: "Scalable Architecture",
    description: "Solutions designed to grow with your business, not against it"
  }
]

export function WhatWeOffer() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [offeringsVisible, setOfferingsVisible] = useState(false)
  const [highlightsVisible, setHighlightsVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const offeringsRef = useRef<HTMLDivElement>(null)
  const highlightsRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const offeringsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOfferingsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const highlightsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHighlightsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (headerRef.current) {
      headerObserver.observe(headerRef.current)
    }

    if (offeringsRef.current) {
      offeringsObserver.observe(offeringsRef.current)
    }

    if (highlightsRef.current) {
      highlightsObserver.observe(highlightsRef.current)
    }

    return () => {
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current)
      }
      if (offeringsRef.current) {
        offeringsObserver.unobserve(offeringsRef.current)
      }
      if (highlightsRef.current) {
        highlightsObserver.unobserve(highlightsRef.current)
      }
    }
  }, [])

  return (
    <section id="offerings" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className={`text-sm tracking-[0.3em] uppercase text-primary mb-4 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
            What We Offer
          </span>
          <h2 className={`font-serif text-7xl leading-tight text-foreground mb-4 text-balance ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
            Tailored packages
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
            Whether you're a startup, SME, or enterprise, we have comprehensive solutions designed for your specific needs
          </p>
        </div>

        {/* Offerings Grid */}
        <div ref={offeringsRef} className="relative">
          {/* Left Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center shadow-lg hover:bg-background transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {/* Right Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 md:hidden w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center shadow-lg hover:bg-background transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          <div 
            ref={scrollRef}
            className="flex flex-row md:grid md:grid-cols-2 gap-6 mb-24 overflow-x-auto pb-4"
          >
            {offerings.map((offering, index) => (
              <div
                key={offering.title}
                className={`group transition-all duration-700 ease-out flex-shrink-0 md:flex-shrink w-80 md:w-auto ${
                  offeringsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: offeringsVisible ? `${index * 100}ms` : '0ms' }}
              >
                <div className="bg-background rounded-3xl overflow-hidden h-full boty-shadow boty-transition group-hover:scale-[1.02]">
                  {/* Image */}
                  <div className="relative w-full h-48 overflow-hidden bg-muted">
                    <Image
                      src={offering.image || "/placeholder.svg"}
                      alt={offering.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Title */}
                    <h3 className="font-serif text-2xl text-foreground mb-3">{offering.title}</h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6">{offering.description}</p>

                    {/* Features List */}
                    <div className="space-y-3">
                      {offering.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                          <span className="text-sm text-foreground/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div 
          ref={highlightsRef}
          className="grid md:grid-cols-3 gap-6"
        >
          {highlights.map((highlight, index) => (
            <div
              key={highlight.title}
              className={`group transition-all duration-700 ease-out ${
                highlightsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: highlightsVisible ? `${index * 80}ms` : '0ms' }}
            >
              <div className="bg-background rounded-2xl p-6 text-center boty-transition group-hover:scale-[1.05] h-full flex flex-col items-center justify-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 boty-transition">
                  <highlight.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
                <h4 className="font-serif text-xl text-foreground mb-2">{highlight.title}</h4>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
