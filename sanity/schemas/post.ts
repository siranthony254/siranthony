import { defineType, defineField } from 'sanity'

export const postSchema = defineType({
  name: 'post',
  title: 'Conversation / Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'featured', title: 'Featured on Home', type: 'boolean', initialValue: false }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: [
        { title: 'Culture',           value: 'culture' },
        { title: 'Individual',        value: 'individual' },
        { title: 'Leadership',        value: 'leadership' },
        { title: 'Education Culture', value: 'education' },
        { title: 'Art of Ideas',      value: 'ideas' },
        { title: 'Family',            value: 'family' },
        { title: 'Political Culture', value: 'political' },
      ]},
      validation: r => r.required(),
    }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', validation: r => r.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, validation: r => r.required().max(300) }),
    defineField({ name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true }, fields: [
      defineField({ name: 'alt', type: 'string', title: 'Alt text' })
    ]}),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [
      { type: 'block' },
      { type: 'image', options: { hotspot: true }, fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
        defineField({ name: 'caption', type: 'string', title: 'Caption' }),
      ]},
    ]}),
    defineField({ name: 'seo', title: 'SEO', type: 'object', fields: [
      defineField({ name: 'metaTitle',       type: 'string', title: 'Meta Title' }),
      defineField({ name: 'metaDescription', type: 'text',   title: 'Meta Description', rows: 2 }),
      defineField({ name: 'ogImage',         type: 'image',  title: 'OG Image' }),
    ]}),
  ],
  preview: {
    select: { title: 'title', category: 'category', media: 'mainImage' },
    prepare: ({ title, category, media }) => ({
      title,
      subtitle: category,
      media,
    }),
  },
})
