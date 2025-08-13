export interface FilterParams {
  nome?: string
  sobrenome?: string
  email?: string
  valor_carteira_min?: number
  valor_carteira_max?: number
  data_nascimento_inicio?: string
  data_nascimento_fim?: string
  data_abertura_inicio?: string
  data_abertura_fim?: string
}

export interface FilterState {
  activeFilters: FilterParams
  hasActiveFilters: boolean
}

class FilterService {
  private buildSearchParams(filters: FilterParams): URLSearchParams {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (key === 'valor_carteira_min') {
          params.append('valor_carteira_gte', value.toString())
        } else if (key === 'valor_carteira_max') {
          params.append('valor_carteira_lte', value.toString())
        } else if (key === 'data_nascimento_inicio') {
          params.append('data_nascimento_gte', value)
        } else if (key === 'data_nascimento_fim') {
          params.append('data_nascimento_lte', value)
        } else if (key === 'data_abertura_inicio') {
          params.append('data_abertura_gte', value)
        } else if (key === 'data_abertura_fim') {
          params.append('data_abertura_lte', value)
        } else {
          params.append(key, value.toString())
        }
      }
    })
    
    return params
  }

  public createFilterState(filters: FilterParams): FilterState {
    const hasActiveFilters = Object.values(filters).some(value => 
      value !== undefined && value !== null && value !== ''
    )
    
    return {
      activeFilters: filters,
      hasActiveFilters
    }
  }

  public getSearchParams(filters: FilterParams, page: number = 1, perPage: number = 30): URLSearchParams {
    const params = this.buildSearchParams(filters)
    params.append('_page', page.toString())
    params.append('_per_page', perPage.toString())
    return params
  }

  public clearFilters(): FilterParams {
    return {
      nome: undefined,
      sobrenome: undefined,
      email: undefined,
      valor_carteira_min: undefined,
      valor_carteira_max: undefined,
      data_nascimento_inicio: undefined,
      data_nascimento_fim: undefined,
      data_abertura_inicio: undefined,
      data_abertura_fim: undefined
    }
  }
}

export const filterService = new FilterService()
