'use client'
// Install: npm install @portabletext/react
// If not available, this renders a graceful fallback

interface PortableTextRendererProps {
  value: unknown[]
}

// Simple block renderer — replace with @portabletext/react for production
export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value?.length) return null

  return (
    <div>
      {(value as Array<{ _type: string; _key: string; style?: string; children?: Array<{ text: string; marks?: string[] }>; asset?: { url: string }; alt?: string }>).map(block => {
        if (block._type === 'block') {
          const text = block.children?.map(c => c.text).join('') || ''
          const Tag = block.style === 'h2' ? 'h2'
            : block.style === 'h3' ? 'h3'
            : block.style === 'h4' ? 'h4'
            : block.style === 'blockquote' ? 'blockquote'
            : 'p'

          return <Tag key={block._key}>{text}</Tag>
        }
        if (block._type === 'image' && block.asset?.url) {
          return (
            <figure key={block._key} className="my-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={block.asset.url} alt={block.alt || ''} className="rounded-xl w-full" />
            </figure>
          )
        }
        return null
      })}
    </div>
  )
}
