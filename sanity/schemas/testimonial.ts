import { defineType, defineField } from 'sanity'

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 5,
      validation: r => r.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Author Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'context',
      title: 'Context',
      type: 'string',
      description: 'What engagement this testimonial is about — e.g. Cultural Training, Keynote',
      options: {
        list: [
          { title: 'Keynote / Talk',    value: 'keynote' },
          { title: 'Cultural Training', value: 'training' },
          { title: 'Digital Strategy',  value: 'digital' },
          { title: "Mic'd Up",         value: 'micdup' },
          { title: 'General',          value: 'general' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Show on Home Page',
      type: 'boolean',
      initialValue: false,
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
    select: { title: 'author', subtitle: 'organization', media: 'image' },
  },
})
