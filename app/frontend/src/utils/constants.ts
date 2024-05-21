
import { IoDocumentTextOutline } from 'react-icons/io5'
import { IoCalculatorOutline } from 'react-icons/io5'
import { LuTruck } from 'react-icons/lu'
import { BsCart4 } from 'react-icons/bs'
import { MdOutlineReceiptLong } from 'react-icons/md'

// url
export const HOME_URL = '/'
export const CREATE_URL = '/create'
export const INVOICES_URL = '/invoices'
export const QUOTATIONS_URL = '/quotations'
export const DELIVERY_SLIPS_URL = '/delivery_slips'
export const PURCHASE_ORDERS_URL = '/purchase_orders'
export const RECEIPTS_URL = '/receipts'

// rows
export const ROWS_OPTION = [
    10, 20, 50, 100, 200
]
export const DEFAULT_ROWS = ROWS_OPTION[1]

// page
export const DEFAULT_PAGE = 1

export const LIST_TABLE_HEADER = [
    {
        value: 'タイトル',
        minWidth: 15,
        onClick: true,
        ordering: true,
        sortValue: 'title'
    },
    {
        value: 'ユーザー',
        minWidth: 10,
        onClick: true,
        ordering: true,
        sortValue: 'user'
    },
    {
        value: '金額',
        minWidth: 5,
        alignRight: true,
        onClick: true,
        ordering: true,
        sortValue: 'amount'
    },
    {
        value: 'ステータス',
        onClick: true,
        ordering: true,
        sortValue: 'status'
    },
    {
        value: '作成日',
        onClick: true,
        ordering: true,
        sortValue: 'date'
    },
    {
        value: '操作',
        onClick: false,
        ordering: false,
        sortValue: ''
    }
]

// Order

export const ORDER = {
    ASC: 'asc', 
    DESC: 'desc',
    INIT: 'init'
} as const

// Side Menu 

export const SIDE_MENU = [
    { icon : IoDocumentTextOutline, text: '請求書' },
    { icon : IoCalculatorOutline, text : '見積書'},
    { icon : LuTruck, text : '納品書'},
    { icon : BsCart4, text : '発注書'},
    { icon : MdOutlineReceiptLong, text : '領収書'},
]