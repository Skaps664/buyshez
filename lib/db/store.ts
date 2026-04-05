import "server-only"

import { unstable_cache } from "next/cache"
import { selectRows } from "@/lib/db/supabase-rest"
import type { Category, DashboardStats, Product, ShopData, SiteContent } from "@/lib/db/types"

const defaultSiteContent: SiteContent = {
  id: 1,
  hero_image_url:
    "https://images.unsplash.com/photo-1522923034308-c53a7abf36b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  hero_heading: "Discover Amazing Products",
  hero_text:
    "Tech essentials, lifestyle products, and more. All available for secure purchase on eBay with fast UK shipping.",
  campaign_image_url:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
  campaign_heading: "Flash Offers This Week",
  campaign_text:
    "Highlight a promotion, seasonal offer, or sponsored launch here. This banner is designed for high visibility and conversion.",
  best_seller_product_ids: [],
}

const getCategoriesCached = unstable_cache(
  async () => {
    try {
      return await selectRows<Category[]>("categories", "select=*&order=created_at.asc")
    } catch {
      return []
    }
  },
  ["categories-list"],
  { revalidate: 30, tags: ["categories"] },
)

const getProductsCached = unstable_cache(
  async () => {
    try {
      return await selectRows<Product[]>(
        "products",
        "select=*,category:categories(id,name,slug)&order=created_at.desc",
      )
    } catch {
      return []
    }
  },
  ["products-list"],
  { revalidate: 30, tags: ["products"] },
)

const getSiteContentCached = unstable_cache(
  async () => {
    try {
      const rows = await selectRows<SiteContent[]>("site_content", "select=*&id=eq.1")
      return rows[0] || defaultSiteContent
    } catch {
      return defaultSiteContent
    }
  },
  ["site-content"],
  { revalidate: 30, tags: ["site-content"] },
)

export async function getShopData(): Promise<ShopData> {
  const [allCategories, allProducts, siteContent] = await Promise.all([
    getCategoriesCached(),
    getProductsCached(),
    getSiteContentCached(),
  ])

  const categories = allCategories.filter((category) => category.is_visible)
  const products = allProducts.filter((product) => product.show_in_shop)

  const preferredBestSellerSet = new Set(siteContent.best_seller_product_ids)
  const preferredBestSellers = products.filter((product) => preferredBestSellerSet.has(product.id))
  const taggedBestSellers = products.filter((product) => product.is_best_seller)

  const topBestSellers = [...preferredBestSellers, ...taggedBestSellers]
    .filter((product, index, arr) => arr.findIndex((item) => item.id === product.id) === index)
    .slice(0, 4)

  return {
    categories,
    products,
    topBestSellers,
    siteContent,
  }
}

export async function getProductByIdOrSlug(idOrSlug: string) {
  const encoded = encodeURIComponent(idOrSlug)
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idOrSlug)
  const filter = isUuid ? `or=(slug.eq.${encoded},id.eq.${encoded})` : `slug=eq.${encoded}`

  try {
    const rows = await selectRows<Product[]>(
      "products",
      `select=*,category:categories(id,name,slug)&${filter}&limit=1`,
    )
    return rows[0] || null
  } catch {
    return null
  }
}

export async function getAdminDashboardData() {
  const [categoriesResult, productsResult, siteRowsResult] = await Promise.all([
    selectRows<Category[]>("categories", "select=*&order=created_at.asc", true)
      .then((data) => ({ data, ok: true }))
      .catch(() => ({ data: [] as Category[], ok: false })),
    selectRows<Product[]>("products", "select=*,category:categories(id,name,slug)&order=created_at.desc", true)
      .then((data) => ({ data, ok: true }))
      .catch(() => ({ data: [] as Product[], ok: false })),
    selectRows<SiteContent[]>("site_content", "select=*&id=eq.1", true)
      .then((data) => ({ data, ok: true }))
      .catch(() => ({ data: [] as SiteContent[], ok: false })),
  ])

  const categories = categoriesResult.data
  const products = productsResult.data
  const siteRows = siteRowsResult.data
  const dbReady = categoriesResult.ok && productsResult.ok && siteRowsResult.ok

  const siteContent = siteRows[0] || defaultSiteContent

  const stats: DashboardStats = {
    totalProducts: products.length,
    totalCategories: categories.length,
    inStockProducts: products.filter((product) => product.in_stock).length,
    outOfStockProducts: products.filter((product) => !product.in_stock).length,
  }

  return {
    categories,
    products,
    siteContent,
    stats,
    dbReady,
  }
}
