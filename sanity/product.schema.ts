/**
 * Sanity Schema for Product
 * 
 * This schema defines the structure for products in your BuyShez shop.
 * 
 * TO USE:
 * 1. Create a Sanity Studio project: npx sanity init
 * 2. Copy this file to your Sanity Studio's schemas folder
 * 3. Import and add to your schema.js/ts file
 * 4. Deploy your studio: sanity deploy
 * 
 * SETUP INSTRUCTIONS:
 * 1. Sign up at https://www.sanity.io
 * 2. Create a new project
 * 3. Add your project ID to .env.local:
 *    NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
 *    NEXT_PUBLIC_SANITY_DATASET=production
 * 4. Set up CORS in Sanity: Add your domain to allowed origins
 */

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      rows: 5,
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'originalPrice',
      title: 'Original Price (for sale items)',
      type: 'number',
      validation: (Rule: any) => Rule.min(0),
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'badge',
      title: 'Badge',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: null },
          { title: 'Bestseller', value: 'Bestseller' },
          { title: 'New', value: 'New' },
          { title: 'Sale', value: 'Sale' },
        ],
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Tech Accessories', value: 'tech-accessories' },
          { title: 'Audio', value: 'audio' },
          { title: 'Wearables', value: 'wearables' },
          { title: 'Storage', value: 'storage' },
          { title: 'Office', value: 'office' },
          { title: 'Skincare', value: 'skincare' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'ebayUrl',
      title: 'eBay Product URL',
      type: 'url',
      validation: (Rule: any) => Rule.required().uri({
        scheme: ['http', 'https'],
      }),
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List the key features of the product',
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        { name: 'material', title: 'Material', type: 'string' },
        { name: 'weight', title: 'Weight', type: 'string' },
        { name: 'dimensions', title: 'Dimensions', type: 'string' },
        { name: 'color', title: 'Color', type: 'string' },
        { name: 'warranty', title: 'Warranty', type: 'string' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
      subtitle: 'category',
    },
  },
}
