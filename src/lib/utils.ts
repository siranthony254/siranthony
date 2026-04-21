import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-KE', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-KE', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

export const CATEGORY_LABELS: Record<string, string> = {
  culture:    'Culture',
  individual: 'Individual',
  leadership: 'Leadership',
  education:  'Education',
  ideas:      'Art of Ideas',
  family:     'Family',
  political:  'Political Culture',
}

export const CATEGORY_COLORS: Record<string, string> = {
  culture:    'bg-gold/10 text-gold border-gold/30',
  individual: 'bg-navy-100/10 text-navy-200 border-navy-200/30',
  leadership: 'bg-amber-900/10 text-amber-400 border-amber-400/30',
  education:  'bg-emerald-900/10 text-emerald-400 border-emerald-400/30',
  ideas:      'bg-violet-900/10 text-violet-400 border-violet-400/30',
  family:     'bg-rose-900/10 text-rose-400 border-rose-400/30',
  political:  'bg-sky-900/10 text-sky-400 border-sky-400/30',
}
