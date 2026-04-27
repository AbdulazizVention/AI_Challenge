import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>

export const CapIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M2 9l10-5 10 5-10 5L2 9z" />
    <path d="M6 11v4c0 1.5 3 3 6 3s6-1.5 6-3v-4" />
    <path d="M22 9v4" />
  </svg>
)

export const MonitorIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <line x1="8" y1="20" x2="16" y2="20" />
    <line x1="12" y1="16" x2="12" y2="20" />
  </svg>
)

export const HandshakeIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M2 13l3-3 4 4-1.5 1.5a1.8 1.8 0 0 1-2.5 0L2 13z" />
    <path d="M22 13l-3-3-4 4 1.5 1.5a1.8 1.8 0 0 0 2.5 0L22 13z" />
    <path d="M9 14l2-2 2 2 2-2 2 2" />
    <path d="M5 10l4-4 3 2 3-2 4 4" />
  </svg>
)

export const StarIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.6l-5.9 3.08 1.13-6.58L2.45 9.44l6.6-.96L12 2.5z" />
  </svg>
)

export const ChevronDown = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export const SearchIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.5" y2="16.5" />
  </svg>
)

export const ICONS = { cap: CapIcon, monitor: MonitorIcon, handshake: HandshakeIcon } as const
