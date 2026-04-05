"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Search, SlidersHorizontal, ShoppingBag } from "lucide-react"
import { BestSellers } from "@/components/boty/best-sellers"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { Category, Product, SiteContent } from "@/lib/db/types"

interface ShopPageClientProps {
  products: Product[]
  categories: Category[]
  topBestSellers: Product[]
  siteContent: SiteContent
}

const priceRanges = [
  { id: "0-50", label: "Under £50", min: 0, max: 50 },
  { id: "50-100", label: "£50 - £100", min: 50, max: 100 },
  { id: "100-200", label: "£100 - £200", min: 100, max: 200 },
  { id: "200+", label: "£200+", min: 200, max: Infinity },
]

function resolveBadge(product: Product) {
  if (product.is_on_sale) return "Sale"
  if (product.is_new) return "New"
  if (product.is_best_seller) return "Bestseller"
  return null
}

export function ShopPageClient({ products, categories, topBestSellers, siteContent }: ShopPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([])
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filterCategories = [{ id: "all", label: "All Products" }, ...categories.map((c) => ({ id: c.id, label: c.name }))]

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "all" || product.category_id === selectedCategory

      const matchesPrice =
        selectedPriceRange.length === 0 ||
        selectedPriceRange.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId)
          return range && product.sale_price >= range.min && product.sale_price < range.max
        })

      const matchesStock = !showInStockOnly || product.in_stock

      return matchesSearch && matchesCategory && matchesPrice && matchesStock
    })
  }, [products, searchQuery, selectedCategory, selectedPriceRange, showInStockOnly])

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) + selectedPriceRange.length + (showInStockOnly ? 1 : 0)

  const bestSellerProducts = useMemo(() => {
    const mapped = topBestSellers.map((product) => ({
      id: product.slug,
      name: product.name,
      description: product.tagline,
      price: product.sale_price,
      originalPrice: product.original_price,
      image: product.image_url,
      badge: resolveBadge(product),
      inStock: product.in_stock,
    }))

    if (mapped.length >= 4) return mapped.slice(0, 4)

    const fallback = products
      .filter((product) => !mapped.some((item) => item.id === product.slug))
      .slice(0, 4 - mapped.length)
      .map((product) => ({
        id: product.slug,
        name: product.name,
        description: product.tagline,
        price: product.sale_price,
        originalPrice: product.original_price,
        image: product.image_url,
        badge: resolveBadge(product),
        inStock: product.in_stock,
      }))

    return [...mapped, ...fallback]
  }, [products, topBestSellers])

  const togglePriceRange = (rangeId: string) => {
    setSelectedPriceRange((prev) => (prev.includes(rangeId) ? prev.filter((r) => r !== rangeId) : [...prev, rangeId]))
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedPriceRange([])
    setShowInStockOnly(false)
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-foreground">Category</h3>
        <div className="space-y-2">
          {filterCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full rounded-lg px-4 py-2.5 text-left text-sm boty-transition ${
                selectedCategory === category.id
                  ? "bg-primary font-medium text-primary-foreground"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border/50 pt-4">
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-foreground">Price Range</h3>
        <div className="space-y-2.5">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center gap-2.5">
              <Checkbox
                id={`price-${range.id}`}
                checked={selectedPriceRange.includes(range.id)}
                onCheckedChange={() => togglePriceRange(range.id)}
              />
              <Label htmlFor={`price-${range.id}`} className="cursor-pointer text-sm text-foreground/80 hover:text-foreground boty-transition">
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border/50 pt-4">
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-foreground">Availability</h3>
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="in-stock"
            checked={showInStockOnly}
            onCheckedChange={(checked) => setShowInStockOnly(checked as boolean)}
          />
          <Label htmlFor="in-stock" className="cursor-pointer text-sm text-foreground/80 hover:text-foreground boty-transition">
            In Stock Only
          </Label>
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <div className="pt-4">
          <Button variant="outline" onClick={clearAllFilters} className="w-full">
            Clear All Filters ({activeFiltersCount})
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header mode="store" />

      <section className="relative overflow-hidden px-6 pb-16 pt-24 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${siteContent.hero_image_url}')` }} />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl pt-6">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
              <ShoppingBag className="h-4 w-4" />
              <span className="font-medium">Curated Collection</span>
            </div>

            <h1 className="mb-6 font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl">{siteContent.hero_heading}</h1>
            <p className="mb-8 max-w-2xl text-lg text-white/90 md:text-xl">{siteContent.hero_text}</p>

            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search our products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="boty-shadow rounded-full border-0 bg-white py-6 pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>
      </section>

      <BestSellers products={bestSellerProducts} />

      <section className="px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-primary md:text-sm">Product Catalog</p>
            <h2 className="mb-4 font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">All Products</h2>
            <p className="text-sm text-muted-foreground md:text-base">
              Explore our full collection with smart filters and search to quickly find the right product for your needs.
            </p>
          </div>

          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold text-foreground md:text-2xl">
                {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
              </h2>
              {activeFiltersCount > 0 && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {activeFiltersCount} {activeFiltersCount === 1 ? "filter" : "filters"} applied
                </p>
              )}
            </div>

            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full gap-2 sm:w-auto lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">{activeFiltersCount}</span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-8">
            <aside className="hidden w-64 flex-shrink-0 lg:block">
              <div className="boty-shadow sticky top-24 rounded-xl border border-border/50 bg-card p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-base font-semibold uppercase tracking-wide text-foreground">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">{activeFiltersCount}</span>
                  )}
                </div>
                <FilterContent />
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              {filteredProducts.length === 0 ? (
                <div className="py-16 text-center md:py-20">
                  <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                  <h3 className="mb-2 text-xl font-semibold text-foreground">No products found</h3>
                  <p className="mb-6 text-muted-foreground">Try adjusting your filters or search query</p>
                  <Button onClick={clearAllFilters}>Clear All Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                  {filteredProducts.map((product) => {
                    const badge = resolveBadge(product)
                    return (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        className="group boty-shadow boty-transition overflow-hidden rounded-xl border border-border/50 bg-card hover:shadow-xl"
                      >
                        <div className="relative aspect-square overflow-hidden bg-muted">
                          {product.image_url ? (
                            <Image
                              src={product.image_url}
                              alt={product.name}
                              fill
                              className="boty-transition object-cover group-hover:scale-105"
                            />
                          ) : null}
                          {badge ? (
                            <span
                              className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${
                                badge === "Sale"
                                  ? "bg-red-500 text-white"
                                  : badge === "New"
                                    ? "bg-blue-500 text-white"
                                    : "bg-primary text-primary-foreground"
                              }`}
                            >
                              {badge}
                            </span>
                          ) : null}
                          {!product.in_stock && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black">Out of Stock</span>
                            </div>
                          )}
                        </div>

                        <div className="p-4 md:p-5">
                          <h3 className="line-clamp-1 mb-1 text-base font-semibold text-foreground boty-transition group-hover:text-primary md:text-lg">
                            {product.name}
                          </h3>
                          <p className="line-clamp-1 mb-3 text-xs text-muted-foreground md:text-sm">{product.tagline}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-foreground md:text-xl">£{product.sale_price}</span>
                            {product.original_price > product.sale_price ? (
                              <span className="text-sm text-muted-foreground line-through">£{product.original_price}</span>
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="relative mt-14 overflow-hidden rounded-3xl p-8 text-primary-foreground md:mt-16 md:p-12">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${siteContent.campaign_image_url}')` }} />
              <div className="absolute inset-0 bg-black/45" />
            </div>
            <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 left-0 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <p className="mb-3 text-xs uppercase tracking-[0.24em] text-primary-foreground/80 md:text-sm">Featured Campaign</p>
              <h3 className="mb-4 font-serif text-3xl leading-tight md:text-5xl">{siteContent.campaign_heading}</h3>
              <p className="mb-7 text-base text-primary-foreground/90 md:text-lg">{siteContent.campaign_text}</p>
              <Link
                href="/shop"
                className="boty-transition inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-primary hover:bg-white/90 md:text-base"
              >
                Explore Offers
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 bg-card py-10">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="mb-3 text-sm text-muted-foreground">Need strategy, software, or growth support for your business?</p>
          <Link href="/service" className="boty-transition inline-flex items-center gap-2 text-sm text-primary hover:text-foreground">
            Go to BuyShez Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer mode="store" />
    </div>
  )
}
