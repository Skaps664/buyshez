# BuyShez Shop - Sanity CMS Integration Guide

This guide will help you set up Sanity CMS for managing your BuyShez shop products.

## Quick Start

### 1. Create a Sanity Account and Project

1. Go to [sanity.io](https://www.sanity.io) and sign up
2. Click "Create New Project"
3. Choose a project name (e.g., "BuyShez Shop")
4. Select "production" as the dataset name
5. Copy your **Project ID** (you'll need this later)

### 2. Set Up Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Sanity credentials:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

### 3. Create a Sanity Studio

You have two options:

#### Option A: Create Studio in Separate Directory (Recommended)

```bash
# Navigate to your projects folder
cd ~/projects

# Create new Sanity Studio
npx sanity init

# Follow the prompts:
# - Use existing project: Select your BuyShez project
# - Dataset: production
# - Output path: buyshez-studio
# - Template: Clean project with no predefined schemas

cd buyshez-studio
```

#### Option B: Create Studio in Subdirectory

```bash
# From your buyshez project root
mkdir studio
cd studio
npx sanity init
```

### 4. Add the Product Schema

1. Copy the product schema from `sanity/product.schema.ts` in this project
2. In your Sanity Studio project, create/edit `schemas/index.ts`:

```typescript
import product from './product'

export const schemaTypes = [product]
```

3. Create `schemas/product.ts` and paste the product schema content

### 5. Configure CORS

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to "API" → "CORS Origins"
4. Click "Add CORS Origin"
5. Add your domains:
   - `http://localhost:3000` (for development)
   - Your production domain (e.g., `https://buyshez.com`)

### 6. Start Your Sanity Studio

```bash
cd buyshez-studio  # or wherever your studio is
npm run dev
```

Your studio will open at `http://localhost:3333`

### 7. Deploy Your Studio (Optional)

To make your studio accessible online:

```bash
sanity deploy
```

Choose a studio hostname (e.g., `buyshez.sanity.studio`)

## Adding Products

### Using the Sanity Studio

1. Open your Sanity Studio (`http://localhost:3333` or your deployed URL)
2. Click "Product" in the sidebar
3. Click "Create New"
4. Fill in the product details:
   - **Name**: Product name
   - **Slug**: Auto-generated from name (click "Generate")
   - **Description**: Short description (max 200 chars)
   - **Full Description**: Detailed product information
   - **Price**: Current price
   - **Original Price**: (Optional) For sale items
   - **Images**: Upload product images (at least 1)
   - **Badge**: Bestseller, New, Sale, or None
   - **Category**: Select category
   - **Brand**: Product brand
   - **In Stock**: Check if available
   - **eBay URL**: Direct link to eBay listing
   - **Features**: List key features
   - **Specifications**: Add technical specs

5. Click "Publish"

### Product Schema Fields Explained

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Product display name |
| slug | slug | Yes | URL-friendly identifier |
| description | text | Yes | Short description (200 chars max) |
| fullDescription | text | No | Detailed product description |
| price | number | Yes | Current selling price |
| originalPrice | number | No | Original price (for showing discounts) |
| images | array | Yes | Product images (minimum 1) |
| badge | string | No | Bestseller, New, Sale, or none |
| category | string | Yes | Product category |
| brand | string | Yes | Product brand/manufacturer |
| inStock | boolean | Yes | Availability status |
| ebayUrl | url | Yes | Direct link to eBay listing |
| features | array | No | List of key features |
| specifications | object | No | Technical specifications |

## Integration with Next.js

The shop automatically fetches products from Sanity CMS using the functions in `lib/sanity.ts`.

### Available Functions

```typescript
// Get all products
import { getAllProducts } from '@/lib/sanity'
const products = await getAllProducts()

// Get single product by slug
import { getProductBySlug } from '@/lib/sanity'
const product = await getProductBySlug('premium-laptop-stand')

// Get products by category
import { getProductsByCategory } from '@/lib/sanity'
const products = await getProductsByCategory('tech-accessories')

// Get image URL
import { urlFor } from '@/lib/sanity'
const imageUrl = urlFor(product.images[0]).width(800).url()
```

### Current Implementation

The shop pages (`/shop` and `/product/[id]`) currently use **mock data** for UI demonstration.

**To enable Sanity CMS:**

1. Set up Sanity as described above
2. Add products via Sanity Studio
3. Uncomment the Sanity fetch code in:
   - `app/shop/page.tsx`
   - `app/product/[id]/page.tsx`
4. Replace mock data with Sanity queries

## Example: Fetching Products in Shop Page

```typescript
// app/shop/page.tsx
import { getAllProducts } from '@/lib/sanity'

export default async function ShopPage() {
  // Fetch from Sanity instead of using mockProducts
  const products = await getAllProducts()
  
  // Rest of your component...
}
```

## Troubleshooting

### CORS Errors
- Make sure you've added your domain to CORS origins in Sanity settings
- Check that your environment variables are correct

### Products Not Showing
- Verify your Sanity Project ID is correct
- Check that products are published in the studio
- Ensure the dataset name matches (usually "production")

### Images Not Loading
- Verify images are uploaded in Sanity Studio
- Check that image URLs are being generated correctly
- Ensure you're using the `urlFor()` function

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/plugins/next-sanity)
- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)

## Support

For Sanity-specific issues:
- [Sanity Community Slack](https://slack.sanity.io)
- [Sanity Help Center](https://www.sanity.io/help)

For project-specific questions:
- Check your console for error messages
- Verify environment variables are loaded
- Test API connection with: `https://[YOUR_PROJECT_ID].api.sanity.io/v2024-02-05/data/query/production?query=*[_type=="product"]`
