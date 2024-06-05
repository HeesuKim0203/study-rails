import moment from 'moment'
import * as XLSX from 'xlsx'
import { Bill, FilterOptions, GetBillParams, ListFromType, MethodOfDepositType, MethodOfTaxType } from './type'
import { METHOD_OF_DEPOSIT, METHOD_OF_TAX, TAX_OPTION } from './constants'

export const getFileNameDate = () => {
    const date = new Date()
    const formattedDate = moment(date).format('YYYY-MM-DD')

    return formattedDate
}

const exportToJson = (sortedData: any) => {
    // Todo : Total Data request
    // const data = response()...
    const json = JSON.stringify(sortedData)
    
    const formattedDate = getFileNameDate()
    const fileName = `backup_${formattedDate}.json`
    const blob = new Blob([json], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const exportToExcel = (sortedData: any) => {
    // Todo : Total Data request
    // const data = response()...
    const ws = XLSX.utils.json_to_sheet(sortedData)

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    const formattedDate = getFileNameDate()
    XLSX.writeFile(wb, `backup_${formattedDate}.xlsx`)
}

export const extractNumber = (str: string): number => {
    const match = str.match(/\d+/)
    if (match) {
        return parseInt(match[0], 10)
    }
    throw new Error('No numbers found in the string')
}

export const formatNumberWithCommas = (number: number) => {

    if(!number) return 0

    return number.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 円'
}

export const getValueAmount = (v: ListFromType): number => v.price * v.count

export const getTax = (amount: number, tax: number, calTaxes: MethodOfTaxType): number => {
    let calcAmount = (amount !== 0 && calTaxes === METHOD_OF_TAX.INTERNAL) 
        ? amount - amount * (tax / 100) 
        : amount
    
    return calcAmount * (tax / 100)
}

export const getTaxAmount = (values: ListFromType[], calculatingTaxes: MethodOfTaxType) => (
    TAX_OPTION.reduce((prev, { name }) => {
        const tax = extractNumber(name)
        const amount = values.filter((value) => value.tax === name).reduce((prev, value) => {
            return prev + value.count * value.price 
        }, 0)
        return prev + getTax(amount, tax, calculatingTaxes) 
    }, 0)
)

export const getAmount = (values: ListFromType[]) => (
    values.reduce((prev, value) => {
        return prev + value.count * value.price
    }, 0)
)

export const isMethodOfDepositBankTransfer = (methodOfDeposit: MethodOfDepositType)
    : methodOfDeposit is typeof METHOD_OF_DEPOSIT.BANK_TRANSFER => (
    methodOfDeposit === METHOD_OF_DEPOSIT.BANK_TRANSFER
)

export const isMethodOfTaxForeign = (methodOfTax: MethodOfTaxType) 
    : methodOfTax is typeof METHOD_OF_TAX.FOREIGN => (
        methodOfTax === METHOD_OF_TAX.FOREIGN
)

export const styledComponentBoolToNumber = (bool : unknown): number => bool ? 1 : 0

export const paramsOptionsSetting = (filterOptions: FilterOptions[]) => {
    const paramsOptions: GetBillParams = filterOptions.reduce((prev: any, {key, value, additionalData}: FilterOptions) => {
        if(value) prev[key] = value + ' ' + additionalData
        return prev
    }, {})

    return paramsOptions
}