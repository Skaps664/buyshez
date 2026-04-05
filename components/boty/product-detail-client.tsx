"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronLeft, ExternalLink, ShoppingCart, Star } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/db/types"

type AccordionSection = "description" | "features" | "specifications" | "shipping"

interface ProductDetailClientProps {
  product: Product
}

function getBadge(product: Product) {
  if (product.is_on_sale) return "Sale"
  if (product.is_new) return "New"
  if (product.is_best_seller) return "Bestseller"
  return null
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [openAccordion, setOpenAccordion] = useState<AccordionSection | null>("description")

  const images = useMemo(() => {
    const gallery = (product.gallery_images || []).filter(Boolean)
    const merged = [product.image_url, ...gallery].filter(Boolean)
    return merged.length > 0 ? merged : ["/placeholder.svg"]
  }, [product.gallery_images, product.image_url])

  const toggleAccordion = (section: AccordionSection) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  const badge = getBadge(product)
  const stars = Math.max(0, Math.min(5, Math.round(product.rating)))
  const hasDiscount = product.original_price > product.sale_price

  const accordionItems: { key: AccordionSection; title: string; content: React.ReactNode }[] = [
    {
      key: "description",
      title: "Product Description",
      content: <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>,
    },
    {
      key: "features",
      title: "Key Features",
      content: (
        <ul className="space-y-2">
          {(product.key_features || []).length === 0 ? (
            <li className="text-sm text-muted-foreground">No key features added yet.</li>
          ) : (
            (product.key_features || []).map((feature, index) => (
              <li key={`${feature}-${index}`} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1 text-primary">•</span>
                <span>{feature}</span>
              </li>
            ))
          )}
        </ul>
      ),
    },
    {
      key: "specifications",
      title: "Specifications",
      content: <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground">{product.specifications || "No specifications added yet."}</pre>,
    },
    {
      key: "shipping",
      title: "Shipping & Returns",
      content: <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground">{product.shipping_returns || "No shipping and return details added yet."}</pre>,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header mode="store" />

      <div className="pb-16 pt-24 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/shop"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground boty-transition hover:text-foreground md:mb-8"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid gap-8 lg:grid-cols-2 md:gap-12 lg:gap-16">
            <div>
              <div className="boty-shadow relative mb-4 aspect-square overflow-hidden rounded-2xl bg-muted">
                <Image src={images[selectedImageIndex]} alt={product.name} fill className="object-cover" priority />
                {badge ? <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">{badge}</Badge> : null}
                {!product.in_stock ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <Badge variant="secondary" className="px-6 py-2 text-base">
                      Out of Stock
                    </Badge>
                  </div>
                ) : null}
              </div>

              {images.length > 1 ? (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`boty-transition relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-muted ${
                        selectedImageIndex === index ? "ring-2 ring-primary ring-offset-2" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={image} alt={`${product.name} view ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col">
              <div className="mb-6">
                <p className="mb-2 text-sm text-primary">{product.category?.name || "Uncategorized"}</p>
                <h1 className="mb-3 font-serif text-4xl text-foreground md:text-5xl">{product.name}</h1>
                <p className="mb-4 text-lg text-muted-foreground">{product.tagline}</p>

                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < stars ? "fill-primary text-primary" : "text-muted-foreground/40"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.rating.toFixed(1)} • {product.review_count} reviews)
                  </span>
                </div>
              </div>

              <div className="mb-8 flex items-center gap-3 border-b border-border/50 pb-8">
                <span className="text-3xl font-bold text-foreground md:text-4xl">£{product.sale_price}</span>
                {hasDiscount ? (
                  <>
                    <span className="text-lg text-muted-foreground line-through md:text-xl">£{product.original_price}</span>
                    <Badge variant="destructive">Save £{(product.original_price - product.sale_price).toFixed(2)}</Badge>
                  </>
                ) : null}
              </div>

              <div className="mb-6">
                {product.in_stock ? (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="font-medium text-green-600 dark:text-green-400">In Stock on eBay</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="font-medium text-red-600 dark:text-red-400">Currently Out of Stock</span>
                  </div>
                )}
              </div>

              <div className="mb-8 space-y-3 md:mb-10">
                <Button asChild size="lg" className="w-full gap-2 py-6 text-base text-white md:py-7 md:text-lg" disabled={!product.in_stock}>
                  <a href={product.ebay_link} target="_blank" rel="noopener noreferrer">
                    <ShoppingCart className="h-5 w-5" />
                    Buy Now on eBay
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <p className="px-2 text-center text-xs text-muted-foreground">Secure checkout • Protected by eBay Money Back Guarantee</p>
              </div>

              <div className="mb-10 grid grid-cols-3 gap-4 border-b border-border/50 pb-10">
                <div className="text-center">
                  <div className="mb-1 text-2xl">🚚</div>
                  <p className="text-xs text-muted-foreground">Fast Shipping</p>
                </div>
                <div className="text-center">
                  <div className="mb-1 text-2xl">🔒</div>
                  <p className="text-xs text-muted-foreground">Secure Payment</p>
                </div>
                <div className="text-center">
                  <div className="mb-1 text-2xl">↩️</div>
                  <p className="text-xs text-muted-foreground">30-Day Returns</p>
                </div>
              </div>

              <div className="space-y-0">
                {accordionItems.map((item) => (
                  <div key={item.key} className="border-b border-border/50">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.key)}
                      className="group flex w-full items-center justify-between py-5 text-left"
                    >
                      <span className="font-medium text-foreground boty-transition group-hover:text-primary">{item.title}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground boty-transition ${openAccordion === item.key ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div className={`overflow-hidden boty-transition ${openAccordion === item.key ? "max-h-[500px] pb-5" : "max-h-0"}`}>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer mode="store" />
    </main>
  )
}
