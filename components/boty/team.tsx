"use client"

import { useEffect, useRef, useState } from "react"
import { Users, Award, Target, Lightbulb } from "lucide-react"
import Image from "next/image"

const teamMembers = [
  {
    name: "Shoaib Khan",
    role: "Founder CEO and Graphic Designer",
    description: "Leading the company with visionary strategies and exceptional graphic design expertise.",
    image: "/images/team/shoaib.jpg"
  },
  {
    name: "Sudais",
    role: "Lead Software Development",
    description: "Driving software innovation and leading development teams to build robust, scalable solutions.",
    image: "/images/team/sudais.jpg"
  },
  {
    name: "Omer",
    role: "Lead AI ML development",
    description: "Spearheading AI and machine learning initiatives to create intelligent, data-driven applications.",
    image: "/images/team/omer.jpg"
  },
  {
    name: "And 10+ More",
    role: "Talented Team Members",
    description: "Our extended team of skilled professionals across design, development, marketing, and operations.",
    image: "/images/team/more.jpg"
  }
]

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "We measure success by your business outcomes, not activity"
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Enterprise-grade quality in every deliverable"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Forward-thinking solutions that anticipate market needs"
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work with you, not for you"
  }
]

export function Team() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [membersVisible, setMembersVisible] = useState(false)
  const [valuesVisible, setValuesVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const membersRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const membersObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMembersVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const valuesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setValuesVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (headerRef.current) {
      headerObserver.observe(headerRef.current)
    }

    if (membersRef.current) {
      membersObserver.observe(membersRef.current)
    }

    if (valuesRef.current) {
      valuesObserver.observe(valuesRef.current)
    }

    return () => {
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current)
      }
      if (membersRef.current) {
        membersObserver.unobserve(membersRef.current)
      }
      if (valuesRef.current) {
        valuesObserver.unobserve(valuesRef.current)
      }
    }
  }, [])

  return (
    <section id="team" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className={`text-sm tracking-[0.3em] uppercase text-primary mb-4 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
            Our Team
          </span>
          <h2 className={`font-serif text-7xl leading-tight text-foreground mb-4 text-balance ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
            Exceptional talent
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
            A diverse team of strategists, developers, designers, and managers working together to deliver your success
          </p>
        </div>

        {/* Team Members */}
        <div 
          ref={membersRef}
          className="flex flex-row gap-6 mb-20 overflow-x-auto pb-4"
        >
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`group transition-all duration-700 ease-out flex-shrink-0 w-80 ${
                membersVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: membersVisible ? `${index * 100}ms` : '0ms' }}
            >
              <div className="bg-card rounded-3xl overflow-hidden h-full boty-shadow boty-transition group-hover:scale-[1.02]">
                {/* Image */}
                <div className="relative w-full h-64 overflow-hidden bg-muted">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Title */}
                  <h3 className="font-serif text-2xl text-foreground mb-2">{member.name}</h3>
                  
                  {/* Role */}
                  <p className="text-sm text-primary tracking-widest uppercase mb-4">{member.role}</p>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div>
          <h3 className="font-serif text-4xl text-foreground mb-12 text-center">Core Values</h3>
          <div 
            ref={valuesRef}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`group transition-all duration-700 ease-out ${
                  valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: valuesVisible ? `${index * 80}ms` : '0ms' }}
              >
                <div className="bg-card rounded-2xl p-6 text-center boty-transition group-hover:scale-[1.05]">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 boty-transition mx-auto">
                    <value.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-serif text-lg text-foreground mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
