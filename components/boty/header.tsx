"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, ShoppingCart, User } from "lucide-react"
import { useCart } from "./cart-context"

interface HeaderProps {
  mode?: "services" | "store"
}

export function Header({ mode = "services" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isStore = mode === "store"
  const { itemCount, setIsOpen } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 backdrop-blur-md rounded-lg py-0 my-0 animate-scale-fade-in bg-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.32)]" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px' }}>
        <div className="flex items-center justify-between h-[68px]">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground/80 hover:text-foreground boty-transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Navigation - Left */}
          <div className="hidden lg:flex items-center gap-8">
            {isStore ? (
              <>
                <Link
                  href="/shop"
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                >
                  Shop
                </Link>
                <Link
                  href="/shop"
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                >
                  Categories
                </Link>
                <Link
                  href="/shop"
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                >
                  Deals
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="#services"
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                >
                  Services
                </Link>
                <Link
                  href="#team"
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                >
                  Team
                </Link>
                <Link
                  href="#about"
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                >
                  About Us
                </Link>
              </>
            )}
          </div>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-serif text-3xl tracking-wider text-foreground">buyshez</h1>
          </Link>

          {/* Desktop Navigation - Right */}
          <div className="hidden lg:flex items-center gap-8">
            {isStore ? (
              <>
                <button
                  type="button"
                  aria-label="Open cart"
                  onClick={() => setIsOpen(true)}
                  className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-border text-foreground/80 hover:text-foreground hover:bg-muted boty-transition"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-[11px] leading-5 font-medium text-center">
                      {itemCount}
                    </span>
                  )}
                </button>
                <Link
                  href="#"
                  aria-label="Open account"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border text-foreground/80 hover:text-foreground hover:bg-muted boty-transition"
                >
                  <User className="w-4 h-4" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="#offerings"
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                >
                  Offerings
                </Link>
                <Link
                  href="#testimonials"
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                >
                  Testimonials
                </Link>
                <Link
                  href="#contact"
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                >
                  Contact
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm tracking-wide boty-transition hover:bg-primary/90 boty-shadow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Visit Store
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden boty-transition ${
            isMenuOpen ? "max-h-64 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-border/50">
            {isStore ? (
              <>
                <Link
                  href="/shop"
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                >
                  Shop
                </Link>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    aria-label="Open cart"
                    onClick={() => {
                      setIsOpen(true)
                      setIsMenuOpen(false)
                    }}
                    className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-border text-foreground/80 hover:text-foreground hover:bg-muted boty-transition"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-[11px] leading-5 font-medium text-center">
                        {itemCount}
                      </span>
                    )}
                  </button>
                  <Link
                    href="#"
                    aria-label="Open account"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border text-foreground/80 hover:text-foreground hover:bg-muted boty-transition"
                  >
                    <User className="w-4 h-4" />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="#services"
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                >
                  Services
                </Link>
                <Link
                  href="#team"
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                >
                  Team
                </Link>
                <Link
                  href="#about"
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                >
                  About Us
                </Link>
                <Link
                  href="#offerings"
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                >
                  Offerings
                </Link>
                <Link
                  href="#testimonials"
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                >
                  Testimonials
                </Link>
                <Link
                  href="#contact"
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
                >
                  Contact
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm tracking-wide boty-transition hover:bg-primary/90 boty-shadow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Visit Store
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
