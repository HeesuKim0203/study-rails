import axios, { Axios, AxiosRequestConfig } from 'axios'
import { Bill } from './utils/type'

export const BASE_URL = import.meta.env.VITE_API_URL

const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')

export const api = axios.create({
    baseURL : BASE_URL,
    headers : { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
    }
})

export const getBillsCount = () => api.get('/bills/count')
export const getBillsPagenation = (query: AxiosRequestConfig) => api.get('/bills', query)
export const getBill = (id: string) => api.get(`/bills/${id}`)

export const createBill = (data: { bill: Bill }, query: AxiosRequestConfig) => api.post('/bills', data, query)
export const updateBill = (data: any, id: string, query: AxiosRequestConfig) => api.patch(`/bills/${id}`, data, query)

export const deleteBill = (id: string) => api.delete(`/bills/${id}`)

export const deleteStatement = (id: string) => api.delete(`/statements/${id}`)