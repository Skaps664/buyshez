"use server"

import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { deleteRows, insertRows, updateRows, upsertRows } from "@/lib/db/supabase-rest"
import { uploadAdminFile, uploadAdminFiles } from "@/lib/db/storage"

const toNumber = (value: FormDataEntryValue | null, fallback = 0) => {
  if (typeof value !== "string") return fallback
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const toString = (value: FormDataEntryValue | null) => {
  return typeof value === "string" ? value.trim() : ""
}

const toBoolean = (value: FormDataEntryValue | null) => {
  return value === "on" || value === "true"
}

const createSlug = (input: string) =>
  input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

const invalidateStoreCaches = () => {
  revalidateTag("categories", "max")
  revalidateTag("products", "max")
  revalidateTag("site-content", "max")
}

function redirectWithStatus(adminPath: string, status: string) {
  redirect(`${adminPath}?status=${encodeURIComponent(status)}`)
}

function redirectWithStatusAndTab(adminPath: string, tab: string, status: string) {
  const safeTab = tab || "dashboard"
  redirect(`${adminPath}?tab=${encodeURIComponent(safeTab)}&status=${encodeURIComponent(status)}`)
}

function getActionErrorMessage(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes("PGRST205") || error.message.includes("public.categories")) {
      return "Database tables are not initialized. Run supabase/schema.sql in your Supabase SQL Editor."
    }

    return error.message
  }

  return "Unexpected server error"
}

function isNextControlFlowError(error: unknown) {
  if (typeof error === "object" && error !== null && "digest" in error) {
    const digest = (error as { digest?: unknown }).digest
    return (
      typeof digest === "string" &&
      (digest.startsWith("NEXT_REDIRECT") || digest.startsWith("NEXT_NOT_FOUND"))
    )
  }

  return false
}

export async function saveHomeController(formData: FormData) {
  const adminPath = toString(formData.get("adminPath"))
  const tab = toString(formData.get("tab"))
  try {
    const bestSellerIds = formData.getAll("bestSellerIds").map((id) => String(id))
    const heroUploadedUrl = await uploadAdminFile(formData.get("hero_image_file"), "home/hero")
    const campaignUploadedUrl = await uploadAdminFile(formData.get("campaign_image_file"), "home/campaign")

    await upsertRows(
      "site_content",
      {
        id: 1,
        hero_image_url: heroUploadedUrl || toString(formData.get("hero_image_url")),
        hero_heading: toString(formData.get("hero_heading")),
        hero_text: toString(formData.get("hero_text")),
        campaign_image_url: campaignUploadedUrl || toString(formData.get("campaign_image_url")),
        campaign_heading: toString(formData.get("campaign_heading")),
        campaign_text: toString(formData.get("campaign_text")),
        best_seller_product_ids: bestSellerIds.slice(0, 4),
      },
      "on_conflict=id&select=id",
    )

    invalidateStoreCaches()
    redirectWithStatusAndTab(adminPath, tab, "Home controller updated")
  } catch (error) {
    if (isNextControlFlowError(error)) {
      throw error
    }
    redirectWithStatusAndTab(adminPath, tab, getActionErrorMessage(error))
  }
}

export async function createCategory(formData: FormData) {
  const adminPath = toString(formData.get("adminPath"))
  const tab = toString(formData.get("tab"))
  const name = toString(formData.get("name"))

  if (!name) {
    redirectWithStatusAndTab(adminPath, tab, "Category name is required")
  }

  try {
    await insertRows("categories", {
      name,
      slug: createSlug(name),
      is_visible: toBoolean(formData.get("is_visible")),
    })

    invalidateStoreCaches()
    redirectWithStatusAndTab(adminPath, tab, "Category created")
  } catch (error) {
    if (isNextControlFlowError(error)) {
      throw error
    }
    redirectWithStatusAndTab(adminPath, tab, getActionErrorMessage(error))
  }
}

export async function updateCategory(formData: FormData) {
  const adminPath = toString(formData.get("adminPath"))
  const tab = toString(formData.get("tab"))
  const categoryId = toString(formData.get("category_id"))
  const name = toString(formData.get("name"))

  if (!categoryId) {
    redirectWithStatusAndTab(adminPath, tab, "Category id missing")
  }

  if (!name) {
    redirectWithStatusAndTab(adminPath, tab, "Category name is required")
  }

  try {
    await updateRows(
      "categories",
      `id=eq.${encodeURIComponent(categoryId)}&select=id`,
      {
        name,
        slug: createSlug(name),
        is_visible: toBoolean(formData.get("is_visible")),
      },
    )

    invalidateStoreCaches()
    redirectWithStatusAndTab(adminPath, tab, "Category updated")
  } catch (error) {
    if (isNextControlFlowError(error)) {
      throw error
    }
    redirectWithStatusAndTab(adminPath, tab, getActionErrorMessage(error))
  }
}

export async function createProduct(formData: FormData) {
  const adminPath = toString(formData.get("adminPath"))
  const tab = toString(formData.get("tab"))
  const name = toString(formData.get("name"))

  if (!name) {
    redirectWithStatusAndTab(adminPath, tab, "Product name is required")
  }

  try {
    const slug = createSlug(name)

    const keyFeatures = toString(formData.get("key_features"))
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)

    const uploadedMainImage = await uploadAdminFile(formData.get("image_file"), "products/main")
    const uploadedGalleryImages = await uploadAdminFiles(formData.getAll("gallery_files"), "products/gallery")

    if (!uploadedMainImage) {
      redirectWithStatusAndTab(adminPath, tab, "Main image upload is required")
    }

    const categoryId = toString(formData.get("category_id"))

    await insertRows("products", {
      slug,
      name,
      tagline: toString(formData.get("tagline")),
      image_url: uploadedMainImage,
      gallery_images: uploadedGalleryImages,
      original_price: toNumber(formData.get("original_price")),
      sale_price: toNumber(formData.get("sale_price")),
      in_stock: toBoolean(formData.get("in_stock")),
      category_id: categoryId || null,
      description: toString(formData.get("description")),
      key_features: keyFeatures,
      specifications: toString(formData.get("specifications")),
      shipping_returns: toString(formData.get("shipping_returns")),
      ebay_link: toString(formData.get("ebay_link")),
      rating: toNumber(formData.get("rating"), 5),
      review_count: Math.max(0, Math.floor(toNumber(formData.get("review_count"), 0))),
      is_best_seller: toBoolean(formData.get("is_best_seller")),
      is_new: toBoolean(formData.get("is_new")),
      is_on_sale: toBoolean(formData.get("is_on_sale")),
      show_in_shop: toBoolean(formData.get("show_in_shop")),
    })

    invalidateStoreCaches()
    redirectWithStatusAndTab(adminPath, tab, "Product created")
  } catch (error) {
    if (isNextControlFlowError(error)) {
      throw error
    }
    redirectWithStatusAndTab(adminPath, tab, getActionErrorMessage(error))
  }
}

export async function updateProductFlags(formData: FormData) {
  const adminPath = toString(formData.get("adminPath"))
  const tab = toString(formData.get("tab"))
  const productId = toString(formData.get("product_id"))

  if (!productId) {
    redirectWithStatusAndTab(adminPath, tab, "Product id missing")
  }

  try {
    const uploadedMainImage = await uploadAdminFile(formData.get("image_file"), "products/main")
    const uploadedGalleryImages = await uploadAdminFiles(formData.getAll("gallery_files"), "products/gallery")
    const existingGalleryImages = toString(formData.get("existing_gallery_images"))
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)

    const payload: Record<string, unknown> = {
      in_stock: toBoolean(formData.get("in_stock")),
      is_best_seller: toBoolean(formData.get("is_best_seller")),
      is_new: toBoolean(formData.get("is_new")),
      is_on_sale: toBoolean(formData.get("is_on_sale")),
      show_in_shop: toBoolean(formData.get("show_in_shop")),
      sale_price: toNumber(formData.get("sale_price")),
      original_price: toNumber(formData.get("original_price")),
    }

    if (uploadedMainImage) {
      payload.image_url = uploadedMainImage
    }

    if (uploadedGalleryImages.length > 0) {
      payload.gallery_images = [...uploadedGalleryImages, ...existingGalleryImages]
    }

    await updateRows(
      "products",
      `id=eq.${encodeURIComponent(productId)}&select=id`,
      payload,
    )

    invalidateStoreCaches()
    redirectWithStatusAndTab(adminPath, tab, "Product updated")
  } catch (error) {
    if (isNextControlFlowError(error)) {
      throw error
    }
    redirectWithStatusAndTab(adminPath, tab, getActionErrorMessage(error))
  }
}

export async function updateProductFull(formData: FormData) {
  const adminPath = toString(formData.get("adminPath"))
  const tab = toString(formData.get("tab"))
  const productId = toString(formData.get("product_id"))
  const name = toString(formData.get("name"))

  if (!productId) {
    redirectWithStatusAndTab(adminPath, tab, "Product id missing")
  }

  if (!name) {
    redirectWithStatusAndTab(adminPath, tab, "Product name is required")
  }

  try {
    const uploadedMainImage = await uploadAdminFile(formData.get("image_file"), "products/main")
    const uploadedGalleryImages = await uploadAdminFiles(formData.getAll("gallery_files"), "products/gallery")
    const categoryId = toString(formData.get("category_id"))
    const existingMainImageUrl = toString(formData.get("existing_main_image_url"))
    const removeMainImage = toBoolean(formData.get("remove_main_image"))
    const keptGalleryUrls = formData
      .getAll("keep_gallery_urls")
      .map((item) => String(item).trim())
      .filter(Boolean)

    const keyFeatures = toString(formData.get("key_features"))
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)

    const galleryImages = [...keptGalleryUrls, ...uploadedGalleryImages]

    const payload: Record<string, unknown> = {
      slug: createSlug(name),
      name,
      tagline: toString(formData.get("tagline")),
      original_price: toNumber(formData.get("original_price")),
      sale_price: toNumber(formData.get("sale_price")),
      in_stock: toBoolean(formData.get("in_stock")),
      category_id: categoryId || null,
      description: toString(formData.get("description")),
      key_features: keyFeatures,
      specifications: toString(formData.get("specifications")),
      shipping_returns: toString(formData.get("shipping_returns")),
      ebay_link: toString(formData.get("ebay_link")),
      rating: toNumber(formData.get("rating"), 5),
      review_count: Math.max(0, Math.floor(toNumber(formData.get("review_count"), 0))),
      is_best_seller: toBoolean(formData.get("is_best_seller")),
      is_new: toBoolean(formData.get("is_new")),
      is_on_sale: toBoolean(formData.get("is_on_sale")),
      show_in_shop: toBoolean(formData.get("show_in_shop")),
      gallery_images: galleryImages,
    }

    if (uploadedMainImage) {
      payload.image_url = uploadedMainImage
    } else if (removeMainImage) {
      payload.image_url = ""
    } else if (existingMainImageUrl) {
      payload.image_url = existingMainImageUrl
    }

    await updateRows(
      "products",
      `id=eq.${encodeURIComponent(productId)}&select=id`,
      payload,
    )

    invalidateStoreCaches()
    redirectWithStatusAndTab(adminPath, tab, "Product fully updated")
  } catch (error) {
    if (isNextControlFlowError(error)) {
      throw error
    }
    redirectWithStatusAndTab(adminPath, tab, getActionErrorMessage(error))
  }
}

export async function deleteCategory(formData: FormData) {
  const adminPath = toString(formData.get("adminPath"))
  const tab = toString(formData.get("tab"))
  const categoryId = toString(formData.get("category_id"))

  if (!categoryId) {
    redirectWithStatusAndTab(adminPath, tab, "Category id missing")
  }

  try {
    await deleteRows("categories", `id=eq.${encodeURIComponent(categoryId)}&select=id`)

    invalidateStoreCaches()
    redirectWithStatusAndTab(adminPath, tab, "Category deleted")
  } catch (error) {
    if (isNextControlFlowError(error)) {
      throw error
    }
    redirectWithStatusAndTab(adminPath, tab, getActionErrorMessage(error))
  }
}

export async function deleteProduct(formData: FormData) {
  const adminPath = toString(formData.get("adminPath"))
  const tab = toString(formData.get("tab"))
  const productId = toString(formData.get("product_id"))

  if (!productId) {
    redirectWithStatusAndTab(adminPath, tab, "Product id missing")
  }

  try {
    await deleteRows("products", `id=eq.${encodeURIComponent(productId)}&select=id`)

    invalidateStoreCaches()
    redirectWithStatusAndTab(adminPath, tab, "Product deleted")
  } catch (error) {
    if (isNextControlFlowError(error)) {
      throw error
    }
    redirectWithStatusAndTab(adminPath, tab, getActionErrorMessage(error))
  }
}
