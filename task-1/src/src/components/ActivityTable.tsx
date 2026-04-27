import type { Activity } from '../types'
import { CATEGORIES } from '../types'

const labelFor = (id: Activity['category']) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id

const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

export function ActivityTable({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) {
    return <div className="text-sm text-zinc-500 py-2">No recent activity.</div>
  }
  return (
    <div>
      <div className="text-[11px] tracking-widest text-zinc-500 mb-2">RECENT ACTIVITY</div>
      <div className="overflow-x-auto rounded-lg border border-bg-border">
        <table className="w-full text-sm">
          <thead className="bg-bg-cardSoft text-zinc-400">
            <tr>
              <th className="text-left font-medium px-3 py-2">Activity</th>
              <th className="text-left font-medium px-3 py-2">Category</th>
              <th className="text-left font-medium px-3 py-2 whitespace-nowrap">Date</th>
              <th className="text-right font-medium px-3 py-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a, i) => (
              <tr key={i} className="border-t border-bg-border">
                <td className="px-3 py-2 text-zinc-200">{a.title}</td>
                <td className="px-3 py-2 text-zinc-400">{labelFor(a.category)}</td>
                <td className="px-3 py-2 text-zinc-400 whitespace-nowrap tabular-nums">
                  {fmtDate(a.date)}
                </td>
                <td className="px-3 py-2 text-right text-sky-400 font-semibold tabular-nums">
                  +{a.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
