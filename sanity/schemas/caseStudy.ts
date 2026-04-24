import { defineType, defineField } from 'sanity'

export const caseStudySchema = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Study Title',
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
      name: 'client',
      title: 'Client/Project',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' })
      ],
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 4,
      validation: r => r.required(),
      description: 'How do you build a digital presence for a movement that is simultaneously a campus initiative, a media platform, and a thought leadership vehicle?',
    }),
    defineField({
      name: 'culturalThinking',
      title: 'The Cultural Thinking',
      type: 'text',
      rows: 4,
      validation: r => r.required(),
      description: 'What values needed to be communicated? What audience was the site serving? What did the digital presence need to make people feel before they read a single word?',
    }),
    defineField({
      name: 'execution',
      title: 'The Execution',
      type: 'text',
      rows: 4,
      validation: r => r.required(),
      description: 'The technical and design decisions. The content architecture. The user journey.',
    }),
    defineField({
      name: 'outcome',
      title: 'The Outcome',
      type: 'text',
      rows: 4,
      validation: r => r.required(),
      description: 'Current traffic, institutional partnerships it has supported, and how it has served the mission.',
    }),
    defineField({
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
      description: 'Link to the live project',
    }),
    defineField({
      name: 'additionalResources',
      title: 'Additional Resources',
      type: 'array',
      of: [
        defineField({
          name: 'resource',
          title: 'Resource',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Resource Title',
              type: 'string',
              validation: r => r.required(),
            }),
            defineField({
              name: 'description',
              title: 'Resource Description',
              type: 'text',
              rows: 2,
              validation: r => r.required(),
            }),
            defineField({
              name: 'url',
              title: 'Resource URL',
              type: 'url',
              validation: r => r.required(),
            }),
            defineField({
              name: 'type',
              title: 'Resource Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Document', value: 'document' },
                  { title: 'Link', value: 'link' },
                  { title: 'Video', value: 'video' },
                  { title: 'Image', value: 'image' },
                ]
              },
              initialValue: 'link',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'documentUpload',
      title: 'Document Upload',
      type: 'file',
      description: 'Upload supporting documents (PDFs, etc.)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Case Study',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display this case study',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
    },
  },
})
