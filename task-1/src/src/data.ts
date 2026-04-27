import type { Activity, CategoryId, Entry } from './types'

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')

const roles = [
  'Senior Jedi Engineer',
  'Clone Squad Lead',
  'Rebel QA Engineer',
  'Holocron Archivist',
  'Hyperdrive Mechanic',
  'Cantina Manager',
  'Astromech Technician',
  'Mandalorian Ops',
  'Bounty Analyst',
  'Senate Liaison',
  'Pilot Trainer',
  'Tactics Strategist',
  'Padawan Mentor',
  'Diplomatic Officer',
  'Logistics Lead',
]

const deptCodes = [
  'TAT.U1.D1',
  'COR.U1.D2',
  'NAB.U1.D3',
  'KAS.U1.D4',
  'HOT.U1.G1',
  'END.U1.G2',
  'DAG.U1.G3',
  'YAV.U1.G4',
  'BES.U1.T1',
  'JAK.U1.T2',
  'GEO.U1.D1.G1',
  'MUS.U1.D2.G2',
  'COR.U1.D4.T1',
]

const names: string[] = [
  'Luke Skywalker',
  'Leia Organa',
  'Han Solo',
  'Obi-Wan Kenobi',
  'Yoda Grandmaster',
  'Mace Windu',
  'Ahsoka Tano',
  'Padme Amidala',
  'Anakin Skywalker',
  'Rex Clone',
  'Cody Commander',
  'Lando Calrissian',
  'Wedge Antilles',
  'Hera Syndulla',
  'Sabine Wren',
  'Bo-Katan Kryze',
  'Din Djarin',
  'Cassian Andor',
  'Poe Dameron',
  'Rey Skywalker',
]

const educationActivities = [
  'Internal training: hyperdrive theory',
  'Mentored 3 padawans this quarter',
  'Onboarding workshop for new clones',
  'Code review masterclass',
  'Internship review session',
]
const speakingActivities = [
  'Talk at GalaxyConf 2025',
  'Tech talk: tactics under jamming',
  'Panel: ethics of cloning',
  'Lightning talk at squadron sync',
  'Keynote at Outer Rim Summit',
]
const partnershipActivities = [
  'Coruscant Academy guest lecture',
  'Joint research with Naboo University',
  'Career fair at Yavin Tech',
  'Curriculum advisory board (Endor U)',
  'University recruiting drive',
]

let seed = 42
const rand = () => {
  // Deterministic PRNG so the leaderboard is stable across reloads.
  seed = (seed * 9301 + 49297) % 233280
  return seed / 233280
}
const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)]
const int = (lo: number, hi: number) => lo + Math.floor(rand() * (hi - lo + 1))

const dateIn = (year: number, quarter: 1 | 2 | 3 | 4) => {
  const startMonth = (quarter - 1) * 3 + 1
  const month = startMonth + Math.floor(rand() * 3)
  const day = 1 + Math.floor(rand() * 27)
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

const buildActivities = (
  year: number,
  quarter: 1 | 2 | 3 | 4,
  points: Record<CategoryId, number>,
): Activity[] => {
  const out: Activity[] = []
  const pools: Record<CategoryId, string[]> = {
    education: educationActivities,
    speaking: speakingActivities,
    partnership: partnershipActivities,
  }
  ;(['education', 'speaking', 'partnership'] as CategoryId[]).forEach((cat) => {
    let remaining = points[cat]
    while (remaining > 0) {
      const chunk = Math.min(remaining, int(20, 60))
      out.push({
        date: dateIn(year, quarter),
        title: pick(pools[cat]),
        category: cat,
        points: chunk,
      })
      remaining -= chunk
    }
  })
  return out.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export const ENTRIES: Entry[] = names.map((name, i) => {
  const tier = i < 3 ? 'top' : i < 8 ? 'high' : i < 14 ? 'mid' : 'low'
  const base =
    tier === 'top' ? [120, 200] : tier === 'high' ? [60, 110] : tier === 'mid' ? [25, 70] : [0, 30]

  const points: Record<CategoryId, number> = {
    education: int(base[0], base[1]),
    speaking: int(Math.floor(base[0] / 2), base[1]),
    partnership: int(0, Math.floor(base[1] / 2)),
  }

  const year = 2025
  const quarter = pick([1, 2, 3, 4]) as 1 | 2 | 3 | 4

  return {
    id: `e${i + 1}`,
    name,
    role: pick(roles),
    deptCode: pick(deptCodes),
    initials: initials(name),
    year,
    quarter,
    points,
    activities: buildActivities(year, quarter, points),
  }
})

export const YEARS = [2025] as const
export const QUARTERS = [1, 2, 3, 4] as const
