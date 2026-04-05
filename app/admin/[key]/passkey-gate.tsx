"use client"

import { FormEvent, ReactNode, useState } from "react"
import { useEffect } from "react"

interface PasskeyGateProps {
  expectedKey: string
  children: ReactNode
}

export function PasskeyGate({ expectedKey, children }: PasskeyGateProps) {
  const sessionKey = "buyshez-admin-unlocked"
  const [inputKey, setInputKey] = useState("")
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(sessionKey) === "1") {
        setUnlocked(true)
      }
    } catch {
      // Ignore storage access failures and keep gate locked.
    }
  }, [])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (inputKey.trim() === expectedKey) {
      setUnlocked(true)
      setError("")
      setInputKey("")
      try {
        window.sessionStorage.setItem(sessionKey, "1")
      } catch {
        // Ignore storage write failures.
      }
      return
    }

    setUnlocked(false)
    setError("Wrong passkey")
  }

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-white px-4 py-12 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Admin Verification</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Enter Passkey</h1>
          <p className="mt-2 text-sm text-slate-600">
            Passkey is required to open admin in this browser tab.
          </p>

          <form className="mt-5 space-y-3" onSubmit={onSubmit}>
            <input
              type="password"
              value={inputKey}
              onChange={(event) => setInputKey(event.target.value)}
              placeholder="Enter passkey"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              autoFocus
              required
            />
            {error ? <p className="text-xs text-red-600">{error}</p> : null}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Verify
            </button>
          </form>
        </div>
      </main>
    )
  }

  return <>{children}</>
}
