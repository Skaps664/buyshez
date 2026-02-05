"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ShoppingBag, Sparkles } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export function ShopPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if popup has been shown in this session
    const popupShown = sessionStorage.getItem('shopPopupShown')
    
    if (!popupShown && !hasShown) {
      // Show popup after 10 seconds
      const timer = setTimeout(() => {
        setIsOpen(true)
        setHasShown(true)
        sessionStorage.setItem('shopPopupShown', 'true')
      }, 10000) // 10 seconds

      return () => clearTimeout(timer)
    }
  }, [hasShown])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-2 border-primary/20">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 bg-background/80 backdrop-blur-sm hover:bg-background boty-transition z-10"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="relative">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10" />
          
          <div className="relative p-8 text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 animate-bounce">
              <ShoppingBag className="w-8 h-8 text-primary" />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">New!</span>
            </div>

            {/* Heading */}
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
              Discover Our Shop!
            </h3>

            {/* Description */}
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              We've got amazing products waiting for you! Tech accessories, lifestyle items, and more – all available on eBay.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                onClick={handleClose}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium boty-transition hover:bg-primary/90 boty-shadow"
              >
                <ShoppingBag className="w-4 h-4" />
                Visit Shop
              </Link>
              <button
                onClick={handleClose}
                className="inline-flex items-center justify-center gap-2 bg-muted text-foreground px-6 py-3 rounded-full text-sm font-medium boty-transition hover:bg-muted/80"
              >
                Maybe Later
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span className="text-green-500">✓</span>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-500">✓</span>
                  <span>Fast Shipping</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-500">✓</span>
                  <span>eBay Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
