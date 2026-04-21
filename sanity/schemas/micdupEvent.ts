import { defineType, defineField } from 'sanity'

export const micdupEventSchema = defineType({
  name: 'micdupEvent',
  title: "Mic'd Up Event",
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'type',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Talk',     value: 'talk' },
          { title: 'Panel',    value: 'panel' },
          { title: 'Summit',   value: 'summit' },
          { title: 'Debate',   value: 'debate' },
          { title: 'Workshop', value: 'workshop' },
        ],
      },
      validation: r => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: r => r.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Campus / venue name and city',
      validation: r => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: r => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Event Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
    }),
    defineField({
      name: 'recap',
      title: 'Event Recap',
      type: 'text',
      rows: 4,
      description: 'Short recap for past events',
    }),
    defineField({
      name: 'attendees',
      title: 'Approximate Attendees',
      type: 'number',
    }),
    defineField({
      name: 'campus',
      title: 'Campus / Institution',
      type: 'string',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights / Quotes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key moments or audience quotes from the event',
    }),
  ],
  orderings: [
    { title: 'Most Recent', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'image' },
  },
})
