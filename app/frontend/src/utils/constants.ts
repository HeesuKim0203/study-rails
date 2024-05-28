
import { IoDocumentTextOutline } from 'react-icons/io5'
import { IoCalculatorOutline } from 'react-icons/io5'
import { LuTruck } from 'react-icons/lu'
import { BsCart4 } from 'react-icons/bs'
import { MdOutlineReceiptLong } from 'react-icons/md'
import { Bill } from './type'

// url
export const HOME_URL = '/'
export const CREATE_URL = '/create'
export const INVOICES_URL = '/invoices'
export const QUOTATIONS_URL = '/quotations'
export const DELIVERY_SLIPS_URL = '/delivery_slips'
export const PURCHASE_ORDERS_URL = '/purchase_orders'
export const RECEIPTS_URL = '/receipts'

export const SHOW_INVOICES_URL = `${INVOICES_URL}/:id`

// List form

export const DEFAULT_DATA = { id : '', summary: '', count: 0, unit: '', price: 0, tax: '10%', withholding: false }
export const TAX_OPTION = [
    {name: '10%'},
    {name: '8%(軽減税率)'},
    {name: '8%'},
    {name: '0%'},
]

// Create

export const METHOD_OF_TAX = {
    FOREIGN: '外税',
    INTERNAL: '内税'
} as const

export const TAX_RESULT_OPTION = [
    {name: METHOD_OF_TAX.FOREIGN},
    {name: METHOD_OF_TAX.INTERNAL},
]

// Bill

export const METHOD_OF_DEPOSIT = {
    BANK_TRANSFER: '振込',
    TRANSFER: '振替'
} as const

export const today = new Date()

export const BILL_KEY = {
    BUSINESS_PARTNER: 'business_partner',
    TAIL_STR: 'tail_str',
    ID: 'id',
    BRANCH_NUMBER: 'branch_number',
    INVOICE_DATE: 'invoice_date',
    METHOD_OF_DEPOSIT: 'method_of_deposit',
    DEPOSIT_DATE: 'deposit_date',
    TITLE: 'title',
    REPRESENTATIVE: 'representative',
    PARTICULARS: 'statements_attributes',
    REMARKS: 'remarks',
    MEMO: 'memo',
    AMOUNT: 'amount',
    METHOD_OF_TAX: 'method_of_tax',
    MY_COMPANY_ID: 'my_company_id',
    UPDATE_AT: 'update_at'
} as const

export const DEFAULT_BILL = {
    [BILL_KEY.BUSINESS_PARTNER]: '',
    [BILL_KEY.TAIL_STR]: '御中', 
    [BILL_KEY.ID]: '',
    [BILL_KEY.BRANCH_NUMBER]: '',
    [BILL_KEY.INVOICE_DATE]: today,
    [BILL_KEY.METHOD_OF_DEPOSIT]: METHOD_OF_DEPOSIT.BANK_TRANSFER,
    [BILL_KEY.DEPOSIT_DATE]: undefined,
    [BILL_KEY.TITLE]: '',
    [BILL_KEY.REPRESENTATIVE]: '',
    [BILL_KEY.PARTICULARS]: [DEFAULT_DATA],
    [BILL_KEY.REMARKS]: '',
    [BILL_KEY.MEMO]: '',
    [BILL_KEY.METHOD_OF_TAX]: METHOD_OF_TAX.FOREIGN,
    [BILL_KEY.MY_COMPANY_ID]: '',
    [BILL_KEY.UPDATE_AT]: undefined
} as Bill

// rows
export const ROWS_OPTION = [
    10, 20, 50, 100, 200
]
export const DEFAULT_ROWS = ROWS_OPTION[1]

// page
export const DEFAULT_PAGE = 1

export const LIST_TABLE_HEADER = [
    {
        value: '件名',
        minWidth: 15,
        onClick: false,
        ordering: false,
        sortValue: '',
    },
    {
        value: '取引先名・基本情報',
        minWidth: 15,
        onClick: false,
        ordering: false,
        sortValue: '',
    },
    {
        value: '操作',
        minWidth: 10,
        onClick: false,
        ordering: false,
        sortValue: '',
    },
    {
        value: '請求書番号',
        minWidth: 20,
        onClick: false,
        ordering: false,
        sortValue: ''
    },
    {
        value: '金額',
        minWidth: 10,
        alignRight: true,
        onClick: true,
        ordering: true,
        sortValue: BILL_KEY.AMOUNT
    },
    {
        value: '社内メモ',
        minWidth: 15,
        onClick: false,
        ordering: false,
        sortValue: ''
    },
    {
        value: '備考',
        minWidth: 15,
        onClick: false,
        ordering: false,
        sortValue: ''
    },
    {
        value: '入金方法',
        minWidth: 10,
        onClick: false,
        ordering: false,
        sortValue: ''
    },
    {
        value: '請求日',
        minWidth: 10,
        onClick: true,
        ordering: true,
        sortValue: BILL_KEY.INVOICE_DATE
    },
    {
        value: '期日',
        minWidth: 10,
        onClick: true,
        ordering: true,
        sortValue: BILL_KEY.DEPOSIT_DATE
    },
    {
        value: '自社担当者',
        minWidth: 10,
        onClick: false,
        ordering: false,
        sortValue: ''
    },
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

// Home
export const SIDE_MENU_TITLE = 'フィルタ条件'
export const HAEDER_DROPDOWN_LABEL = '請求書作成用CSVインポート'

// Filter Options
export const FILTER_OPTIONS = LIST_TABLE_HEADER.map((header, index) => ({
    text: header.value
}))

// Pagination Options
export const DEFAULT_ROWS_OPTIONS = 10
export const ROWS_OPTIONS = [
    { value: String(DEFAULT_ROWS_OPTIONS) },
    { value: '20' },
    { value: '50' },
    { value: '100' },
    { value: '200' },
] 

// Icon 

export const ICON_SIZE = {
    SMALL: '1rem',
    NORMAL: '1.4rem',
    LARGE: '1.6rem'
} as const