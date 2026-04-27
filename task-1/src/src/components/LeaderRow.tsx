import { useState } from 'react'
import type { Entry } from '../types'
import { CATEGORIES, total } from '../types'
import { Avatar } from './Avatar'
import { ICONS, ChevronDown, StarIcon } from './Icons'

interface Props {
  entry: Entry
  rank: number
}

export function LeaderRow({ entry, rank }: Props) {
  const [open, setOpen] = useState(false)

  const activeBadges = CATEGORIES.filter((c) => entry.points[c.id] > 0)

  return (
    <div className="bg-bg-card border border-bg-border rounded-xl">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-bg-cardSoft transition-colors rounded-xl"
        aria-expanded={open}
      >
        <span className="w-10 text-zinc-500 font-medium tabular-nums text-right">{rank}</span>

        <Avatar initials={entry.initials} size={40} />

        <div className="min-w-0 flex-1">
          <div className="text-white font-semibold truncate">{entry.name}</div>
          <div className="text-xs text-zinc-400 truncate">
            {entry.role} <span className="text-zinc-500">({entry.deptCode})</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-5 text-zinc-300">
          {activeBadges.map((c) => {
            const Icon = ICONS[c.icon]
            return (
              <div key={c.id} className="flex flex-col items-center text-zinc-300">
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-0.5 text-zinc-400">{entry.points[c.id]}</span>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col items-center pl-2">
          <span className="text-[10px] tracking-widest text-zinc-500">TOTAL</span>
          <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
            <StarIcon className="w-4 h-4" />
            <span className="tabular-nums text-base">{total(entry)}</span>
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 pt-0 border-t border-bg-border/60">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            {CATEGORIES.map((c) => {
              const Icon = ICONS[c.icon]
              return (
                <div
                  key={c.id}
                  className="flex items-center gap-2 bg-bg-cardSoft border border-bg-border rounded-lg px-3 py-2"
                >
                  <Icon className="w-4 h-4 text-zinc-300" />
                  <div className="min-w-0">
                    <div className="text-[11px] text-zinc-400 truncate">{c.label}</div>
                    <div className="text-sm text-white font-semibold tabular-nums">
                      {entry.points[c.id]}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-3 text-xs text-zinc-500">
            {entry.year} · Q{entry.quarter}
          </div>
        </div>
      )}
    </div>
  )
}
