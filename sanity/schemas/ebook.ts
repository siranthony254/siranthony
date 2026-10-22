import { defineType, defineField } from 'sanity'

export const ebookSchema = defineType({
  name: 'ebook',
  title: 'Ebook',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'file', title: 'The File' },
    { name: 'selling', title: 'Selling' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: r => r.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      description: 'Becomes the shareable link: /portfolio/your-slug',
      validation: r => r.required(),
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'content',
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      description:
        'Also used as the preview image when the link is shared on WhatsApp, X, LinkedIn. Landscape (1200×630) shares best.',
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
      validation: r => r.required(),
    }),

    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'One paragraph. Shown on the card and used as the share description.',
      validation: r => r.required().max(300),
    }),

    defineField({
      name: 'preview',
      title: 'Free Preview',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
      description:
        'What anyone can read without paying — the opening, a chapter, the argument. Make it genuinely good; this is what sells the rest.',
    }),

    defineField({
      name: 'contents',
      title: 'What is inside',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
      description: 'Chapter titles or a list of what the buyer gets',
    }),

    defineField({
      name: 'pageCount',
      title: 'Number of pages',
      type: 'number',
      group: 'content',
    }),

    // ─── The file ────────────────────────────────────────────────
    defineField({
      name: 'pdf',
      title: 'The PDF',
      type: 'file',
      group: 'file',
      options: { accept: 'application/pdf' },
      description:
        'Never linked directly on the site. It is fetched on the server, stamped with the buyer’s details, and streamed only to someone who has paid.',
      validation: r => r.required(),
    }),

    // ─── Selling ─────────────────────────────────────────────────
    defineField({
      name: 'priceKes',
      title: 'Price (KES)',
      type: 'number',
      group: 'selling',
      description: 'Whole shillings. M-Pesa cannot charge cents.',
      validation: r => r.required().min(1).integer(),
    }),

    defineField({
      name: 'forSale',
      title: 'On sale',
      type: 'boolean',
      group: 'selling',
      description: 'Turn off to show the preview but hide the buy button',
      initialValue: true,
    }),

    defineField({
      name: 'publishedDate',
      title: 'Published',
      type: 'date',
      group: 'selling',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),

    defineField({
      name: 'featured',
      title: 'Feature on Body of Work',
      type: 'boolean',
      group: 'selling',
      initialValue: false,
    }),

    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      group: 'selling',
    }),
  ],

  preview: {
    select: { title: 'title', media: 'coverImage', price: 'priceKes', forSale: 'forSale' },
    prepare: ({ title, media, price, forSale }: any) => ({
      title: title || 'Untitled',
      subtitle: forSale ? `KES ${price ?? '—'}` : 'Not on sale',
      media,
    }),
  },
})
