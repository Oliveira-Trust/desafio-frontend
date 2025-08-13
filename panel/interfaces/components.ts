export interface TableHeader {
  key: string
  label: string
}

export interface TableData {
  [key: string]: any
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'link'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export interface TooltipProps {
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  variant?: 'light' | 'dark'
  delay?: number
}

export interface ModalProps {
  isOpen: boolean
  title: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface Currency {
  code: string
  name: string
}

export interface CurrencyConversion {
  from: string
  to: string
  amount: number
  convertedAmount: number
  rate: number
}

export interface WalletFormData {
  nome: string
  sobrenome: string
  email: string
  valor_compra: string
  moeda_origem: string
  moeda_destino: string
}
