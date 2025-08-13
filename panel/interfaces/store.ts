import type User from './users'
import type { FilterParams, FilterState } from '~/services/filters'

export interface UsersState {
  allUsers: User[]
  currentPage: number
  totalRecords: number
  totalPages: number
  loading: boolean
  itemsPerPage: number
  filters: FilterParams
  filterState: FilterState
}
