"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react"

const featuredProducts = [
  {
    id: "premium-laptop-stand",
    name: "Laptop Stand",
    description: "Ergonomic aluminum design",
    price: 89,
    originalPrice: 120,
    image: "/images/products/serum-bottles-1.png",
    badge: "Bestseller"
  },
  {
    id: "wireless-keyboard",
    name: "Wireless Mechanical Keyboard",
    description: "RGB backlit with blue switches",
    price: 129,
    image: "/images/products/eye-serum-bottles.png",
    badge: "New"
  },
  {
    id: "noise-cancelling-headphones",
    name: "Noise Cancelling Headphones",
    description: "High-quality audio experience",
    price: 299,
    originalPrice: 349,
    image: "/images/products/amber-dropper-bottles.png",
    badge: "Sale"
  },
  {
    id: "radiance-serum",
    name: "Radiance Serum",
    description: "Vitamin C brightening formula",
    price: 68,
    image: "/images/products/spray-bottles.png",
    badge: "Popular"
  }
]

export function ShopShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">BuyShez Shop</span>
          </div>
          
          <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Quality Products,
            <br />
            <span className="text-primary">Curated Just for You</span>
          </h2>
          
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto mb-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Discover our handpicked selection of tech, accessories, and lifestyle products. All available for instant purchase on eBay.
          </p>

          <Link
            href="/shop"
            className={`inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-primary/90 boty-shadow transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            Browse All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className={`group bg-card rounded-2xl overflow-hidden boty-shadow hover:shadow-xl boty-transition transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-muted overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 boty-transition duration-500"
                />
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
                    product.badge === "Sale" 
                      ? "bg-red-500 text-white" 
                      : product.badge === "New"
                      ? "bg-blue-500 text-white"
                      : product.badge === "Popular"
                      ? "bg-purple-500 text-white"
                      : "bg-primary text-primary-foreground"
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary boty-transition line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                  {product.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-foreground">
                    £{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      £{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-muted-foreground mb-4">
            Trusted by thousands • Secure eBay checkout • Fast UK shipping
          </p>
        </div>
      </div>
    </section>
  )
}
