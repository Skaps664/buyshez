"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Leaf, Flower2, Globe } from "lucide-react"

export function CTABanner() {
  const [isVisible, setIsVisible] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (bannerRef.current) {
      observer.observe(bannerRef.current)
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current)
      }
    }
  }, [])

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div 
          ref={bannerRef}
          className={`rounded-3xl p-12 md:p-16 flex flex-col justify-center relative overflow-hidden min-h-[400px] transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1537186121022-6b14d84aafea"
            alt="Business transformation"
            fill
            className="object-cover"
          />
          
          <div className="relative z-10 text-left max-w-2xl">
            <h3 className="text-4xl md:text-5xl text-white mb-4 lg:text-5xl">
              Transform Your
            </h3>
            <h3 className="text-3xl md:text-4xl lg:text-5xl text-white/70 mb-8">
              Business Today
            </h3>
            
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-3 text-white/90">
                <Leaf className="w-5 h-5 flex-shrink-0" strokeWidth={1} />
                <span className="text-base">Strategic Consulting</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Flower2 className="w-5 h-5 flex-shrink-0" strokeWidth={1} />
                <span className="text-base">Digital Solutions</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Globe className="w-5 h-5 flex-shrink-0" strokeWidth={1} />
                <span className="text-base">Growth Strategy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
