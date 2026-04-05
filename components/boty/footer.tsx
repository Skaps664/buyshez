"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Linkedin } from "lucide-react"

interface FooterProps {
  mode?: "services" | "store"
}

const footerLinks = {
  about: [
    { name: "Our Story", href: "#about" },
    { name: "Team", href: "#team" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" }
  ],
  shop: [
    { name: "Browse Products", href: "/shop" },
    { name: "Shop on eBay", href: "https://ebay.com" },
    { name: "New Arrivals", href: "/shop" },
    { name: "Best Sellers", href: "/shop" }
  ],
  company: [
    { name: "Contact Us", href: "#contact" },
    { name: "Privacy Policy", href: "/" },
    { name: "Terms of Service", href: "/" },
    { name: "Sustainability", href: "/" }
  ]
}

export function Footer({ mode = "services" }: FooterProps) {
  const isStore = mode === "store"

  return (
    <footer className="bg-card pt-20 pb-10 relative overflow-hidden">
      {/* Giant Background Text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0">
        <span className="font-serif text-[200px] sm:text-[200px] md:text-[400px] lg:text-[400px] xl:text-[400px] font-bold text-white/20 whitespace-nowrap leading-none">
          buyshez
        </span>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex mb-4">
              <Image
                src="/b-log-3.png"
                alt="BuyShez"
                width={180}
                height={64}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {isStore
                ? "Curated products, trusted listings, and a smooth buying experience with fast fulfillment."
                : "Strategic consulting and digital solutions for startups, SMEs, and enterprises."}
            </p>
            <div className="text-xs text-muted-foreground space-y-1 mb-6">
              <p className="font-medium text-foreground">BUYSHEZ LTD</p>
              <p>Registered in England & Wales</p>
              <p>Company No: 16961251</p>
              <p>VAT Registered</p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/buyshez"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition boty-shadow"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61586142497810"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition boty-shadow"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition boty-shadow"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-medium text-foreground mb-4">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground boty-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-medium text-foreground mb-4">{isStore ? "Store" : "Explore"}</h3>
            <ul className="space-y-3">
              {(isStore
                ? [
                    { name: "Browse Products", href: "/shop" },
                    { name: "eBay Store", href: "https://ebay.com" },
                    { name: "Go to Services", href: "/service" },
                    { name: "Main Gateway", href: "/" }
                  ]
                : [
                    { name: "Main Gateway", href: "/" },
                    { name: "Visit Store", href: "/shop" },
                    { name: "Contact Us", href: "#contact" },
                    { name: "Our Team", href: "#team" }
                  ]).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground boty-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {(isStore
                ? [
                    { name: "Services", href: "/service" },
                    { name: "Main Gateway", href: "/" },
                    { name: "Privacy Policy", href: "/" },
                    { name: "Terms of Service", href: "/" }
                  ]
                : footerLinks.company).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground boty-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} BUYSHEZ LTD. All rights reserved. Registered in England & Wales, Company No: 16961251
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Designed and developed by{" "}
                <a
                  href="https://www.skordlabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground boty-transition"
                >
                  Skordlabs
                </a>
                , and skordlabs is www.skordlabs.com
              </p>
            </div>
            <div className="flex gap-6 items-center">
              {isStore ? (
                <Link href="/service" className="text-sm text-primary hover:text-foreground boty-transition">
                  Go to Services
                </Link>
              ) : (
                <Link href="/shop" className="text-sm text-primary hover:text-foreground boty-transition">
                  Visit Store
                </Link>
              )}
              <Link href="https://ebay.com" className="text-sm text-muted-foreground hover:text-foreground boty-transition">
                eBay
              </Link>
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground boty-transition">
                Privacy Policy
              </Link>
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground boty-transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
