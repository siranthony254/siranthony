import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Sir Anthony — Conversationalist & Cultural Thinker',
      validation: r => r.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Who made you normal? That\'s the question. That\'s the work.',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      description: 'Speaking, training & bookings. The only number shown on the site.',
      initialValue: '+254 741 518 589',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({ name: 'linkedin',  type: 'url', title: 'LinkedIn' }),
        defineField({ name: 'youtube',   type: 'url', title: 'YouTube' }),
        defineField({ name: 'tiktok',    type: 'url', title: 'TikTok' }),
        defineField({ name: 'instagram', type: 'url', title: 'Instagram' }),
        defineField({ name: 'facebook',  type: 'url', title: 'Facebook' }),
        defineField({ name: 'threads',   type: 'url', title: 'Threads' }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Default OG Image',
      type: 'image',
      description: 'Default social sharing image (1200×630px)',
    }),
    defineField({
      name: 'homepageHeroImage',
      title: 'Homepage Hero Branded Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' })
      ],
      description: 'Branded image for homepage hero section (displayed on left side)',
    }),
    defineField({
      name: 'announcementBanner',
      title: 'Announcement Banner',
      type: 'object',
      fields: [
        defineField({ name: 'active',  type: 'boolean', title: 'Show Banner', initialValue: false }),
        defineField({ name: 'message', type: 'string',  title: 'Message' }),
        defineField({ name: 'link',    type: 'url',     title: 'Link (optional)' }),
        defineField({ name: 'linkText',type: 'string',  title: 'Link Text' }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
