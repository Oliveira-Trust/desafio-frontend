import type User from './users'

export interface UsersState {
  allUsers: User[]
  currentPage: number
  totalRecords: number
  totalPages: number
  loading: boolean
  itemsPerPage: number
}
