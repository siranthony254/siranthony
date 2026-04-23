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
      initialValue: 'Sir Anthony — Voice of Transformation',
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
      title: 'Primary Contact Phone',
      type: 'string',
      description: 'Conversations & Speaking',
      initialValue: '+254 741 518 589',
    }),
    defineField({
      name: 'contactPhoneAlt',
      title: 'Secondary Contact Phone',
      type: 'string',
      description: 'Digital Strategy & Web',
      initialValue: '+254 727 974 516',
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
      name: 'workHeroImage',
      title: 'Work Page Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' })
      ],
      description: 'Background image for Work With Me page hero section',
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
