import Link from "next/link"
import { notFound } from "next/navigation"
import {
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  saveHomeController,
  updateCategory,
  updateProductFull,
} from "./actions"
import { PasskeyGate } from "./passkey-gate"
import { getAdminDashboardData } from "@/lib/db/store"

const ADMIN_KEY = process.env.ADMIN_PANEL_KEY || "shoaibinuk00788"

type AdminTab = "dashboard" | "home" | "categories" | "products" | "product-manager"

const TAB_OPTIONS: { value: AdminTab; label: string }[] = [
  { value: "dashboard", label: "Dashboard" },
  { value: "home", label: "Home Controller" },
  { value: "categories", label: "Categories" },
  { value: "products", label: "Create Product" },
  { value: "product-manager", label: "Manage Products" },
]

interface AdminPageProps {
  params: Promise<{ key: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function getTab(raw: string | undefined): AdminTab {
  if (raw === "home" || raw === "categories" || raw === "products" || raw === "product-manager") {
    return raw
  }
  return "dashboard"
}

export default async function AdminPanelPage({ params, searchParams }: AdminPageProps) {
  const { key } = await params

  if (key !== ADMIN_KEY) {
    notFound()
  }

  const resolvedSearch = await searchParams
  const status = Array.isArray(resolvedSearch.status) ? resolvedSearch.status[0] : resolvedSearch.status
  const tabRaw = Array.isArray(resolvedSearch.tab) ? resolvedSearch.tab[0] : resolvedSearch.tab
  const activeTab = getTab(tabRaw)

  const adminPath = `/admin/${key}`
  const { categories, products, siteContent, stats, dbReady } = await getAdminDashboardData()

  return (
    <PasskeyGate expectedKey={ADMIN_KEY}>
    <main className="min-h-screen bg-white px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-blue-600">Admin Panel</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">BuyShez Control Center</h1>
              <p className="mt-2 text-sm text-slate-600">Manage home content, categories, products, and storefront settings.</p>
            </div>
            <Link
              href="/shop"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              View Store
            </Link>
          </div>

          {status ? (
            <p className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-800">{status}</p>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-200 pt-5">
            {TAB_OPTIONS.map((item) => {
              const active = activeTab === item.value
              return (
                <Link
                  key={item.value}
                  href={`${adminPath}?tab=${item.value}`}
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${
                    active
                      ? "bg-slate-900 text-white"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </header>

        {activeTab === "dashboard" ? (
          <section className="space-y-5">
            {!dbReady ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                Database looks uninitialized for this Supabase project. Run SQL from supabase/schema.sql in Supabase SQL Editor,
                then reload this page.
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Total Products</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.totalProducts}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Categories</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.totalCategories}</p>
              </div>
              <div className="rounded-xl border border-green-200 bg-green-50 p-5 shadow-sm">
                <p className="text-sm text-green-700">In Stock</p>
                <p className="mt-2 text-3xl font-semibold text-green-900">{stats.inStockProducts}</p>
              </div>
              <div className="rounded-xl border border-red-200 bg-red-50 p-5 shadow-sm">
                <p className="text-sm text-red-700">Out Of Stock</p>
                <p className="mt-2 text-3xl font-semibold text-red-900">{stats.outOfStockProducts}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
              <div className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                <p>1. Open Home Controller tab to manage hero and campaign.</p>
                <p>2. Create categories and set visibility in Categories tab.</p>
                <p>3. Add full product details and images in Products tab.</p>
                <p>4. Mark products as sale, bestseller, or new from Products tab.</p>
              </div>
            </div>
          </section>
        ) : null}

        {activeTab === "home" ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Home Page Controller</h2>
            <p className="mt-1 text-sm text-slate-600">Set hero/campaign text and upload images directly to storage.</p>

            <form action={saveHomeController} className="mt-6 space-y-6">
              <input type="hidden" name="adminPath" value={adminPath} />
              <input type="hidden" name="tab" value="home" />

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="font-medium text-slate-800">Hero Image URL (optional fallback)</span>
                  <input
                    name="hero_image_url"
                    defaultValue={siteContent.hero_image_url}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="font-medium text-slate-800">Upload Hero Image</span>
                  <input type="file" name="hero_image_file" accept="image/*" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2" />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="font-medium text-slate-800">Hero Heading</span>
                  <input
                    name="hero_heading"
                    defaultValue={siteContent.hero_heading}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="font-medium text-slate-800">Hero Paragraph</span>
                  <textarea
                    name="hero_text"
                    defaultValue={siteContent.hero_text}
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="font-medium text-slate-800">Campaign Image URL (optional fallback)</span>
                  <input
                    name="campaign_image_url"
                    defaultValue={siteContent.campaign_image_url}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="font-medium text-slate-800">Upload Campaign Image</span>
                  <input type="file" name="campaign_image_file" accept="image/*" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2" />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="font-medium text-slate-800">Campaign Heading</span>
                  <input
                    name="campaign_heading"
                    defaultValue={siteContent.campaign_heading}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="font-medium text-slate-800">Campaign Text</span>
                  <textarea
                    name="campaign_text"
                    defaultValue={siteContent.campaign_text}
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                  />
                </label>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">Top 4 Best Sellers</p>
                <p className="text-xs text-slate-500">Choose up to four products for the top picks strip.</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => {
                    const checked = siteContent.best_seller_product_ids.includes(product.id)
                    return (
                      <label key={product.id} className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700">
                        <input type="checkbox" name="bestSellerIds" value={product.id} defaultChecked={checked} />
                        <span className="line-clamp-1">{product.name}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                Save Home Controller
              </button>
            </form>
          </section>
        ) : null}

        {activeTab === "categories" ? (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Create Category</h2>
              <p className="mt-1 text-sm text-slate-600">Categories appear in shop filters when visible.</p>

              <form action={createCategory} className="mt-5 grid gap-3">
                <input type="hidden" name="adminPath" value={adminPath} />
                <input type="hidden" name="tab" value="categories" />
                <input
                  name="name"
                  placeholder="Category name"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                  required
                />
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" name="is_visible" defaultChecked />
                  Show in categories panel
                </label>
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  Add Category
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Existing Categories</h3>
              <div className="mt-4 space-y-3">
                {categories.length === 0 ? (
                  <p className="text-sm text-slate-500">No categories created yet.</p>
                ) : (
                  categories.map((category) => (
                    <form key={category.id} action={updateCategory} className="flex items-center justify-between gap-3 rounded-lg border border-slate-300 px-3 py-2">
                      <input type="hidden" name="adminPath" value={adminPath} />
                      <input type="hidden" name="tab" value="categories" />
                      <input type="hidden" name="category_id" value={category.id} />
                      <div>
                        <input
                          name="name"
                          defaultValue={category.name}
                          className="w-full rounded border border-slate-300 bg-white px-2 py-1 text-sm font-medium text-slate-900"
                          required
                        />
                        <p className="text-xs text-slate-500">/{category.slug}</p>
                      </div>
                      <label className="flex items-center gap-2 text-xs text-slate-700">
                        <input type="checkbox" name="is_visible" defaultChecked={category.is_visible} />
                        Visible
                      </label>
                      <div className="flex items-center gap-2">
                        <button type="submit" className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100">
                          Save
                        </button>
                        <button
                          type="submit"
                          formAction={deleteCategory}
                          className="rounded-md border border-red-300 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </form>
                  ))
                )}
              </div>
            </div>
          </section>
        ) : null}

        {activeTab === "products" ? (
          <section className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Create Product</h2>
              <p className="mt-1 text-sm text-slate-600">Add complete product data and upload images directly.</p>

              <form action={createProduct} className="mt-6 grid gap-4">
                <input type="hidden" name="adminPath" value={adminPath} />
                <input type="hidden" name="tab" value="products" />

                <div className="grid gap-4 md:grid-cols-2">
                  <input name="name" placeholder="Product name" required className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                  <input name="tagline" placeholder="Tag line" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <select name="category_id" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
                    <option value="">No category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                    Slug is auto-generated from product name.
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <input name="original_price" type="number" step="0.01" min="0" placeholder="Original price" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                  <input name="sale_price" type="number" step="0.01" min="0" placeholder="Sale price" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                  <input name="rating" type="number" min="0" max="5" step="0.1" placeholder="Review rating" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                  <input name="review_count" type="number" min="0" step="1" placeholder="Review number" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm">
                    <span className="font-medium text-slate-800">Main Image Upload</span>
                    <input type="file" name="image_file" accept="image/*" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" required />
                  </label>
                </div>
                <label className="space-y-2 text-sm">
                  <span className="font-medium text-slate-800">Gallery Images Upload</span>
                  <input type="file" name="gallery_files" accept="image/*" multiple className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                </label>

                <textarea name="description" rows={4} placeholder="Product description" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                <textarea
                  name="key_features"
                  rows={4}
                  placeholder="Key features (one per line)"
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                />
                <textarea
                  name="specifications"
                  rows={4}
                  placeholder="Specifications"
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                />
                <textarea
                  name="shipping_returns"
                  rows={3}
                  placeholder="Shipping and return"
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                />
                <input name="ebay_link" placeholder="eBay buy link" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />

                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                  <label className="flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-800">
                    <input type="checkbox" name="in_stock" defaultChecked />
                    In Stock
                  </label>
                  <label className="flex items-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 text-sm text-blue-800">
                    <input type="checkbox" name="is_best_seller" />
                    Best Seller
                  </label>
                  <label className="flex items-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 text-sm text-blue-800">
                    <input type="checkbox" name="is_new" />
                    New
                  </label>
                  <label className="flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
                    <input type="checkbox" name="is_on_sale" />
                    On Sale
                  </label>
                  <label className="flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                    <input type="checkbox" name="show_in_shop" defaultChecked />
                    Show in Shop
                  </label>
                </div>

                <button type="submit" className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  Create Product
                </button>
              </form>
            </div>

          </section>
        ) : null}

        {activeTab === "product-manager" ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Products Manager</h3>
              <p className="mt-1 text-sm text-slate-600">Compact list by default. Open Edit to update full product details.</p>
              <div className="mt-4 space-y-4">
                {products.length === 0 ? (
                  <p className="text-sm text-slate-500">No products yet. Create your first product above.</p>
                ) : (
                  products.map((product) => (
                    <details key={product.id} className="rounded-xl border border-slate-300 bg-white">
                      <summary className="cursor-pointer list-none px-4 py-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="font-medium text-slate-900">{product.name}</p>
                            <p className="text-xs text-slate-500">{product.category?.name || "Uncategorized"}</p>
                          </div>
                          <span className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700">
                            Edit
                          </span>
                        </div>
                      </summary>

                      <form action={updateProductFull} className="border-t border-slate-200 p-4">
                        <input type="hidden" name="adminPath" value={adminPath} />
                        <input type="hidden" name="tab" value="product-manager" />
                        <input type="hidden" name="product_id" value={product.id} />

                        <div className="mb-3 text-xs text-slate-500">/{product.slug}</div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <input
                            name="name"
                            defaultValue={product.name}
                            placeholder="Product name"
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                            required
                          />
                          <input
                            name="tagline"
                            defaultValue={product.tagline}
                            placeholder="Tagline"
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                          />
                        </div>

                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          <select
                            name="category_id"
                            defaultValue={product.category_id || ""}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                          >
                            <option value="">No category</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                            Slug auto-updates from product name.
                          </div>
                        </div>

                        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                          <label className="flex items-center gap-2 text-sm text-slate-700">
                            <input type="checkbox" name="in_stock" defaultChecked={product.in_stock} />
                            In Stock
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-700">
                            <input type="checkbox" name="is_best_seller" defaultChecked={product.is_best_seller} />
                            Best Seller
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-700">
                            <input type="checkbox" name="is_new" defaultChecked={product.is_new} />
                            New
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-700">
                            <input type="checkbox" name="is_on_sale" defaultChecked={product.is_on_sale} />
                            On Sale
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-700">
                            <input type="checkbox" name="show_in_shop" defaultChecked={product.show_in_shop} />
                            Show in Shop
                          </label>
                        </div>

                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          <input
                            name="original_price"
                            type="number"
                            step="0.01"
                            min="0"
                            defaultValue={product.original_price}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                          />
                          <input
                            name="sale_price"
                            type="number"
                            step="0.01"
                            min="0"
                            defaultValue={product.sale_price}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                          />
                        </div>

                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          <input
                            name="rating"
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            defaultValue={product.rating}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                          />
                          <input
                            name="review_count"
                            type="number"
                            step="1"
                            min="0"
                            defaultValue={product.review_count}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                          />
                        </div>

                        <div className="mt-3 space-y-3">
                          <textarea
                            name="description"
                            rows={3}
                            defaultValue={product.description}
                            placeholder="Description"
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                          />
                          <textarea
                            name="key_features"
                            rows={3}
                            defaultValue={(product.key_features || []).join("\n")}
                            placeholder="Key features (one per line)"
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                          />
                          <textarea
                            name="specifications"
                            rows={3}
                            defaultValue={product.specifications}
                            placeholder="Specifications"
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                          />
                          <textarea
                            name="shipping_returns"
                            rows={3}
                            defaultValue={product.shipping_returns}
                            placeholder="Shipping and return"
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                          />
                          <input
                            name="ebay_link"
                            defaultValue={product.ebay_link}
                            placeholder="eBay buy link"
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                          />
                        </div>

                        <div className="mt-3 space-y-3">
                          <input type="hidden" name="existing_main_image_url" value={product.image_url || ""} />

                          <div className="space-y-2 text-sm">
                            <span className="font-medium text-slate-800">Current Main Image</span>
                            {product.image_url ? (
                              <div className="rounded-lg border border-slate-200 p-2">
                                <img src={product.image_url} alt={product.name} className="h-28 w-28 rounded-md object-cover" />
                                <label className="mt-2 flex items-center gap-2 text-xs text-red-700">
                                  <input type="checkbox" name="remove_main_image" />
                                  Remove current main image
                                </label>
                              </div>
                            ) : (
                              <p className="text-xs text-slate-500">No main image set.</p>
                            )}
                          </div>

                          <div className="space-y-2 text-sm">
                            <span className="font-medium text-slate-800">Current Gallery Images</span>
                            {product.gallery_images && product.gallery_images.length > 0 ? (
                              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                {product.gallery_images.map((imageUrl, index) => (
                                  <label key={`${product.id}-gallery-${index}`} className="rounded-lg border border-slate-200 p-2 text-xs">
                                    <img src={imageUrl} alt={`${product.name} gallery ${index + 1}`} className="h-24 w-full rounded-md object-cover" />
                                    <span className="mt-2 flex items-center gap-2 text-slate-700">
                                      <input type="checkbox" name="keep_gallery_urls" value={imageUrl} defaultChecked />
                                      Keep this image
                                    </span>
                                  </label>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-slate-500">No gallery images set.</p>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          <input type="file" name="image_file" accept="image/*" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                          <input type="file" name="gallery_files" accept="image/*" multiple className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <button type="submit" className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                            Save Full Product
                          </button>
                          <button
                            type="submit"
                            formAction={deleteProduct}
                            className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                          >
                            Delete Product
                          </button>
                        </div>
                      </form>
                    </details>
                  ))
                )}
              </div>
            </section>
        ) : null}
      </div>
    </main>
    </PasskeyGate>
  )
}
