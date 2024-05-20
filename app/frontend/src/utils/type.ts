import { ORDER } from './constants'

type PropertyValueUnion<T extends object> = T[keyof T]

export type Order = PropertyValueUnion<typeof ORDER>

export type ListElm = {
    title: string
    user: string
    amount: number
    status: string
    date: string
}
