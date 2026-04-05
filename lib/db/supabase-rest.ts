import "server-only"

const getEnv = (...keys: string[]) => {
  for (const key of keys) {
    const value = process.env[key]
    if (value) return value
  }
  return ""
}

const SUPABASE_URL = getEnv("NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL")
const SUPABASE_ANON_KEY = getEnv(
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "SUPABASE_PUBLISHABLE_KEY",
)
const SUPABASE_SERVICE_ROLE_KEY = getEnv(
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_SUPABASE_SERVICE_ROLE_KEY",
)

const getProjectHost = () => {
  try {
    return SUPABASE_URL ? new URL(SUPABASE_URL).host : "unknown"
  } catch {
    return "unknown"
  }
}

function getBaseHeaders(useServiceRole = false): HeadersInit {
  if (useServiceRole && !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing. Admin create/update actions require service role key in .env.local.",
    )
  }

  const token = useServiceRole ? SUPABASE_SERVICE_ROLE_KEY : SUPABASE_ANON_KEY
  return {
    apikey: token,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }
}

export function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
}

async function request<T>(
  table: string,
  query = "",
  options: RequestInit = {},
  useServiceRole = false,
): Promise<T> {
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase env vars are missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.")
  }

  const url = `${SUPABASE_URL}/rest/v1/${table}${query ? `?${query}` : ""}`

  const response = await fetch(url, {
    ...options,
    headers: {
      ...getBaseHeaders(useServiceRole),
      ...(options.headers || {}),
    },
    cache: "no-store",
  })

  if (!response.ok) {
    const text = await response.text()
    if (response.status === 404 && text.includes("PGRST205")) {
      throw new Error(
        `Supabase tables are missing in this project (${getProjectHost()}). Run supabase/schema.sql and then run: NOTIFY pgrst, 'reload schema'; in SQL Editor, then retry.`,
      )
    }

    if (response.status === 401 && text.includes("42501")) {
      throw new Error(
        "Supabase RLS blocked this write. Ensure SUPABASE_SERVICE_ROLE_KEY is set correctly in .env.local and restart the dev server.",
      )
    }

    throw new Error(`Supabase request failed (${response.status}): ${text}`)
  }

  if (response.status === 204) {
    return [] as T
  }

  return (await response.json()) as T
}

export async function selectRows<T>(table: string, query: string, useServiceRole = false) {
  return request<T>(table, query, {}, useServiceRole)
}

export async function insertRows<T>(table: string, payload: unknown, query = "select=*", useServiceRole = true) {
  return request<T>(
    table,
    query,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Prefer: "return=representation",
      },
    },
    useServiceRole,
  )
}

export async function upsertRows<T>(table: string, payload: unknown, query = "select=*", useServiceRole = true) {
  return request<T>(
    table,
    query,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Prefer: "resolution=merge-duplicates,return=representation",
      },
    },
    useServiceRole,
  )
}

export async function updateRows<T>(table: string, query: string, payload: unknown, useServiceRole = true) {
  return request<T>(
    table,
    query,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        Prefer: "return=representation",
      },
    },
    useServiceRole,
  )
}

export async function deleteRows<T>(table: string, query: string, useServiceRole = true) {
  return request<T>(
    table,
    query,
    {
      method: "DELETE",
      headers: {
        Prefer: "return=representation",
      },
    },
    useServiceRole,
  )
}
