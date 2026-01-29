"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Zap, PenTool, TrendingUp, Briefcase, Smartphone } from "lucide-react"

const services = [
  {
    icon: Briefcase,
    title: "Business Consultation",
    description: "Strategic guidance for startups and established businesses. We help you identify opportunities, navigate challenges, and build scalable operations."
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing & Growth",
    description: "Data-driven marketing strategies that drive leads and revenue. From SEO to content strategy, we deliver measurable results."
  },
  {
    icon: Code2,
    title: "Software Development",
    description: "Custom web and mobile applications built with modern technologies. Scalable, secure, and user-focused solutions for your business."
  },
  {
    icon: Zap,
    title: "Project & Product Management",
    description: "Expert management of your digital initiatives. We ensure on-time delivery, clear communication, and alignment with your business goals."
  },
  {
    icon: PenTool,
    title: "Design & Branding",
    description: "UI/UX design, graphic design, and complete branding solutions. We create visual identities that resonate with your audience."
  },
  {
    icon: Smartphone,
    title: "Web & App Development",
    description: "Full-stack development services for websites and applications. From concept to deployment, we handle it all with precision."
  }
]

export function Services() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (headerRef.current) {
      headerObserver.observe(headerRef.current)
    }

    if (gridRef.current) {
      gridObserver.observe(gridRef.current)
    }

    return () => {
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current)
      }
      if (gridRef.current) {
        gridObserver.unobserve(gridRef.current)
      }
    }
  }, [])

  return (
    <section id="services" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className={`text-sm tracking-[0.3em] uppercase text-primary mb-4 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
            Our Services
          </span>
          <h2 className={`font-serif leading-tight text-foreground mb-4 text-balance text-7xl ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
            Complete solutions
          </h2>
          <p className={`text-lg text-muted-foreground max-w-md mx-auto ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
            From consulting to development, we offer everything you need to succeed digitally
          </p>
        </div>

        {/* Services Grid */}
        <div 
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 80}ms` : '0ms' }}
            >
              <div className="bg-background rounded-3xl p-8 h-full boty-shadow boty-transition group-hover:scale-[1.02]">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 boty-transition">
                  <service.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl text-foreground mb-3">{service.title}</h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
