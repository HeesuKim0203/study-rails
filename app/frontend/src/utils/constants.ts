
// url
export const HOME_URL = '/'
export const CREATE_URL = '/create'

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