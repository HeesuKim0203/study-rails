import { BILL_KEY, ICON_SIZE, METHOD_OF_DEPOSIT, METHOD_OF_TAX, ORDER } from './constants'

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
    [BILL_KEY.BUSINESS_PARTNER]: string
    [BILL_KEY.TAIL_STR]: string
    [BILL_KEY.ID]: string
    [BILL_KEY.BRANCH_NUMBER]: string
    [BILL_KEY.INVOICE_DATE]: Date
    [BILL_KEY.METHOD_OF_DEPOSIT]: MethodOfDepositType
    [BILL_KEY.DEPOSIT_DATE]: Date | undefined
    [BILL_KEY.TRANSFER_DATE]: Date | undefined
    [BILL_KEY.TITLE]: string
    [BILL_KEY.REPRESENTATIVE]: string
    [BILL_KEY.PARTICULARS]: ListFromType[]
    [BILL_KEY.REMARKS]: string
    [BILL_KEY.MEMO]: string
}

export type BillValueUnionType = PropertyValueUnion<Bill>