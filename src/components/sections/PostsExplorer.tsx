'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Search, X } from 'lucide-react'
import { CategoryBadge } from '@/components/ui'

// Image URLs and date labels are resolved on the server and passed down as
// plain strings, so the Sanity client never reaches the browser bundle.
export interface PostCardData {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  dateLabel: string
  readingTime?: number
  imageUrl?: string
  blurUrl?: string
  authorName?: string
  featured?: boolean
}

const PAGE_SIZE = 8

// ── Lead post: one wide card above the grid ──────────────────────
function LeadCard({ post }: { post: PostCardData }) {
  return (
    <Link href={`/conversations/${post.slug}`} className="group block mb-12">
      <article className="card-navy overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {post.imageUrl && (
          <div className="relative h-56 md:h-full md:min-h-[280px] overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={75}
              priority
              {...(post.blurUrl ? { placeholder: 'blur' as const, blurDataURL: post.blurUrl } : {})}
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent md:bg-gradient-to-r" />
          </div>
        )}
        <div className="p-7 md:p-9 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gold/20 text-gold border border-gold/30 uppercase tracking-wider">
              Start here
            </span>
            <CategoryBadge category={post.category} />
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-cream group-hover:text-gold transition-colors duration-300 mb-4 leading-tight">
            {post.title}
          </h3>
          <p className="font-body text-cream/55 leading-relaxed line-clamp-3 mb-6">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 font-body text-xs text-cream/35">
            <span>{post.dateLabel}</span>
            {post.readingTime ? (
              <>
                <span className="text-gold/30">·</span>
                <span>{post.readingTime} min read</span>
              </>
            ) : null}
            <span className="text-gold/30">·</span>
            <span className="inline-flex items-center gap-1.5 text-gold group-hover:gap-2.5 transition-all">
              Read <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

// ── Standard card ────────────────────────────────────────────────
function PostCard({ post }: { post: PostCardData }) {
  return (
    <Link href={`/conversations/${post.slug}`} className="group block h-full">
      <article className="card-navy overflow-hidden h-full flex flex-col">
        {post.imageUrl && (
          <div className="relative h-44 overflow-hidden flex-shrink-0">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={70}
              {...(post.blurUrl ? { placeholder: 'blur' as const, blurDataURL: post.blurUrl } : {})}
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
          </div>
        )}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <CategoryBadge category={post.category} />
            <span className="font-body text-xs text-cream/30">{post.dateLabel}</span>
          </div>
          <h3 className="font-display text-lg font-semibold text-cream group-hover:text-gold transition-colors duration-300 mb-3 leading-snug">
            {post.title}
          </h3>
          <p className="font-body text-sm text-cream/50 leading-relaxed line-clamp-2 mb-5 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gold/10">
            <span className="inline-flex items-center gap-2 text-gold text-xs font-body group-hover:gap-3 transition-all duration-200">
              Read <ArrowRight size={12} />
            </span>
            {post.readingTime ? (
              <span className="font-body text-xs text-cream/25">{post.readingTime} min</span>
            ) : null}
          </div>
        </div>
      </article>
    </Link>
  )
}

interface PostsExplorerProps {
  posts: PostCardData[]
  /** Given hero treatment when nobody is searching. Still searchable. */
  lead?: PostCardData
}

export function PostsExplorer({ posts, lead }: PostsExplorerProps) {
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const searching = query.trim().length > 0

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      // The lead post is shown above, so keep it out of the grid.
      return lead ? posts.filter(p => p.id !== lead.id) : posts
    }
    return posts.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [posts, lead, query])

  const shown = results.slice(0, visible)
  const hasMore = results.length > visible

  return (
    <div>
      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30 pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={e => {
              setQuery(e.target.value)
              setVisible(PAGE_SIZE)
            }}
            placeholder="Search these conversations…"
            aria-label="Search conversations"
            className="w-full bg-navy/60 border border-gold/15 rounded-full pl-11 pr-11 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/30 hover:text-gold transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {searching && (
          <p className="font-body text-xs text-cream/35 mt-3" aria-live="polite">
            {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {/* Lead post, only when not searching */}
      {!searching && lead && <LeadCard post={lead} />}

      {/* Grid */}
      {results.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gold/15 rounded-2xl">
          <p className="font-display text-xl text-cream/40 italic mb-2">Nothing here yet.</p>
          <p className="font-body text-sm text-cream/30">
            {searching ? 'Try a different word.' : 'Check back soon.'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {shown.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 text-center">
              <button type="button" onClick={() => setVisible(v => v + PAGE_SIZE)} className="btn-ghost">
                Load more ({results.length - visible} left)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
