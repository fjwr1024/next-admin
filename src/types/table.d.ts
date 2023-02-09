export type Order = 'asc' | 'desc'

export interface HeadCell {
  disablePadding: boolean
  id: keyof Users
  label: string
  numeric: boolean
}
