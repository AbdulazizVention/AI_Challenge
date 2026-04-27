import { useMemo, useState } from 'react'
import { ENTRIES, YEARS, QUARTERS } from './data'
import type { CategoryId } from './types'
import { total } from './types'
import { Filters } from './components/Filters'
import { Podium } from './components/Podium'
import { LeaderRow } from './components/LeaderRow'
import { Comments } from './components/Comments'

export default function App() {
  const [year, setYear] = useState<number | 'all'>('all')
  const [quarter, setQuarter] = useState<number | 'all'>('all')
  const [category, setCategory] = useState<CategoryId | 'all'>('all')
  const [search, setSearch] = useState('')

  const ranked = useMemo(() => {
    const q = search.trim().toLowerCase()
    return ENTRIES.filter((e) => {
      if (year !== 'all' && e.year !== year) return false
      if (quarter !== 'all' && e.quarter !== quarter) return false
      if (category !== 'all' && e.points[category] <= 0) return false
      if (q && !`${e.name} ${e.role} ${e.deptCode}`.toLowerCase().includes(q)) return false
      return true
    })
      .map((e) => ({ entry: e, score: category === 'all' ? total(e) : e.points[category] }))
      .sort((a, b) => b.score - a.score)
  }, [year, quarter, category, search])

  const top3 = ranked.slice(0, 3).map((r) => r.entry)

  return (
    <div className="min-h-screen bg-bg-page text-zinc-100">
      <div className="max-w-5xl mx-auto px-5 py-6 sm:py-10">
        <nav className="text-xs text-zinc-400 mb-3">
          <a href="#" className="hover:text-zinc-200">
            Home
          </a>
          <span className="mx-2 text-zinc-600">/</span>
          <a href="#" className="hover:text-zinc-200">
            EDU
          </a>
          <span className="mx-2 text-zinc-600">/</span>
          <span className="text-zinc-300">Company Leader Board 2025</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
          Company Leader Board 2025
        </h1>

        <section className="bg-bg-card border border-bg-border rounded-2xl overflow-hidden">
          <header className="px-6 pt-6">
            <h2 className="text-2xl font-semibold text-white">Leaderboard</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Top performers based on contributions and activity
            </p>
            <div className="mt-4">
              <Filters
                year={year}
                quarter={quarter}
                category={category}
                search={search}
                onYear={setYear}
                onQuarter={setQuarter}
                onCategory={setCategory}
                onSearch={setSearch}
                years={YEARS}
                quarters={QUARTERS}
              />
            </div>
          </header>

          <Podium entries={top3} />

          <div className="px-4 sm:px-6 py-4 space-y-2">
            {ranked.length === 0 ? (
              <div className="text-center text-zinc-500 py-12">No matching contributors.</div>
            ) : (
              ranked.map((r, i) => <LeaderRow key={r.entry.id} entry={r.entry} rank={i + 1} />)
            )}
          </div>
        </section>

        <Comments />
      </div>
    </div>
  )
}
