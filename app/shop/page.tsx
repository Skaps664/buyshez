import { ShopPageClient } from "@/components/boty/shop-page-client"
import { getShopData } from "@/lib/db/store"

export default async function ShopPage() {
  const data = await getShopData()
  return <ShopPageClient {...data} />
}
