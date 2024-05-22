import { ICON_SIZE, ORDER } from './constants'

type PropertyValueUnion<T extends object> = T[keyof T]

export type Order = PropertyValueUnion<typeof ORDER>

export type ListElm = {
    title: string
    user: string
    amount: number
    status: string
    date: string
}

export type FilterOptions = {
    text: string
}

export type IconSize = PropertyValueUnion<typeof ICON_SIZE>

