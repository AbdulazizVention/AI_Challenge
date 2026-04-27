import type { Entry } from './types'

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
  'SCA.U1.T3',
  'GEO.U1.D1.G1',
  'MUS.U1.D2.G2',
  'FEL.U1.D3.G3',
  'COR.U1.D4.T1',
]

// Fictional Star Wars-flavoured names. None match real corporate employees.
const names: string[] = [
  'Luke Skywalker',
  'Leia Organa',
  'Han Solo',
  'Chewbacca Wookiee',
  'Obi-Wan Kenobi',
  'Yoda Grandmaster',
  'Mace Windu',
  'Ahsoka Tano',
  'Padme Amidala',
  'Anakin Skywalker',
  'Rex Clone',
  'Cody Commander',
  'Bail Organa',
  'Lando Calrissian',
  'Wedge Antilles',
  'Hera Syndulla',
  'Kanan Jarrus',
  'Sabine Wren',
  'Ezra Bridger',
  'Bo-Katan Kryze',
  'Din Djarin',
  'Cara Dune',
  'Greef Karga',
  'Cassian Andor',
  'Jyn Erso',
  'Bodhi Rook',
  'Rose Tico',
  'Poe Dameron',
  'Finn Trooper',
  'Rey Skywalker',
  'Kylo Ren',
  'Phasma Captain',
]

let seed = 42
const rand = () => {
  // Deterministic PRNG so the leaderboard is stable across reloads.
  seed = (seed * 9301 + 49297) % 233280
  return seed / 233280
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)]
const int = (lo: number, hi: number) => lo + Math.floor(rand() * (hi - lo + 1))

export const ENTRIES: Entry[] = names.map((name, i) => {
  const tier = i < 3 ? 'top' : i < 10 ? 'high' : i < 22 ? 'mid' : 'low'
  const base =
    tier === 'top' ? [120, 180] : tier === 'high' ? [60, 110] : tier === 'mid' ? [25, 70] : [0, 30]

  const points = {
    mentoring: int(base[0], base[1]),
    innovation: int(base[0], base[1]),
    culture: int(0, Math.floor(base[1] / 3)),
    sharing: int(0, Math.floor(base[1] / 3)),
  }

  return {
    id: `e${i + 1}`,
    name,
    role: pick(roles),
    deptCode: pick(deptCodes),
    initials: initials(name),
    year: pick([2023, 2024, 2025]),
    quarter: pick([1, 2, 3, 4]) as 1 | 2 | 3 | 4,
    points,
  }
})

export const YEARS = [2023, 2024, 2025] as const
export const QUARTERS = [1, 2, 3, 4] as const
