'use client'

import { useEffect, useState } from 'react'

interface BlogCountProps {
  initialCount: number
}

export function BlogCount({ initialCount }: BlogCountProps) {
  const [count, setCount] = useState<number>(initialCount)

  useEffect(() => {
    // Fetch immediately on mount to get latest value
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/blog-count')
        if (res.ok) {
          const data = await res.json()
          if (typeof data.count === 'number') {
            setCount(data.count)
          }
        }
      } catch (err) {
        console.error('Error fetching blog count client-side:', err)
      }
    }

    fetchCount()

    // Poll every 30 seconds
    const interval = setInterval(fetchCount, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="font-display text-lg font-bold text-gold">
      {count}
    </span>
  )
}
