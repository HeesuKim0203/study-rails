import axios, { AxiosRequestConfig } from 'axios'

export const BASE_URL = import.meta.env.VITE_API_URL

const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')

console.log(token)

export const api = axios.create({
    baseURL : BASE_URL,
    headers : { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
    }
})

export const getBillsCount = () => api.get('/bills/count')
export const getBillsPagenation = (query: AxiosRequestConfig) => api.get('/bills', query)

export const deleteStatement = (id: string) => api.delete(`/statements/${id}`)