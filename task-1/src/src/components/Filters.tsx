import type { CategoryId } from '../types'
import { CATEGORIES } from '../types'
import { SearchIcon } from './Icons'

interface Props {
  year: number | 'all'
  quarter: number | 'all'
  category: CategoryId | 'all'
  search: string
  onYear: (v: number | 'all') => void
  onQuarter: (v: number | 'all') => void
  onCategory: (v: CategoryId | 'all') => void
  onSearch: (v: string) => void
  years: readonly number[]
  quarters: readonly number[]
}

const baseSelect =
  'appearance-none bg-bg-cardSoft border border-bg-border text-zinc-200 rounded-lg pl-3 pr-8 py-2 text-sm hover:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer'

export function Filters({
  year,
  quarter,
  category,
  search,
  onYear,
  onQuarter,
  onCategory,
  onSearch,
  years,
  quarters,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <select
          className={baseSelect}
          value={year}
          onChange={(e) => onYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          aria-label="Year"
        >
          <option value="all">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <Caret />
      </div>

      <div className="relative">
        <select
          className={baseSelect}
          value={quarter}
          onChange={(e) => onQuarter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          aria-label="Quarter"
        >
          <option value="all">All Quarters</option>
          {quarters.map((q) => (
            <option key={q} value={q}>
              Q{q}
            </option>
          ))}
        </select>
        <Caret />
      </div>

      <div className="relative">
        <select
          className={baseSelect}
          value={category}
          onChange={(e) => onCategory(e.target.value as CategoryId | 'all')}
          aria-label="Category"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <Caret />
      </div>

      <div className="relative flex-1 min-w-[200px]">
        <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search employee..."
          className="w-full bg-bg-cardSoft border border-bg-border rounded-lg pl-9 pr-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>
    </div>
  )
}

const Caret = () => (
  <svg
    className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)
