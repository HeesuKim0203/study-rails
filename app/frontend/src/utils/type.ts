import { ReactChild, ReactFragment, ReactPortal } from 'react'
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
    value?: string
}

export type IconSize = PropertyValueUnion<typeof ICON_SIZE>

export type ListFromType =  {
    id: string
    summary: string
    count: number
    unit: string
    price: number
    tax: string
    withholding: boolean
}

export type MyCompany = {
    id: string
    responsible_person: string
    company_name: string
    company_info: string
    bank_account: string
}

export type PropsForRailsData = {
    mycompany: MyCompany
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
    [BILL_KEY.TITLE]: string
    [BILL_KEY.REPRESENTATIVE]: string
    [BILL_KEY.PARTICULARS]: ListFromType[]
    [BILL_KEY.REMARKS]: string
    [BILL_KEY.MEMO]: string
    [BILL_KEY.AMOUNT]: number
    [BILL_KEY.METHOD_OF_TAX]: MethodOfTaxType
    [BILL_KEY.MY_COMPANY_ID]: string
    [BILL_KEY.UPDATE_AT]: Date | undefined
}

export type BillValueUnionType = PropertyValueUnion<Bill>

export type FilterDataType = {
    text: string
    filterOption: FilterOptions[]
    recordNum: number
}