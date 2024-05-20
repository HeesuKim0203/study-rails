import moment from 'moment'

export const getFileNameDate = () => {
    const date = new Date()
    const formattedDate = moment(date).format('YYYY-MM-DD')

    return formattedDate
}