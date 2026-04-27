import { useMemo, useState } from 'react'
import { Avatar } from './Avatar'

type Sort = 'newest' | 'oldest' | 'popular'

interface Comment {
  id: string
  author: string
  initials: string
  date: string // ISO
  body: string
  likes: number
  views: number
}

const SEED_COMMENTS: Comment[] = [
  {
    id: 'c1',
    author: 'Hera Syndulla',
    initials: 'HS',
    date: '2025-04-21',
    body: 'How to check your contributions. Click the chevron next to your name to expand your row — you will see the categories where you earned points (Education, Public Speaking, University Partnership) along with the specific activities and dates.',
    likes: 12,
    views: 1428,
  },
  {
    id: 'c2',
    author: 'Hera Syndulla',
    initials: 'HS',
    date: '2025-04-15',
    body: 'What counts in 2025? Anything in Education, Public Speaking, or University Partnership — internal training sessions, conference talks, mentoring of padawans, joint research with academies, and similar. If something is missing from your row, ping the moderation droid.',
    likes: 8,
    views: 977,
  },
  {
    id: 'c3',
    author: 'Sabine Wren',
    initials: 'SW',
    date: '2025-04-09',
    body: 'The list is in its final check, the moderators are reviewing the last batch of submissions. If anything seems off, drop a comment here and we will take a look before the quarter closes.',
    likes: 5,
    views: 612,
  },
]

const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

export function Comments() {
  const [sort, setSort] = useState<Sort>('newest')
  const [draft, setDraft] = useState('')
  const [comments, setComments] = useState<Comment[]>(SEED_COMMENTS)

  const ordered = useMemo(() => {
    const arr = [...comments]
    if (sort === 'newest') arr.sort((a, b) => (a.date < b.date ? 1 : -1))
    else if (sort === 'oldest') arr.sort((a, b) => (a.date > b.date ? 1 : -1))
    else arr.sort((a, b) => b.likes - a.likes)
    return arr
  }, [comments, sort])

  const submit = () => {
    const body = draft.trim()
    if (!body) return
    const today = new Date().toISOString().slice(0, 10)
    setComments((cs) => [
      {
        id: `c${cs.length + 1}-${Date.now()}`,
        author: 'You',
        initials: 'YO',
        date: today,
        body,
        likes: 0,
        views: 0,
      },
      ...cs,
    ])
    setDraft('')
  }

  return (
    <section className="mt-10">
      <div className="flex items-start gap-3">
        <Avatar initials="YO" size={36} />
        <div className="flex-1">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a comment..."
            rows={2}
            className="w-full bg-bg-cardSoft border border-bg-border rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none"
          />
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={submit}
              disabled={!draft.trim()}
              className="px-3 py-1.5 text-sm rounded-md bg-sky-600 text-white hover:bg-sky-500 disabled:bg-bg-cardSoft disabled:text-zinc-500 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6 border-b border-bg-border">
        {(['newest', 'oldest', 'popular'] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setSort(k)}
            className={`pb-2 text-sm capitalize border-b-2 -mb-px transition-colors ${
              sort === k
                ? 'border-sky-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <ul className="mt-4 space-y-5">
        {ordered.map((c) => (
          <li key={c.id} className="flex items-start gap-3">
            <Avatar initials={c.initials} size={36} />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-white">{c.author}</span>
                <span className="text-xs text-zinc-500">{fmtDate(c.date)}</span>
              </div>
              <p className="text-sm text-zinc-300 mt-1 leading-relaxed">{c.body}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                <button type="button" className="hover:text-zinc-300">
                  Reply
                </button>
                <span className="text-zinc-700">·</span>
                <span>
                  {c.likes} {c.likes === 1 ? 'person likes' : 'people like'} this
                </span>
                <span className="text-zinc-700">·</span>
                <span>{c.views.toLocaleString()} views</span>
                <span className="text-zinc-700">·</span>
                <button type="button" className="hover:text-zinc-300">
                  Save for later
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
