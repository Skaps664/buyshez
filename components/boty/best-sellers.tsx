"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BestSellerProduct {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number | null
  image: string
  badge: string | null
  inStock: boolean
}

interface BestSellersProps {
  products: BestSellerProduct[]
}

export function BestSellers({ products }: BestSellersProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollerRef.current) return

    const amount = Math.round(scrollerRef.current.clientWidth * 0.82)
    scrollerRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  if (products.length === 0) return null

  return (
    <section className="py-12 md:py-14 px-4 sm:px-6 lg:px-8 bg-background border-b border-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs md:text-sm uppercase tracking-[0.24em] text-primary mb-2">Top Picks</p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">Best Sellers</h2>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Scroll best sellers left"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border text-foreground/80 hover:text-foreground hover:bg-muted boty-transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Scroll best sellers right"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border text-foreground/80 hover:text-foreground hover:bg-muted boty-transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group bg-card rounded-2xl overflow-hidden boty-shadow hover:shadow-xl boty-transition border border-border/50"
            >
              <div className="relative aspect-square bg-muted overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 boty-transition"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    {product.badge}
                  </span>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary boty-transition line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{product.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-foreground">£{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">£{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div
          ref={scrollerRef}
          className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group min-w-[82%] sm:min-w-[46%] snap-start bg-card rounded-2xl overflow-hidden boty-shadow hover:shadow-xl boty-transition border border-border/50"
            >
              <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 boty-transition"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    {product.badge}
                  </span>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary boty-transition line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{product.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">£{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">£{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
