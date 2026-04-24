import { defineType, defineField } from 'sanity'

export const intellectualWorkSchema = defineType({
  name: 'intellectualWork',
  title: 'Intellectual Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Work Title',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: r => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Blog', value: 'blog' },
          { title: 'Script', value: 'script' },
          { title: 'Poetry', value: 'poetry' },
          { title: 'Book', value: 'book' },
          { title: 'Essay', value: 'essay' },
          { title: 'Research', value: 'research' },
          { title: 'Speech', value: 'speech' },
          { title: 'Article', value: 'article' },
        ],
      },
      validation: r => r.required(),
    }),
    defineField({
      name: 'customCategory',
      title: 'Custom Category',
      type: 'string',
      description: 'Add a custom category if not in the list above',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: r => r.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 8,
      description: 'Full content or excerpt of the intellectual work',
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      validation: r => r.required(),
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Link to the full work if hosted elsewhere',
    }),
    defineField({
      name: 'document',
      title: 'Document Upload',
      type: 'file',
      description: 'Upload the full document (PDF, DOC, etc.)',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' })
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Work',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display this work',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for categorization and search',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
})
