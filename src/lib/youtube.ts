// Accepts anything YouTube hands you from the Share or Embed dialogs:
//   <iframe ... src="https://www.youtube.com/embed/VIDEO_ID?si=..." ...></iframe>
//   https://www.youtube.com/embed/VIDEO_ID
//   https://www.youtube.com/watch?v=VIDEO_ID
//   https://youtu.be/VIDEO_ID
//   https://www.youtube.com/shorts/VIDEO_ID
//   VIDEO_ID
//
// Note: sanity/schemas/videoConversation.ts keeps its own copy of this pattern.
// The Studio builds through its own bundler and cannot rely on the `@/` alias,
// so the two must be kept in step by hand.
const YOUTUBE_ID_PATTERN =
  /(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?(?:[^"'\s]*&)?v=|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/

const BARE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/

export function getYouTubeId(input?: string | null): string | null {
  if (!input) return null
  const trimmed = input.trim()
  const match = trimmed.match(YOUTUBE_ID_PATTERN)
  if (match) return match[1]
  if (BARE_ID_PATTERN.test(trimmed)) return trimmed
  return null
}

// We never render the pasted markup — we rebuild the player from the id.
export function youTubeEmbedUrl(id: string, autoplay = false): string {
  const params = ['rel=0', 'modestbranding=1']
  if (autoplay) params.push('autoplay=1')
  return `https://www.youtube-nocookie.com/embed/${id}?${params.join('&')}`
}

export function youTubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`
}

export function youTubeThumbnail(id: string, quality: 'max' | 'hq' = 'max'): string {
  const file = quality === 'max' ? 'maxresdefault' : 'hqdefault'
  return `https://i.ytimg.com/vi/${id}/${file}.jpg`
}
