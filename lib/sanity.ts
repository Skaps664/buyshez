import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
// TO-DO: Add your Sanity project ID and dataset in environment variables
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-02-05',
  useCdn: true, // Set to false for fresh data
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Type definitions for Sanity data
export interface SanityProduct {
  _id: string
  _type: 'product'
  name: string
  slug: {
    current: string
  }
  description: string
  fullDescription?: string
  price: number
  originalPrice?: number
  images: Array<{
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }>
  badge?: 'Bestseller' | 'New' | 'Sale' | null
  category: string
  brand: string
  inStock: boolean
  ebayUrl: string
  features?: string[]
  specifications?: Record<string, string>
}

// Fetch all products
export async function getAllProducts(): Promise<SanityProduct[]> {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    _type,
    name,
    slug,
    description,
    fullDescription,
    price,
    originalPrice,
    images,
    badge,
    category,
    brand,
    inStock,
    ebayUrl,
    features,
    specifications
  }`
  
  return await client.fetch(query)
}

// Fetch single product by slug
export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    _type,
    name,
    slug,
    description,
    fullDescription,
    price,
    originalPrice,
    images,
    badge,
    category,
    brand,
    inStock,
    ebayUrl,
    features,
    specifications
  }`
  
  return await client.fetch(query, { slug })
}

// Fetch products by category
export async function getProductsByCategory(category: string): Promise<SanityProduct[]> {
  const query = `*[_type == "product" && category == $category] | order(_createdAt desc) {
    _id,
    _type,
    name,
    slug,
    description,
    fullDescription,
    price,
    originalPrice,
    images,
    badge,
    category,
    brand,
    inStock,
    ebayUrl,
    features,
    specifications
  }`
  
  return await client.fetch(query, { category })
}
