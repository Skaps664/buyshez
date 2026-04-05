import "server-only"

import { createClient } from "@supabase/supabase-js"

const getEnv = (...keys: string[]) => {
  for (const key of keys) {
    const value = process.env[key]
    if (value) return value
  }
  return ""
}

const SUPABASE_URL = getEnv("NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL")
const SUPABASE_SERVICE_ROLE_KEY = getEnv(
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_SUPABASE_SERVICE_ROLE_KEY",
)
const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "buyshez-media"

const sanitizeFileName = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-")

function createAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing Supabase upload env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_SUPABASE_SERVICE_ROLE_KEY).",
    )
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

async function ensurePublicBucket() {
  const client = createAdminClient()
  const { data: buckets, error: listError } = await client.storage.listBuckets()

  if (listError) {
    throw new Error(`Storage list bucket failed: ${listError.message}`)
  }

  const exists = buckets.some((bucket) => bucket.name === STORAGE_BUCKET)

  if (!exists) {
    const { error: createError } = await client.storage.createBucket(STORAGE_BUCKET, {
      public: true,
      fileSizeLimit: 10 * 1024 * 1024,
      allowedMimeTypes: ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"],
    })

    if (createError) {
      throw new Error(`Storage bucket creation failed: ${createError.message}`)
    }
  }

  return client
}

export async function uploadAdminFile(entry: FormDataEntryValue | null, folder: string): Promise<string | null> {
  if (!(entry instanceof File) || entry.size === 0) {
    return null
  }

  const client = await ensurePublicBucket()
  const safeName = sanitizeFileName(entry.name || "upload")
  const path = `${folder}/${Date.now()}-${crypto.randomUUID()}-${safeName}`

  const buffer = Buffer.from(await entry.arrayBuffer())
  const { error: uploadError } = await client.storage.from(STORAGE_BUCKET).upload(path, buffer, {
    contentType: entry.type || "application/octet-stream",
    upsert: false,
    cacheControl: "31536000",
  })

  if (uploadError) {
    throw new Error(`File upload failed: ${uploadError.message}`)
  }

  const { data } = client.storage.from(STORAGE_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function uploadAdminFiles(entries: FormDataEntryValue[], folder: string): Promise<string[]> {
  const uploaded: string[] = []

  for (const entry of entries) {
    const url = await uploadAdminFile(entry, folder)
    if (url) uploaded.push(url)
  }

  return uploaded
}
