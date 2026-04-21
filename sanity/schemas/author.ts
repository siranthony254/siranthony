import { defineType, defineField } from 'sanity'

export const authorSchema = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
})
