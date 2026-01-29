"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Recycle, Leaf, Flower2, Globe } from "lucide-react"

const features = [
  {
    icon: Recycle,
    title: "Agile Approach",
    description: "Flexible, iterative development cycles"
  },
  {
    icon: Leaf,
    title: "Full-Stack Expertise",
    description: "Backend, frontend, and everything in between"
  },
  {
    icon: Flower2,
    title: "Strategic Insight",
    description: "Deep understanding of your market and goals"
  },
  {
    icon: Globe,
    title: "Global Standards",
    description: "Enterprise-grade quality assurance"
  }
]

export function FeatureSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const bentoRef = useRef<HTMLDivElement>(null)
  const videoSectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (bentoRef.current) {
      observer.observe(bentoRef.current)
    }

    if (videoSectionRef.current) {
      videoObserver.observe(videoSectionRef.current)
    }

    if (headerRef.current) {
      headerObserver.observe(headerRef.current)
    }

    return () => {
      if (bentoRef.current) {
        observer.unobserve(bentoRef.current)
      }
      if (videoSectionRef.current) {
        videoObserver.unobserve(videoSectionRef.current)
      }
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current)
      }
    }
  }, [])

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Bento Grid */}
        <div 
          ref={bentoRef}
          className="grid md:grid-cols-4 mb-20 md:grid-rows-[300px_300px] gap-6"
        >
          {/* Left Large Block - Video with Overlay Card */}
          <div 
            className={`relative rounded-3xl overflow-hidden h-[500px] md:h-auto md:col-span-2 md:row-span-2 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="https://www.pexels.com/download/video/3205674/"/>
            </video>
            {/* Overlay Card */}
            <div className="absolute bottom-8 left-8 right-8 bg-white p-6 shadow-lg rounded-xl">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  
                </div>
                <div>
                  <h3 className="text-xl text-foreground mb-2 font-medium">
                    Strategic <span className="">Solutions</span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tailored consulting and development services designed for your specific business needs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Right - 100% Natural */}
          <div 
            className={`rounded-3xl p-6 md:p-8 flex flex-col justify-center md:col-span-2 relative overflow-hidden transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {/* Background Image */}
            <Image
              src="https://images.unsplash.com/photo-1758691737421-86dd84bd2951"
              alt="Digital transformation"
              fill
              className="object-cover"
            />

            
            <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl text-white mb-2">
              Strategic
            </h3>
            <h3 className="text-2xl md:text-3xl text-white/70 mb-4">
              Digital Transformation
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Leaf className="w-4 h-4 flex-shrink-0" />
                <span>Business Consulting</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Flower2 className="w-4 h-4 flex-shrink-0" />
                <span>Custom Development</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <span>Growth Strategy</span>
              </div>
            </div>
            </div>
          </div>

          {/* Bottom Right - Eco-Friendly Packaging */}
          <div 
            className={`rounded-3xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden md:col-span-2 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Background Video */}
            <Image
              
              className="object-cover"
              alt="Digital transformation"
              fill
              src="https://images.unsplash.com/photo-1748255882537-cbe88b145305"
            >
              
            </Image>
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-transparent" />
            
            <div className="relative z-10 flex flex-col justify-center h-full text-left items-start">
              <div className="inline-flex items-center justify-center w-10 h-10 mb-3">
                <Recycle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-sans text-base mb-1 text-white">
                Enterprise
              </h3>
              <h3 className="text-2xl md:text-3xl mb-2 text-white">
                Quality
              </h3>
            </div>
          </div>
        </div>

        <div 
          ref={videoSectionRef}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center my-0 py-20"
        >
          {/* Video */}
          <div 
            className={`relative aspect-[4/5] rounded-3xl overflow-hidden boty-shadow transition-all duration-700 ease-out ${
              isVideoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="https://www.pexels.com/download/video/7687995/" type="video/mp4" />
            </video>
          </div>

          {/* Content */}
          <div
            ref={headerRef}
            className={`transition-all duration-700 ease-out ${
              isVideoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <span className={`text-sm tracking-[0.3em] uppercase text-primary mb-4 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
              Why buyshez
            </span>
            <h2 className={`font-serif text-4xl leading-tight text-foreground mb-6 text-balance md:text-7xl ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
              Partnership that delivers.
            </h2>
            <p className={`text-lg text-muted-foreground leading-relaxed mb-10 max-w-md ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
              We combine strategic thinking with technical excellence. Every solution is built to scale, deliver results, and support your business growth.
            </p>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group p-5 boty-transition hover:scale-[1.02] rounded-md bg-white"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 group-hover:bg-primary/20 boty-transition bg-stone-50">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
