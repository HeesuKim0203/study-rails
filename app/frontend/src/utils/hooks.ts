import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useState } from 'react'
import { Bill, Order } from './type'
import { BILL_KEY, ORDER } from './constants'

interface ApiHookResult<T> {
    data: T | undefined
    error: string
    load: boolean
    getData: (loadState?: boolean) => Promise<void>
    setLoad: React.Dispatch<React.SetStateAction<boolean>>
}

export function useApiHook<T>(api: AxiosInstance, query: AxiosRequestConfig): ApiHookResult<T> {
    const [data, setData] = useState<T | undefined>(undefined)
    const [error, setError] = useState<string>('')
    const [load, setLoad] = useState<boolean>(false)

    const getData = async (loadState: boolean = true) => {

        if (!loadState) return setLoad(true)

        try {
            const { data: result } = await api(query)
            setData(result)
        } catch (err) {
            console.log(err)
            setError("Can't request data from server.")
        } finally {
            setLoad(true)
        }
    }

    return { data, error, load, getData, setLoad }
}

export const useData = (data: Bill[]) => {

    console.log(data)

    const [sortKey, setSortKey] = useState<keyof Bill>(BILL_KEY.UPDATE_AT)
    const [sortOrder, setSortOrder] = useState<Order>(ORDER.DESC)
    const [statuses, setStatuses] = useState<boolean[]>(
        Array(data.length).fill(false)
    )

    const nextOrder: { [key in Order]: Order } = {
        asc: ORDER.DESC,
        desc: ORDER.INIT,
        init: ORDER.ASC,
    }

    const sort = (newKey: keyof Bill) => {
        if (sortKey === newKey) {
            setSortOrder((prev) => nextOrder[prev])
        } else {
            setSortKey(newKey)
            setSortOrder(ORDER.ASC)
        }

        setStatuses(Array(data.length).fill(false))
    }

    const changeAllStatus = (newStatus: boolean) => {
        setStatuses(Array(data.length).fill(newStatus))
    }

    const changeRowStatus = (newStatus: boolean, rowIndex: number) => {
        const newStatuses = statuses.slice()
        newStatuses[rowIndex] = newStatus
        setStatuses(newStatuses)
    }

    const sortedData =
        sortOrder === ORDER.INIT
        ? data
        : data
            .slice()
            .sort(
                (a, b) =>
                (typeof a[sortKey] === 'number' && typeof b[sortKey] === 'number'
                    ? Number(a[sortKey]) - Number(b[sortKey])
                    : String(a[sortKey]).localeCompare(String(b[sortKey]))) *
                (sortOrder === ORDER.DESC ? -1 : 1)
            )

    const noResults: Bill[] = []

    return {
        sortKey,
        sortOrder,
        statuses,
        sort,
        sortedData,
        noResults,
        changeRowStatus,
        changeAllStatus,
    }
}