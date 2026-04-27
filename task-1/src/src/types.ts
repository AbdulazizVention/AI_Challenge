export type CategoryId = 'education' | 'speaking' | 'partnership'

export interface Category {
  id: CategoryId
  label: string
  icon: 'cap' | 'monitor' | 'handshake'
}

export interface Activity {
  date: string // ISO yyyy-mm-dd
  title: string
  category: CategoryId
  points: number
}

export interface Entry {
  id: string
  name: string
  role: string
  deptCode: string
  initials: string
  year: number
  quarter: 1 | 2 | 3 | 4
  points: Record<CategoryId, number>
  activities: Activity[]
}

export const CATEGORIES: Category[] = [
  { id: 'education', label: 'Education', icon: 'cap' },
  { id: 'speaking', label: 'Public Speaking', icon: 'monitor' },
  { id: 'partnership', label: 'University Partnership', icon: 'handshake' },
]

export const total = (e: Entry): number =>
  e.points.education + e.points.speaking + e.points.partnership
