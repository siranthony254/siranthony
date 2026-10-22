import { defineType, defineField } from 'sanity'

// Kept in step by hand with src/lib/youtube.ts — the Studio builds through its
// own bundler and cannot rely on the `@/` path alias.
const YOUTUBE_ID_PATTERN =
  /(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?(?:[^"'\s]*&)?v=|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/

const BARE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/

function extractId(value?: string): string | null {
  if (!value) return null
  const trimmed = value.trim()
  const match = trimmed.match(YOUTUBE_ID_PATTERN)
  if (match) return match[1]
  if (BARE_ID_PATTERN.test(trimmed)) return trimmed
  return null
}

export const videoConversationSchema = defineType({
  name: 'videoConversation',
  title: 'Video Conversation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'What this conversation is called on the site',
      validation: r => r.required(),
    }),

    defineField({
      name: 'embedLink',
      title: 'YouTube Embed Link',
      type: 'text',
      rows: 4,
      description:
        'Paste straight from YouTube. The full embed code (<iframe ...>), the embed URL, the Share link, or the address bar URL all work.',
      validation: r =>
        r.required().custom(value => {
          if (typeof value !== 'string' || !value.trim()) {
            return 'Paste a YouTube embed code or link'
          }
          return extractId(value)
            ? true
            : 'Could not find a YouTube video ID in that. Paste the embed code from YouTube’s Share → Embed, or the video URL.'
        }),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A sentence or two. What is actually said in this one?',
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Matches the category filter on the Conversations page',
      options: {
        list: [
          { title: 'Culture', value: 'culture' },
          { title: 'Individual', value: 'individual' },
          { title: 'Leadership', value: 'leadership' },
          { title: 'Education', value: 'education' },
          { title: 'Art of Ideas', value: 'ideas' },
          { title: 'Family', value: 'family' },
          { title: 'Political Culture', value: 'political' },
        ],
      },
      initialValue: 'culture',
    }),

    defineField({
      name: 'recordedAt',
      title: 'Where it was recorded',
      type: 'string',
      description: 'The room, the campus, the event — e.g. "Kenyatta University, October 2025"',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'featured',
      title: 'Lead video',
      type: 'boolean',
      description: 'Show this one large, at the top of the section',
      initialValue: false,
    }),

    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],

  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: { title: 'title', subtitle: 'recordedAt', featured: 'featured' },
    prepare: ({ title, subtitle, featured }: { title?: string; subtitle?: string; featured?: boolean }) => ({
      title: featured ? `★ ${title || 'Untitled'}` : title || 'Untitled',
      subtitle: subtitle || 'No location noted',
    }),
  },
})
