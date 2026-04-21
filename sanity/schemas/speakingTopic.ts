import { defineType, defineField } from 'sanity'

export const speakingTopicSchema = defineType({
  name: 'speakingTopic',
  title: 'Speaking Topic',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Topic Title',
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
      name: 'keyPoints',
      title: 'Key Points',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'The main takeaways audiences leave with',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. 45–60 minutes, Half day, Full day',
      validation: r => r.required(),
    }),
    defineField({
      name: 'audience',
      title: 'Best For',
      type: 'string',
      description: 'e.g. Corporate leadership, University students, Faith communities',
      validation: r => r.required(),
    }),
    defineField({
      name: 'format',
      title: 'Format Options',
      type: 'string',
      description: 'e.g. Keynote, Workshop, Panel, Facilitated conversation',
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
    select: { title: 'title', subtitle: 'audience' },
  },
})
