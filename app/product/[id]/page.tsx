"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft, ChevronDown, ExternalLink, Star, ShoppingCart } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock product data - will be replaced with Sanity CMS
// TO-DO: Replace with Sanity CMS data fetching
const mockProducts: Record<string, {
  id: string
  name: string
  description: string
  fullDescription: string
  price: number
  originalPrice: number | null
  images: string[]
  badge: string | null
  category: string
  brand: string
  inStock: boolean
  ebayUrl: string
  features: string[]
  specifications: Record<string, string>
}> = {
  "premium-laptop-stand": {
    id: "premium-laptop-stand",
    name: "Laptop Stand",
    description: "Ergonomic aluminum design",
    fullDescription: "Elevate your workspace with our Laptop Stand. Crafted from high-grade aluminum alloy, this stand offers superior stability and heat dissipation. The ergonomic design promotes better posture and reduces neck strain during long work sessions.",
    price: 89,
    originalPrice: 120,
    images: [
      "/images/products/serum-bottles-1.png",
      "/images/products/eye-serum-bottles.png",
      "/images/products/amber-dropper-bottles.png"
    ],
    badge: "Bestseller",
    category: "tech-accessories",
    brand: "TechPro",
    inStock: true,
    ebayUrl: "https://ebay.com/item/premium-laptop-stand",
    features: [
      "Adjustable height (2-6 inches)",
      "360° rotating base",
      "Non-slip silicone pads",
      "Cable management system",
      "Supports laptops up to 17 inches"
    ],
    specifications: {
      "Material": "Aluminum Alloy",
      "Weight": "1.5 lbs",
      "Dimensions": "10 x 9 x 6 inches",
      "Color": "Space Gray",
      "Warranty": "2 Years"
    }
  },
  "radiance-serum": {
    id: "radiance-serum",
    name: "Radiance Serum",
    description: "Vitamin C brightening formula",
    fullDescription: "A lightweight, fast-absorbing serum infused with Vitamin C and botanical extracts. Designed to brighten, even skin tone, and reveal your skin's natural radiance. Perfect for daily use.",
    price: 68,
    originalPrice: null,
    images: [
      "/images/products/serum-bottles-1.png",
      "/images/products/spray-bottles.png"
    ],
    badge: "Bestseller",
    category: "skincare",
    brand: "BuyShez Beauty",
    inStock: true,
    ebayUrl: "https://ebay.com/item/radiance-serum",
    features: [
      "15% stabilized Vitamin C",
      "Brightens dark spots",
      "Anti-aging properties",
      "Suitable for all skin types",
      "Dermatologist tested"
    ],
    specifications: {
      "Volume": "30ml / 1 fl oz",
      "Key Ingredients": "Vitamin C, Hyaluronic Acid, Niacinamide",
      "Skin Type": "All Types",
      "Application": "Morning & Evening",
      "Shelf Life": "12 months after opening"
    }
  },
  "wireless-keyboard": {
    id: "wireless-keyboard",
    name: "Wireless Mechanical Keyboard",
    description: "RGB backlit with blue switches",
    fullDescription: "Experience quality typing with our wireless mechanical keyboard. Featuring custom blue switches for tactile feedback, RGB backlighting, and multi-device connectivity. Perfect for both gaming and productivity.",
    price: 129,
    originalPrice: null,
    images: [
      "/images/products/eye-serum-bottles.png",
      "/images/products/amber-dropper-bottles.png"
    ],
    badge: "New",
    category: "tech-accessories",
    brand: "KeyMaster",
    inStock: true,
    ebayUrl: "https://ebay.com/item/wireless-keyboard",
    features: [
      "Mechanical blue switches",
      "RGB per-key backlighting",
      "Wireless Bluetooth 5.0",
      "80 hours battery life",
      "Multi-device pairing (up to 3 devices)"
    ],
    specifications: {
      "Switch Type": "Blue Mechanical",
      "Connectivity": "Bluetooth 5.0 & USB-C",
      "Battery": "4000mAh rechargeable",
      "Dimensions": "17.5 x 5 x 1.5 inches",
      "Compatibility": "Windows, Mac, iOS, Android"
    }
  }
}

type AccordionSection = "description" | "features" | "specifications" | "shipping"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = mockProducts[productId] || mockProducts["premium-laptop-stand"]

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [openAccordion, setOpenAccordion] = useState<AccordionSection | null>("description")

  const toggleAccordion = (section: AccordionSection) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  const accordionItems: { key: AccordionSection; title: string; content: React.ReactNode }[] = [
    {
      key: "description",
      title: "Product Description",
      content: <p className="text-sm text-muted-foreground leading-relaxed">{product.fullDescription}</p>
    },
    {
      key: "features",
      title: "Key Features",
      content: (
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )
    },
    {
      key: "specifications",
      title: "Specifications",
      content: (
        <dl className="space-y-2">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <dt className="text-muted-foreground">{key}:</dt>
              <dd className="text-foreground font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      )
    },
    {
      key: "shipping",
      title: "Shipping & Returns",
      content: (
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• Ships directly from our verified eBay store</p>
          <p>• Standard shipping: 3-5 business days</p>
          <p>• Express shipping available at checkout</p>
          <p>• 30-day return policy on eBay</p>
          <p>• Secure payment processing via eBay</p>
        </div>
      )
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 md:pt-28 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground boty-transition mb-6 md:mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted mb-4 boty-shadow">
                <Image
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.badge && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    {product.badge}
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge variant="secondary" className="text-base px-6 py-2">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer boty-transition ${
                        selectedImageIndex === index
                          ? "ring-2 ring-primary ring-offset-2"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Header */}
              <div className="mb-6">
                <p className="text-sm text-primary mb-2">{product.brand}</p>
                <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-3">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">
                  {product.description}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(4.8 • 156 reviews on eBay)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border/50">
                <span className="text-3xl md:text-4xl font-bold text-foreground">£{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg md:text-xl text-muted-foreground line-through">
                      £{product.originalPrice}
                    </span>
                    <Badge variant="destructive">
                      Save £{product.originalPrice - product.price}
                    </Badge>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-green-600 dark:text-green-400 font-medium">In Stock on eBay</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-red-600 dark:text-red-400 font-medium">Currently Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Buy Now Button */}
              <div className="space-y-3 mb-8 md:mb-10">
                <Button
                  asChild
                  size="lg"
                  className="w-full text-base md:text-lg py-6 md:py-7 gap-2 text-white"
                  disabled={!product.inStock}
                >
                  <a
                    href={product.ebayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now on eBay
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <p className="text-xs text-center text-muted-foreground px-2">
                  Secure checkout • Protected by eBay Money Back Guarantee
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mb-10 pb-10 border-b border-border/50">
                <div className="text-center">
                  <div className="text-2xl mb-1">🚚</div>
                  <p className="text-xs text-muted-foreground">Fast Shipping</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🔒</div>
                  <p className="text-xs text-muted-foreground">Secure Payment</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">↩️</div>
                  <p className="text-xs text-muted-foreground">30-Day Returns</p>
                </div>
              </div>

              {/* Accordion */}
              <div className="space-y-0">
                {accordionItems.map((item) => (
                  <div key={item.key} className="border-b border-border/50">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.key)}
                      className="w-full flex items-center justify-between py-5 text-left group"
                    >
                      <span className="font-medium text-foreground group-hover:text-primary boty-transition">
                        {item.title}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground boty-transition ${
                          openAccordion === item.key ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden boty-transition ${
                        openAccordion === item.key ? "max-h-[500px] pb-5" : "max-h-0"
                      }`}
                    >
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
