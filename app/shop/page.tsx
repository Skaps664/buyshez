"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, SlidersHorizontal, ShoppingBag } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Mock products - will be replaced with Sanity CMS data
const mockProducts = [
  {
    id: "premium-laptop-stand",
    name: "Laptop Stand",
    description: "Ergonomic aluminum design",
    price: 89,
    originalPrice: 120,
    image: "/images/products/serum-bottles-1.png",
    badge: "Bestseller",
    category: "tech",
    inStock: true,
    ebayUrl: "https://ebay.com/item/premium-laptop-stand"
  },
  {
    id: "wireless-keyboard",
    name: "Wireless Mechanical Keyboard",
    description: "RGB backlit with blue switches",
    price: 129,
    originalPrice: null,
    image: "/images/products/eye-serum-bottles.png",
    badge: "New",
    category: "tech",
    inStock: true,
    ebayUrl: "https://ebay.com/item/wireless-keyboard"
  },
  {
    id: "noise-cancelling-headphones",
    name: "Noise Cancelling Headphones",
    description: "High-quality audio with active noise cancellation",
    price: 299,
    originalPrice: 349,
    image: "/images/products/amber-dropper-bottles.png",
    badge: "Sale",
    category: "audio",
    inStock: true,
    ebayUrl: "https://ebay.com/item/headphones"
  },
  {
    id: "smart-watch",
    name: "Smart Watch Pro",
    description: "Health tracking & notifications",
    price: 399,
    originalPrice: null,
    image: "/images/products/spray-bottles.png",
    badge: null,
    category: "wearables",
    inStock: true,
    ebayUrl: "https://ebay.com/item/smartwatch"
  },
  {
    id: "usb-c-hub",
    name: "USB-C Hub 7-in-1",
    description: "Multi-port connectivity solution",
    price: 59,
    originalPrice: 79,
    image: "/images/products/cream-jars-colored.png",
    badge: "Sale",
    category: "tech",
    inStock: true,
    ebayUrl: "https://ebay.com/item/usb-hub"
  },
  {
    id: "portable-ssd",
    name: "Portable SSD 1TB",
    description: "Ultra-fast external storage",
    price: 149,
    originalPrice: null,
    image: "/images/products/tube-bottles.png",
    badge: null,
    category: "tech",
    inStock: true,
    ebayUrl: "https://ebay.com/item/portable-ssd"
  },
  {
    id: "webcam-4k",
    name: "4K Webcam Pro",
    description: "Professional streaming quality",
    price: 179,
    originalPrice: null,
    image: "/images/products/jars-wooden-lid.png",
    badge: "Bestseller",
    category: "tech",
    inStock: true,
    ebayUrl: "https://ebay.com/item/webcam"
  },
  {
    id: "desk-lamp",
    name: "LED Desk Lamp",
    description: "Adjustable brightness & color temp",
    price: 69,
    originalPrice: 89,
    image: "/images/products/pump-bottles-lavender.png",
    badge: null,
    category: "lifestyle",
    inStock: true,
    ebayUrl: "https://ebay.com/item/desk-lamp"
  },
  {
    id: "radiance-serum",
    name: "Radiance Serum",
    description: "Vitamin C brightening formula",
    price: 68,
    originalPrice: null,
    image: "/images/products/serum-bottles-1.png",
    badge: "Bestseller",
    category: "lifestyle",
    inStock: true,
    ebayUrl: "https://ebay.com/item/radiance-serum"
  },
  {
    id: "hydra-cream",
    name: "Hydra Cream",
    description: "Deep moisture with hyaluronic acid",
    price: 54,
    originalPrice: null,
    image: "/images/products/cream-jars-colored.png",
    badge: null,
    category: "lifestyle",
    inStock: true,
    ebayUrl: "https://ebay.com/item/hydra-cream"
  },
  {
    id: "gentle-cleanser",
    name: "Gentle Cleanser",
    description: "Soothing botanical wash",
    price: 38,
    originalPrice: 48,
    image: "/images/products/tube-bottles.png",
    badge: "Sale",
    category: "lifestyle",
    inStock: true,
    ebayUrl: "https://ebay.com/item/gentle-cleanser"
  },
  {
    id: "gaming-mouse",
    name: "Gaming Mouse RGB",
    description: "16000 DPI precision sensor",
    price: 79,
    originalPrice: null,
    image: "/images/products/pump-bottles-cream.png",
    badge: "New",
    category: "tech",
    inStock: false,
    ebayUrl: "https://ebay.com/item/gaming-mouse"
  }
]

const categories = [
  { id: "all", label: "All Products" },
  { id: "tech", label: "Tech & Gadgets" },
  { id: "audio", label: "Audio & Sound" },
  { id: "lifestyle", label: "Lifestyle & Beauty" }
]

const priceRanges = [
  { id: "0-50", label: "Under £50", min: 0, max: 50 },
  { id: "50-100", label: "£50 - £100", min: 50, max: 100 },
  { id: "100-200", label: "£100 - £200", min: 100, max: 200 },
  { id: "200+", label: "£200+", min: 200, max: Infinity }
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([])
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filter products based on criteria
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      
      const matchesPrice = selectedPriceRange.length === 0 || selectedPriceRange.some(rangeId => {
        const range = priceRanges.find(r => r.id === rangeId)
        return range && product.price >= range.min && product.price < range.max
      })
      
      const matchesStock = !showInStockOnly || product.inStock
      
      return matchesSearch && matchesCategory && matchesPrice && matchesStock
    })
  }, [searchQuery, selectedCategory, selectedPriceRange, showInStockOnly])

  const togglePriceRange = (rangeId: string) => {
    setSelectedPriceRange(prev =>
      prev.includes(rangeId) ? prev.filter(r => r !== rangeId) : [...prev, rangeId]
    )
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedPriceRange([])
    setShowInStockOnly(false)
  }

  const activeFiltersCount = 
    (selectedCategory !== "all" ? 1 : 0) +
    selectedPriceRange.length +
    (showInStockOnly ? 1 : 0)

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-medium text-foreground mb-3 text-sm uppercase tracking-wide">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm boty-transition ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-4 border-t border-border/50">
        <h3 className="font-medium text-foreground mb-3 text-sm uppercase tracking-wide">Price Range</h3>
        <div className="space-y-2.5">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center gap-2.5">
              <Checkbox
                id={`price-${range.id}`}
                checked={selectedPriceRange.includes(range.id)}
                onCheckedChange={() => togglePriceRange(range.id)}
              />
              <Label
                htmlFor={`price-${range.id}`}
                className="text-sm text-foreground/80 cursor-pointer hover:text-foreground boty-transition"
              >
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Filter */}
      <div className="pt-4 border-t border-border/50">
        <h3 className="font-medium text-foreground mb-3 text-sm uppercase tracking-wide">Availability</h3>
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="in-stock"
            checked={showInStockOnly}
            onCheckedChange={(checked) => setShowInStockOnly(checked as boolean)}
          />
          <Label htmlFor="in-stock" className="text-sm text-foreground/80 cursor-pointer hover:text-foreground boty-transition">
            In Stock Only
          </Label>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <div className="pt-4">
          <Button
            variant="outline"
            onClick={clearAllFilters}
            className="w-full"
          >
            Clear All Filters ({activeFiltersCount})
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 px-6 lg:px-8 bg-gradient-to-br from-primary via-primary/90 to-purple-600 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl pt-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm mb-6">
              <ShoppingBag className="w-4 h-4" />
              <span className="font-medium">Curated Collection</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Discover Amazing Products
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Tech essentials, lifestyle products, and more. All available for secure purchase on eBay with fast UK shipping.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
              <Input
                type="text"
                placeholder="Search our products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-base rounded-full bg-white boty-shadow border-0 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
              </h2>
              {activeFiltersCount > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  {activeFiltersCount} {activeFiltersCount === 1 ? 'filter' : 'filters'} applied
                </p>
              )}
            </div>

            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden gap-2 w-full sm:w-auto">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-1 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                      {activeFiltersCount}
                    </span>
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
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-xl p-6 boty-shadow border border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-base font-semibold text-foreground uppercase tracking-wide">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1 min-w-0">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 md:py-20">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearAllFilters}>Clear All Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="group bg-card rounded-xl overflow-hidden boty-shadow hover:shadow-xl boty-transition border border-border/50"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square bg-muted overflow-hidden">
                        {product.image && (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 boty-transition"
                          />
                        )}
                        {product.badge && (
                          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
                            product.badge === "Sale" ? "bg-red-500 text-white" :
                            product.badge === "New" ? "bg-blue-500 text-white" :
                            "bg-primary text-primary-foreground"
                          }`}>
                            {product.badge}
                          </span>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4 md:p-5">
                        <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 group-hover:text-primary boty-transition line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-1">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg md:text-xl font-bold text-foreground">
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
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
