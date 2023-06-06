export const columns = [
    {
        column: 'Nome',
        key: 'nome'
    },
    {
        column: 'Sobrenome',
        key: 'sobrenome'
    },
    {
        column: 'Email',
        key: 'email'
    },
    {
        column: 'Bitcoin',
        key: 'valor_carteira'
    },
]


export const addColumnsSize = (size: number) => {
    return size > 12 ? 12 : size
  }