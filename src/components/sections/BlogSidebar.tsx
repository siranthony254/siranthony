import Link from 'next/link'
import { Rss, ArrowRight } from 'lucide-react'
import { ShareBlogLinks } from '@/components/ui/ShareBlogLinks'

export interface SidebarSection {
  key: string
  label: string
  count: number
}

export interface SidebarRecentPost {
  id: string
  title: string
  slug: string
  dateLabel: string
}

interface BlogSidebarProps {
  sections: SidebarSection[]
  recent: SidebarRecentPost[]
  active: string
  total: number
  shareUrl: string
}

function Widget({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-navy p-6">
      <h2 className="font-body text-xs text-gold uppercase tracking-widest mb-1">{title}</h2>
      <div className="w-6 h-px bg-gold/40 mb-5" />
      {children}
    </div>
  )
}

export function BlogSidebar({ sections, recent, active, total, shareUrl }: BlogSidebarProps) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      {/* Sections — the topic index */}
      <Widget title="Sections">
        <ul className="space-y-1">
          <li>
            <Link
              href="/conversations"
              aria-current={active === 'all' ? 'true' : undefined}
              className={`flex items-baseline justify-between gap-3 py-2 px-3 -mx-1 rounded-lg font-body text-sm transition-colors ${
                active === 'all'
                  ? 'bg-gold/10 text-gold'
                  : 'text-cream/60 hover:text-gold hover:bg-gold/5'
              }`}
            >
              <span>All conversations</span>
              <span className="text-xs text-cream/30 tabular-nums">{total}</span>
            </Link>
          </li>
          {sections.map(section => (
            <li key={section.key}>
              <Link
                href={`/conversations?category=${section.key}`}
                aria-current={active === section.key ? 'true' : undefined}
                className={`flex items-baseline justify-between gap-3 py-2 px-3 -mx-1 rounded-lg font-body text-sm transition-colors ${
                  active === section.key
                    ? 'bg-gold/10 text-gold'
                    : 'text-cream/60 hover:text-gold hover:bg-gold/5'
                }`}
              >
                <span>{section.label}</span>
                <span className="text-xs text-cream/30 tabular-nums">{section.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Widget>

      {/* Recent */}
      {recent.length > 0 && (
        <Widget title="Latest">
          <ul className="space-y-4">
            {recent.map(post => (
              <li key={post.id}>
                <Link href={`/conversations/${post.slug}`} className="group block">
                  <p className="font-display text-sm font-semibold text-cream/85 group-hover:text-gold transition-colors leading-snug">
                    {post.title}
                  </p>
                  <p className="font-body text-xs text-cream/30 mt-1">{post.dateLabel}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Widget>
      )}

      {/* Share + subscribe */}
      <Widget title="Follow along">
        <ShareBlogLinks url={shareUrl} />
        <a
          href="/conversations/rss.xml"
          className="inline-flex items-center gap-2 mt-5 font-body text-xs text-cream/50 hover:text-gold transition-colors"
        >
          <Rss size={13} /> RSS feed
        </a>
      </Widget>

      {/* A way through to the person */}
      <Widget title="Talk to me">
        <p className="font-body text-sm text-cream/55 leading-relaxed mb-4">
          If something here lands, or you think I have it wrong, I would rather hear it
          than not.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 font-body text-xs text-gold hover:gap-3 transition-all uppercase tracking-wider"
        >
          Get in touch <ArrowRight size={12} />
        </Link>
      </Widget>
    </aside>
  )
}
