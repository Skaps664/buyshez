export interface Category {
  id: string
  name: string
  slug: string
  is_visible: boolean
  created_at?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  image_url: string
  gallery_images: string[]
  original_price: number
  sale_price: number
  in_stock: boolean
  category_id: string | null
  description: string
  key_features: string[]
  specifications: string
  shipping_returns: string
  ebay_link: string
  rating: number
  review_count: number
  is_best_seller: boolean
  is_new: boolean
  is_on_sale: boolean
  show_in_shop: boolean
  created_at?: string
  updated_at?: string
  category?: Pick<Category, "id" | "name" | "slug"> | null
}

export interface SiteContent {
  id: number
  hero_image_url: string
  hero_heading: string
  hero_text: string
  campaign_image_url: string
  campaign_heading: string
  campaign_text: string
  best_seller_product_ids: string[]
  updated_at?: string
}

export interface DashboardStats {
  totalProducts: number
  totalCategories: number
  inStockProducts: number
  outOfStockProducts: number
}

export interface ShopData {
  categories: Category[]
  products: Product[]
  topBestSellers: Product[]
  siteContent: SiteContent
}
