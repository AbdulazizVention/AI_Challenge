import type { Entry } from '../types'
import { total } from '../types'
import { Avatar } from './Avatar'
import { StarIcon } from './Icons'

interface Props {
  entries: Entry[]
}

const STYLES = {
  1: {
    badge: 'bg-amber-500',
    chip: 'bg-amber-500/15 text-amber-400',
    pedestal: 'from-amber-700/60 to-amber-900/60',
    numeral: 'text-amber-200/30',
  },
  2: {
    badge: 'bg-zinc-400',
    chip: 'bg-zinc-400/15 text-zinc-300',
    pedestal: 'from-zinc-500/40 to-zinc-700/40',
    numeral: 'text-zinc-300/30',
  },
  3: {
    badge: 'bg-amber-700',
    chip: 'bg-amber-700/20 text-amber-500',
    pedestal: 'from-amber-800/50 to-amber-950/60',
    numeral: 'text-amber-700/30',
  },
} as const

function PodiumEntry({ entry, rank }: { entry: Entry; rank: 1 | 2 | 3 }) {
  const isFirst = rank === 1
  const size = isFirst ? 96 : 76
  const s = STYLES[rank]

  return (
    <div className={`flex flex-col items-center ${isFirst ? '-translate-y-3' : ''}`}>
      <div className="relative">
        <Avatar initials={entry.initials} size={size} />
        <span
          className={`absolute -bottom-1 -right-1 ${s.badge} text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center ring-2 ring-bg-page`}
        >
          {rank}
        </span>
      </div>
      <div className="mt-3 text-center px-1">
        <div className="font-semibold text-white text-sm">{entry.name}</div>
        <div className="text-xs text-zinc-400 mt-0.5">
          {entry.role} <span className="text-zinc-500">({entry.deptCode})</span>
        </div>
      </div>
      <div className={`mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-sm font-semibold ${s.chip}`}>
        <StarIcon className="w-3.5 h-3.5" />
        {total(entry)}
      </div>
    </div>
  )
}

function Pedestal({ rank, height }: { rank: 1 | 2 | 3; height: number }) {
  const s = STYLES[rank]
  return (
    <div
      className={`flex items-end justify-center rounded-t-xl bg-gradient-to-b ${s.pedestal} border border-bg-border border-b-0`}
      style={{ height }}
    >
      <span className={`mb-2 text-5xl font-extrabold ${s.numeral}`}>{rank}</span>
    </div>
  )
}

export function Podium({ entries }: Props) {
  const [first, second, third] = entries
  if (!first) return null
  return (
    <div className="px-6 pt-6">
      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto items-end">
        <div className="flex justify-center">{second && <PodiumEntry entry={second} rank={2} />}</div>
        <div className="flex justify-center">{first && <PodiumEntry entry={first} rank={1} />}</div>
        <div className="flex justify-center">{third && <PodiumEntry entry={third} rank={3} />}</div>
      </div>
      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-3">
        <Pedestal rank={2} height={120} />
        <Pedestal rank={1} height={150} />
        <Pedestal rank={3} height={100} />
      </div>
    </div>
  )
}
