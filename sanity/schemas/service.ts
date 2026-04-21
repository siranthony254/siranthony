import { defineType, defineField } from 'sanity'

export const serviceSchema = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: r => r.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name: Mic2, Users, Globe, BookOpen',
      options: {
        list: [
          { title: 'Microphone (Speaking)',       value: 'Mic2' },
          { title: 'Users (Training)',            value: 'Users' },
          { title: 'Globe (Digital)',             value: 'Globe' },
          { title: 'Book (Consulting/Writing)',   value: 'BookOpen' },
        ],
      },
      validation: r => r.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features / Includes',
      type: 'array',
      of: [{ type: 'string' }],
      validation: r => r.required().min(3),
    }),
    defineField({
      name: 'cta',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Learn More',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: r => r.required(),
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'icon' },
  },
})
