import { defineType, defineField } from 'sanity'

export const impactNumbersSchema = defineType({
  name: 'impactNumbers',
  title: 'Impact Numbers',
  type: 'document',
  fields: [
    // ─── Speaking ────────────────────────────────────────────────
    defineField({
      name: 'speaking',
      title: 'Speaking',
      type: 'object',
      description: 'Stats related to speaking engagements and events',
      fields: [
        defineField({
          name: 'speakingEngagements',
          title: 'Speaking Engagements',
          type: 'number',
          description: 'Total number of speaking engagements done',
        }),
        defineField({
          name: 'eventsFacilitated',
          title: 'Events Facilitated',
          type: 'number',
          description: 'Total events facilitated',
        }),
        defineField({
          name: 'campusesEngaged',
          title: 'Campuses Engaged',
          type: 'number',
          description: 'Total campuses engaged',
        }),
        defineField({
          name: 'workshopsFacilitated',
          title: 'Workshops Facilitated',
          type: 'number',
          description: 'Total workshops facilitated',
        }),
        defineField({
          name: 'conversationsDone',
          title: 'Conversations Done',
          type: 'number',
          description: 'Total conversations done',
        }),
      ],
    }),

    // ─── Projects ────────────────────────────────────────────────
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'object',
      description: 'Stats related to digital and brand projects',
      fields: [
        defineField({
          name: 'websitesLaunched',
          title: 'Websites Launched',
          type: 'number',
          description: 'Total websites built and launched',
        }),
        defineField({
          name: 'brandsSupported',
          title: 'Brands Supported',
          type: 'number',
          description: 'Total brands supported',
        }),
        defineField({
          name: 'demoProjects',
          title: 'Demo Projects',
          type: 'number',
          description: 'Total demo / experimental projects',
        }),
      ],
    }),

    // ─── Impact Movements & Initiatives ──────────────────────────
    defineField({
      name: 'impactMovements',
      title: 'Impact Movements & Initiatives',
      type: 'array',
      description: 'Add custom initiative stats — each entry is a label and a number (e.g. "Communities Reached: 12")',
      of: [
        {
          type: 'object',
          name: 'movementStat',
          title: 'Initiative Stat',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "Communities Reached", "Lives Impacted"',
              validation: r => r.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'number',
              description: 'The number to display',
              validation: r => r.required().min(0),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
            prepare: ({ title, subtitle }: { title?: string; subtitle?: number }) => ({
              title: title || 'Untitled',
              subtitle: subtitle !== undefined ? `${subtitle}` : '—',
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Impact Numbers' }),
  },
})
