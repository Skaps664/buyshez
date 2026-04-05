import { notFound } from "next/navigation"
import { ProductDetailClient } from "@/components/boty/product-detail-client"
import { getProductByIdOrSlug } from "@/lib/db/store"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProductByIdOrSlug(id)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
