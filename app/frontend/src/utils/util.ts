import moment from 'moment'
import * as XLSX from 'xlsx'

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