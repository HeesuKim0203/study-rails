import { ICON_SIZE, METHOD_OF_DEPOSIT, METHOD_OF_TAX, ORDER } from './constants'

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

export type ListFromType =  {
    summary: string
    count: number
    unit: string
    price: number
    tax: string
    withholding: boolean
}

export type MethodOfTaxType = PropertyValueUnion<typeof METHOD_OF_TAX>

export type MethodOfDepositType = PropertyValueUnion<typeof METHOD_OF_DEPOSIT>

export type Bill = {
    businessPartner: string
    tailStr: string
    id: string
    branchNumber: string
    invoiceDate: Date
    methodOfDeposit: MethodOfDepositType
    depositDate: Date
    title: string
    representative: string
    particulars: ListFromType[]
    remarks: string
    memo: string
}

export type BillValueUnionType = PropertyValueUnion<Bill>