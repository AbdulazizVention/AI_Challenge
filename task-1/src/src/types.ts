export type CategoryId = 'mentoring' | 'innovation' | 'culture' | 'sharing'

export interface Category {
  id: CategoryId
  label: string
  icon: 'cap' | 'cart' | 'smile' | 'eye'
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
}

export const CATEGORIES: Category[] = [
  { id: 'mentoring', label: 'Mentoring', icon: 'cap' },
  { id: 'innovation', label: 'Innovation', icon: 'cart' },
  { id: 'culture', label: 'Culture', icon: 'smile' },
  { id: 'sharing', label: 'Knowledge Sharing', icon: 'eye' },
]

export const total = (e: Entry): number =>
  e.points.mentoring + e.points.innovation + e.points.culture + e.points.sharing
