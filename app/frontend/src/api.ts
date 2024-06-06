import axios, { AxiosRequestConfig } from 'axios'
import { Bill, MyCompany } from './utils/type'

export const BASE_URL = import.meta.env.VITE_API_URL

const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')

export const api = axios.create({
    baseURL : BASE_URL,
    headers : { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
    }
})

export const getBillsCount = (query: AxiosRequestConfig) => api.get('/bills/count', query)
export const getBillsPagenation = (query: AxiosRequestConfig) => api.get('/bills', query)
export const getBill = (id: string) => api.get(`/bills/${id}`)

export const createBill = (data: { bill: Bill }, query: AxiosRequestConfig) => api.post('/bills', data, query)
export const updateBill = (data: { bill: Bill }, id: string, query: AxiosRequestConfig) => api.patch(`/bills/${id}`, data, query)

export const deleteBill = (id: string) => api.delete(`/bills/${id}`)

export const deleteStatement = (id: string) => api.delete(`/statements/${id}`)

export const updateMyCompany = (data: { my_company: MyCompany }, id:string, query: AxiosRequestConfig) => 
        api.patch(`/my_companies/${id}`, data, query)
