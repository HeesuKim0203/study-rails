
import React, { useState } from 'react'
import { MdAdd, MdSearch } from 'react-icons/md'
import {
    ContentsBase,
    MarginBase,
    Button,
    Paragraph,
    WithSideContent,
    ListTable,
    HeadlineArea,
    DropdownButton,
    Pagination,
    Pager,
    Digits,
    SectionTitle,
    VisuallyHidden,
    SearchField,
    TableHeader,
  } from '@freee_jp/vibes'
// import AddData from '.././AddData'
import { DEFAULT_PAGE, DEFAULT_ROWS, LIST_TABLE_HEADER, ORDER, ROWS_OPTION } from '../../utils/constants'
import { ListElm, Order } from '../../utils/type'
import * as XLSX from 'xlsx'
import { getFileNameDate } from '../../utils/util'
import { Container, Wrapper, Header, Title } from './HomeStyle'

// Todo : Data -> BackEnd
const useData = () => {
    const data: ListElm[] = [
        {
            title: '打ち合わせ費用',
            user: 'フリー太郎',
            amount: 100000,
            status: '申請中',
            date: '2020-10-01',
        },
        {
            title: '書籍購入費',
            user: 'user.email@example.com',
            amount: 123000,
            status: '申請中',
            date: '2020-09-23',
        },
        {
            title: '交通費',
            user: '佐々木大輔',
            amount: 2000,
            status: '精算済',
            date: '2020-10-11',
        },
        {
            title: 'UFO撮影ロケ',
            user: '五反田花子',
            amount: 3000000,
            status: '却下',
            date: '2020-09-12',
        },
        {
            title: 'ツチノコ捜索費',
            user: '三田次郎',
            amount: 1000000,
            status: '申請中',
            date: '2020-11-01',
        },
        {
            title: 'オフィス備品',
            user: 'フリー太郎',
            amount: 48000,
            status: '精算済',
            date: '2020-09-12',
        },
        {
            title: '書籍購入費',
            user: 'user.email@example.com',
            amount: 2800,
            status: '申請中',
            date: '2020-10-12',
        },
        {
            title: 'ネコのエサ代',
            user: '三田次郎',
            amount: 3000,
            status: '申請中',
            date: '2020-10-27',
        },
        {
            title: '駐車場代',
            user: 'フリー太郎',
            amount: 4000,
            status: '申請中',
            date: '2020-10-05',
        },
        {
            title: 'PC用品',
            user: '五反田花子',
            amount: 800000,
            status: '申請中',
            date: '2020-10-21',
        },
        {
            title: '打ち合わせ費用',
            user: 'フリー太郎',
            amount: 100000,
            status: '申請中',
            date: '2020-10-01',
        },
        {
            title: '書籍購入費',
            user: 'user.email@example.com',
            amount: 123000,
            status: '申請中',
            date: '2020-09-23',
        },
        {
            title: '交通費',
            user: '佐々木大輔',
            amount: 2000,
            status: '精算済',
            date: '2020-10-11',
        },
        {
            title: 'UFO撮影ロケ',
            user: '五反田花子',
            amount: 3000000,
            status: '却下',
            date: '2020-09-12',
        },
        {
            title: 'ツチノコ捜索費',
            user: '三田次郎',
            amount: 1000000,
            status: '申請中',
            date: '2020-11-01',
        },
        {
            title: 'オフィス備品',
            user: 'フリー太郎',
            amount: 48000,
            status: '精算済',
            date: '2020-09-12',
        },
        {
            title: '書籍購入費',
            user: 'user.email@example.com',
            amount: 2800,
            status: '申請中',
            date: '2020-10-12',
        },
        {
            title: 'ネコのエサ代',
            user: '三田次郎',
            amount: 3000,
            status: '申請中',
            date: '2020-10-27',
        },
        {
            title: '駐車場代',
            user: 'フリー太郎',
            amount: 4000,
            status: '申請中',
            date: '2020-10-05',
        },
        {
            title: 'PC用品',
            user: '五反田花子',
            amount: 800000,
            status: '申請中',
            date: '2020-10-21',
        },
    ]

    const [sortKey, setSortKey] = useState<keyof ListElm>('date')
    const [sortOrder, setSortOrder] = useState<Order>(ORDER.DESC)
    const [statuses, setStatuses] = useState<boolean[]>(
        Array(data.length).fill(false)
    )

    const nextOrder: { [key in Order]: Order } = {
        asc: ORDER.DESC,
        desc: ORDER.INIT,
        init: ORDER.ASC,
    }

    const sort = (newKey: keyof ListElm) => {
        if (sortKey === newKey) {
            setSortOrder((prev) => nextOrder[prev])
        } else {
            setSortKey(newKey)
            setSortOrder(ORDER.ASC)
        }
        // ソートしたときはチェックボックスの状態をリセット
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
                (sortOrder === 'desc' ? -1 : 1)
            )

    const noResults: ListElm[] = []

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

const Home = () => {
    const {
      sort,
      sortKey,
      sortOrder,
      statuses,
      sortedData,
      changeAllStatus,
      changeRowStatus,
    } = useData()

    const [addDataDisplay, setAddDataDisplay] = useState(false) 
    const [rowOption, setRowOption] = useState(DEFAULT_ROWS)
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
    const [search, setSearch] = useState('')

    // Todo : Server Data Record count
    const [pageCount, setPageCount] = useState(10)

    const exportToJson = () => {
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

    const exportToExcel = () => {
        // Todo : Total Data request
        // const data = response()...
        const ws = XLSX.utils.json_to_sheet(sortedData)

        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

        const formattedDate = getFileNameDate()
        XLSX.writeFile(wb, `backup_${formattedDate}.xlsx`)
    }

    return (
        <Container>
            <Wrapper>
                <Header>
                    <Title>Study Rails</Title>
                    <Button appearance='primary'>新規作成</Button>
                </Header>

                <MarginBase mb={2}>
                    <SearchField
                        width='large'
                        placeholder='タイトル、ユーザー名、メールアドレスなどで検索'
                        marginRight
                        marginSize='small'
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                    />
                    <Button 
                        IconComponent={MdSearch} 
                        mr={1}
                    >
                        検索
                    </Button>
                </MarginBase>

                <VisuallyHidden>
                    {/* 検索条件の見出しを立てているため、一覧部分にも視覚的には見えないかたちで見出しを立てる */}
                    <SectionTitle>申請の一覧</SectionTitle>
                </VisuallyHidden>
                <WithSideContent
                    mb={1}
                    sideContent={
                    <>
                        <Pagination
                            rowsPerPageOptions={ROWS_OPTION.map((option) => ({value : `${option}`}))}
                            rowsPerPageValue={rowOption}
                            currentPage={currentPage}
                            rowCount={pageCount * rowOption}
                            mr={1}
                            onChange={(e) => setRowOption(Number(e.currentTarget.value))}
                        />
                        <DropdownButton
                            buttonLabel='エクスポート'
                            dropdownContents={[
                                {
                                    type: 'selectable',
                                    text: 'CSV形式でエクスポート',
                                    onClick: () => exportToExcel()
                                },
                                {
                                    type: 'selectable',
                                    text: 'JSON形式でエクスポート',
                                    onClick: () => exportToJson()
                                },
                                { type: 'rule' },
                                {
                                    type: 'selectable',
                                    text: 'エクスポート履歴',
                                },
                            ]}
                        />
                    </>
                    }
                >
                    <DropdownButton
                        buttonLabel='一括操作'
                        dropdownContents={[
                            {
                                type: 'selectable',
                                text: 'ステータスを変更',
                            },
                            { type: 'selectable', text: '削除' },
                        ]}
                        mr={0.5}
                    />
                    {statuses.filter((e) => e).length > 0 && (
                        <Paragraph inline>
                            {statuses.filter((e) => e).length} 件を選択中
                        </Paragraph>
                    )}
                </WithSideContent>
                <ListTable
                    mr={-1.5}
                    ml={-1.5}
                    headers={
                        LIST_TABLE_HEADER.map(({ 
                            value,
                            minWidth,
                            onClick,
                            alignRight,
                            ordering,
                            sortValue
                        }): TableHeader => {
                            let typeCastingsortValue = sortValue as keyof ListElm
                            let result = { value } as TableHeader
                            if(minWidth) result.minWidth = minWidth
                            if(onClick) result.onClick = () => sort(typeCastingsortValue)
                            if(ordering) result.ordering = (sortKey === typeCastingsortValue && sortOrder) || ORDER.INIT
                            if(alignRight) result.alignRight = alignRight

                            return result
                        })
                    }
                    onChangeHeaderCheckBox={(e) => changeAllStatus(e.target.checked)}
                    rows={
                        sortedData.map((row, i) => ({
                            checked: statuses[i],
                            onChangeCheckBox: (e) => {
                                changeRowStatus(e.target.checked, i)
                            },
                            url: `/path/to/single/${i}`,
                            cells: [
                                { value: row.title },
                                { value: row.user, breakWord: true },
                                { value: Digits.formalize(row.amount), alignRight: true },
                                { value: row.status },
                                { value: row.date },
                                {
                                    value: (
                                        <>
                                            <Button mr={0.5} small appearance='tertiary'>
                                                コピー
                                            </Button>
                                            <Button mr={0.5} danger small appearance='tertiary'>
                                                削除
                                            </Button>
                                        </>
                                    ),
                                },
                            ],
                        })
                    )}
                    withCheckBox
                ></ListTable>
                <Pager
                    currentPage={currentPage}
                    pageCount={pageCount}
                    onPageChange={(e) => {
                        // Todo : Server Data <-
                        setCurrentPage(e)
                    }}
                />
            </Wrapper>
        </Container>
    )
}

export default Home