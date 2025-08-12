export interface TableHeader {
  key: string
  label: string
}

export interface TableData {
  [key: string]: any
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export interface TooltipProps {
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  variant?: 'light' | 'dark'
  delay?: number
}
