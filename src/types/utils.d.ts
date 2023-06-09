
import { IconProp } from "@fortawesome/fontawesome-svg-core"

export interface ITableColumn {
    column: string,
    key: string
}

export interface ITableAction<T> {
    icon: IconProp,
    tooltip: string,
    callback: (data: T) => void
}

export type GenericObject = {
    [key: string]: string | number
}

export interface IModalState {
    isOpen: boolean
    title?: string,
    content?: JSX.Element
    callback?: (data: T) => void
}

export interface IOptionInput {
    label: string,
    value: string
}
