"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminEntryPage() {
  const router = useRouter()
  const [key, setKey] = useState("")

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmed = key.trim()
    if (!trimmed) return

    router.push(`/admin/${encodeURIComponent(trimmed)}`)
  }

  return (
    <main className="min-h-screen bg-white px-4 py-12 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-blue-600">Admin Access</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Enter Admin Key</h1>
        <p className="mt-2 text-sm text-slate-600">
          Use your admin key to open the dashboard.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block space-y-2 text-sm">
            <span className="text-slate-900">Admin Key</span>
            <input
              type="password"
              value={key}
              onChange={(event) => setKey(event.target.value)}
              placeholder="Enter key"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
              autoFocus
              required
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Open Dashboard
          </button>
        </form>
      </div>
    </main>
  )
}
