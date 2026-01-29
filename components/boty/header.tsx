"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
          </div>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-serif text-3xl tracking-wider text-foreground">buyshez</h1>
          </Link>

          {/* Desktop Navigation - Right */}
          <div className="hidden lg:flex items-center gap-8">
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
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden boty-transition ${
            isMenuOpen ? "max-h-64 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-border/50">
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
          </div>
        </div>
      </nav>
    </header>
  )
}
