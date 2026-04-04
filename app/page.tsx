import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BriefcaseBusiness, ShoppingBag } from "lucide-react"

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-background via-card to-background flex items-center px-6 py-16 md:px-10">
      <Link href="/" className="absolute top-6 left-6 z-10">
        <Image
          src="/b-log.png"
          alt="BuyShez"
          width={160}
          height={56}
          className="h-10 md:h-12 w-auto object-contain"
          priority
        />
      </Link>
      <div className="mx-auto w-full max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.35em] text-primary mb-4">Welcome to BuyShez</p>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground">Choose Your Destination</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Pick the experience you need today. Explore our business services or visit our product store.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

<section className="rounded-3xl border border-border/60 bg-card p-8 md:p-10 boty-shadow">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-6">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-serif text-3xl text-foreground mb-3">BuyShez Store</h2>
            <p className="text-muted-foreground mb-8">
              Browse our curated catalog and shop trusted products through our secure eBay storefront.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground boty-transition hover:bg-primary/90"
            >
              Go to Store
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          <section className="rounded-3xl border border-border/60 bg-card p-8 md:p-10 boty-shadow">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-6">
              <BriefcaseBusiness className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-serif text-3xl text-foreground mb-3">BuyShez Services</h2>
            <p className="text-muted-foreground mb-8">
              Strategic consulting, digital transformation, and growth support for startups, SMEs, and enterprises.
            </p>
            <Link
              href="/service"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground boty-transition hover:bg-primary/90"
            >
              Go to Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          
        </div>
      </div>
    </main>
  )
}
