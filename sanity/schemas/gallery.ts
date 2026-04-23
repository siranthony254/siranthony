import { defineType, defineField } from 'sanity'

export const gallerySchema = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      title: 'Title', 
      type: 'string', 
      validation: r => r.required() 
    }),
    defineField({ 
      name: 'slug', 
      title: 'Slug', 
      type: 'slug', 
      options: { source: 'title' }, 
      validation: r => r.required() 
    }),
    defineField({ 
      name: 'description', 
      title: 'Description', 
      type: 'text', 
      rows: 3 
    }),
    defineField({ 
      name: 'heroImage', 
      title: 'Hero Background Image', 
      type: 'image', 
      options: { hotspot: true }, 
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' })
      ],
      validation: r => r.required()
    }),
    defineField({ 
      name: 'heroTitle', 
      title: 'Hero Title', 
      type: 'string', 
      validation: r => r.required() 
    }),
    defineField({ 
      name: 'heroSubtitle', 
      title: 'Hero Subtitle', 
      type: 'text', 
      rows: 2 
    }),
    defineField({ 
      name: 'images', 
      title: 'Gallery Images', 
      type: 'array', 
      of: [
        {
          type: 'object',
          fields: [
            defineField({ 
              name: 'image', 
              title: 'Image', 
              type: 'image', 
              options: { hotspot: true }, 
              fields: [
                defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
                defineField({ name: 'caption', type: 'string', title: 'Caption' })
              ],
              validation: r => r.required()
            }),
            defineField({ 
              name: 'category', 
              title: 'Category', 
              type: 'string',
              options: { 
                list: [
                  { title: 'Events', value: 'events' },
                  { title: 'Speaking', value: 'speaking' },
                  { title: 'Media', value: 'media' },
                  { title: 'Personal', value: 'personal' },
                  { title: 'Professional', value: 'professional' }
                ]
              }
            }),
            defineField({ 
              name: 'order', 
              title: 'Display Order', 
              type: 'number' 
            })
          ]
        }
      ]
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'object', fields: [
      defineField({ name: 'metaTitle',       type: 'string', title: 'Meta Title' }),
      defineField({ name: 'metaDescription', type: 'text',   title: 'Meta Description', rows: 2 }),
      defineField({ name: 'ogImage',         type: 'image',  title: 'OG Image' }),
    ]}),
  ],
  preview: {
    select: { title: 'title', heroImage: 'heroImage' },
    prepare: ({ title, heroImage }) => ({
      title,
      media: heroImage,
    }),
  },
})
