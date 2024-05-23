import moment from 'moment'
import * as XLSX from 'xlsx'
import { ListFromType, MethodOfTaxType } from './type'
import { METHOD_OF_TAX } from './constants'

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
    return number.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 円'
}

export const getValueAmount = (v: ListFromType): number => v.price * v.count

export const getTax = (amount: number, tax: number, calTaxes: MethodOfTaxType): number => {
    let calcAmount = (amount !== 0 && calTaxes === METHOD_OF_TAX.INTERNAL) 
        ? amount - amount * (tax / 100) 
        : amount
    
    return calcAmount * (tax / 100)
}