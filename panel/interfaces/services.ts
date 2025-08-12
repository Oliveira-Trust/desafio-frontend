export interface SearchUsersParams {
  nome?: string
  sobrenome?: string
  email?: string
}

export interface ApiRequestOptions {
  headers?: Record<string, string>
  method?: string
  body?: any
}
