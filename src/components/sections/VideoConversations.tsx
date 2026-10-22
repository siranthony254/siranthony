'use client'
import { useState } from 'react'
import { Play } from 'lucide-react'
import { getYouTubeId, youTubeEmbedUrl, youTubeThumbnail, youTubeWatchUrl } from '@/lib/youtube'
import type { VideoConversation } from '@/types'

type PlayableVideo = VideoConversation & { videoId: string }

// ── Thumbnail that falls back when maxresdefault is missing ──────
function Thumb({ videoId, title }: { videoId: string; title: string }) {
  const [src, setSrc] = useState(youTubeThumbnail(videoId, 'max'))
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={title}
      loading="lazy"
      onError={() => setSrc(youTubeThumbnail(videoId, 'hq'))}
      className="absolute inset-0 w-full h-full object-cover"
    />
  )
}

// ── One player: poster first, iframe only after a click ──────────
function Player({
  video,
  size,
}: {
  video: PlayableVideo
  size: 'lead' | 'small'
}) {
  const [playing, setPlaying] = useState(false)
  const isLead = size === 'lead'

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-navy" style={{ paddingBottom: '56.25%' }}>
      {playing ? (
        <iframe
          src={youTubeEmbedUrl(video.videoId, true)}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play: ${video.title}`}
          className="absolute inset-0 w-full h-full group cursor-pointer"
        >
          <Thumb videoId={video.videoId} title={video.title} />
          <span className="absolute inset-0 bg-navy/35 group-hover:bg-navy/15 transition-colors duration-300" />
          <span
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-navy/80 border border-gold/40 text-gold group-hover:bg-gold group-hover:text-navy transition-all duration-300 ${
              isLead ? 'w-20 h-20' : 'w-12 h-12'
            }`}
          >
            <Play size={isLead ? 26 : 16} className="ml-1" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  )
}

// ── Section ──────────────────────────────────────────────────────
export function VideoConversations({ videos }: { videos: VideoConversation[] }) {
  const playable: PlayableVideo[] = (videos || [])
    .map(v => {
      const videoId = getYouTubeId(v.embedLink)
      return videoId ? { ...v, videoId } : null
    })
    .filter((v): v is PlayableVideo => v !== null)

  if (playable.length === 0) return null

  const lead = playable.find(v => v.featured) || playable[0]
  const rest = playable.filter(v => v._id !== lead._id)

  return (
    <section className="bg-navy border-b border-gold/10 py-20 md:py-24">
      <div className="container-site">
        {/* Deliberately quieter than the page hero — this is a shelf, not an announcement */}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-cream">
            Watch me think out loud
          </h2>
          <p className="font-body text-sm text-cream/40">
            Easier to hear than to summarise.
          </p>
        </div>

        {/* Lead video */}
        <div className="mb-6">
          <Player video={lead} size="lead" />
          <div className="mt-5 max-w-2xl">
            <h3 className="font-display text-xl md:text-2xl font-semibold text-cream mb-2">
              {lead.title}
            </h3>
            {lead.description && (
              <p className="font-body text-cream/60 leading-relaxed mb-2">{lead.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-3 font-body text-xs text-cream/35">
              {lead.recordedAt && <span>{lead.recordedAt}</span>}
              {lead.recordedAt && <span className="text-gold/30">·</span>}
              <a
                href={youTubeWatchUrl(lead.videoId)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/60 hover:text-gold transition-colors"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>

        {/* The rest */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 mt-14 pt-10 border-t border-gold/10">
            {rest.map(video => (
              <div key={video._id}>
                <Player video={video} size="small" />
                <h3 className="font-display text-base font-semibold text-cream mt-3 leading-snug">
                  {video.title}
                </h3>
                {video.recordedAt && (
                  <p className="font-body text-xs text-cream/35 mt-1">{video.recordedAt}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
