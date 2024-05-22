
import React, { ElementType, useState } from 'react'
import { GoTriangleDown } from 'react-icons/go'
import { IoIosSettings } from 'react-icons/io'
import { MdMenuOpen } from 'react-icons/md'
import {
    MarginBase,
    Button,
    Paragraph,
    WithSideContent,
    ListTable,
    DropdownButton,
    Pagination,
    Pager,
    Digits,
    SectionTitle,
    VisuallyHidden,
    SearchField,
    TableHeader,
    Dropdown,
    OptionButton,
    IconOnlyButton,
    TextButton,
  } from '@freee_jp/vibes'
import { CREATE_URL, DEFAULT_PAGE, DEFAULT_ROWS, HAEDER_DROPDOWN_LABEL, ICON_SIZE, LIST_TABLE_HEADER, OPTIONS, ORDER, ROWS_OPTION, SIDE_MENU_TITLE } from '../../utils/constants'
import { ListElm, Order } from '../../utils/type'
import {
    Container,
    Wrapper,
    Header,
    Title,
    ContentWrapper,
    Content,
    ContentSideMenu,
    ContentSideMenuHeader,
    ContentSideMenuTitle,
    ContentSideMenuTitleIcon,
    ContentSideMenuItemWrapper,
    ContentSideMenuItem,
    ContentSideMenuItemText,
    ContentSideMenuItemCounter,
    ContentHeader,
    ContentHeaderSideMenuDisplayIcon,
    ContentHeaderFilterArea,
    ContentHeaderFilterClear,
    ContentHeaderFilterRightArea,
    ContentButtonFontArea,
} from './HomeStyle'
import { IconContext } from 'react-icons'
import FilterDropDown from '../FilterDropDown'
import { Link } from 'react-router-dom'
import Icon from '../Icon'

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

// Todo : Data -> BackEnd
const filterData = () => {
    const data = [
        {text : '全ての請求書'},
        {text : '送付待ち', reacordNum: 0},
        {text : '取引登録待ち', reacordNum: 0},
        {text : '入金待ち', reacordNum: 0},
        {text : '入金期日超過', reacordNum: 0},
    ]

    return data
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

    const filter = filterData()

    const [rowOption, setRowOption] = useState(DEFAULT_ROWS)
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
    const [search, setSearch] = useState('')

    // Todo : Server Data Record count
    const [pageCount, setPageCount] = useState(10)

    const [filterSelected, setFilterSelected] = useState(0)
    const [sideMenuDisplay, setSideMenuDisplay] = useState<boolean>(true)

    return (
        <Container>
                <Wrapper>
                    <IconContext.Provider value={{ size: ICON_SIZE.SMALL }} >
                        <Header>
                            <Title>請求書</Title>
                            <Link to={CREATE_URL}>
                                <Button appearance='primary'>
                                    新規作成
                                </Button>
                            </Link>
                            <DropdownButton
                                ml={1}
                                buttonLabel={HAEDER_DROPDOWN_LABEL}
                                iconOnly={true}
                                IconOnlyComponent={GoTriangleDown}
                                dropdownContents={[
                                    // ?????
                                    {
                                        type: 'selectable',
                                        text: '請求書作成用CSVインポート',
                                    }
                                ]}
                            />
                        </Header>
                    </IconContext.Provider>

                    <ContentWrapper>
                        <ContentSideMenu
                            display={sideMenuDisplay}
                        >
                            <IconContext.Provider value={{ size: ICON_SIZE.SMALL }} >
                                <ContentSideMenuHeader>
                                    <ContentSideMenuTitle>
                                        {SIDE_MENU_TITLE}
                                    </ContentSideMenuTitle>
                                    <ContentSideMenuTitleIcon>
                                        <IconOnlyButton 
                                            small={true}
                                            label='フィルタ設定'
                                            IconComponent={IoIosSettings}
                                        />
                                    </ContentSideMenuTitleIcon>
                                </ContentSideMenuHeader>
                                <ContentSideMenuItemWrapper>
                                        { filter.map(({text, reacordNum}, index) => {
                                            return (
                                                <ContentSideMenuItem
                                                    selected={index === filterSelected}
                                                    onClick={() => setFilterSelected(index)}
                                                >
                                                    <ContentSideMenuItemText>{text}</ContentSideMenuItemText>
                                                    {reacordNum !== undefined && <ContentSideMenuItemCounter>{reacordNum}</ContentSideMenuItemCounter>}
                                                </ContentSideMenuItem>
                                            )
                                        }) }
                                    </ContentSideMenuItemWrapper>
                                </IconContext.Provider>
                            </ContentSideMenu>
                        <Content>
                            <IconContext.Provider value={{ size: ICON_SIZE.NORMAL }} >
                                <ContentHeader>
                                    <ContentHeaderFilterArea>
                                        <ContentHeaderSideMenuDisplayIcon>
                                            <IconOnlyButton
                                                label='フィルタ設定'
                                                IconComponent={MdMenuOpen}
                                                onClick={() => setSideMenuDisplay(!sideMenuDisplay)}
                                            />
                                        </ContentHeaderSideMenuDisplayIcon>
                                        <FilterDropDown
                                            options={OPTIONS}
                                            onOptionClick={() => {}}
                                        />
                                        <ContentHeaderFilterClear>クリア</ContentHeaderFilterClear>
                                    </ContentHeaderFilterArea>
                                    <ContentHeaderFilterRightArea>
                                        <Button>
                                            <ContentButtonFontArea>フィルタ条件の保存</ContentButtonFontArea>
                                        </Button>
                                        <DropdownButton
                                            ml={1}
                                            buttonLabel=''
                                            iconOnly={true}
                                            dropdownContents={[
                                                // ?????
                                                {
                                                    type: 'selectable',
                                                    text: '請求書作成用CSVインポート',
                                                }
                                            ]}
                                        />
                                    </ContentHeaderFilterRightArea>
                                </ContentHeader>
                                <ListTable
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
                             </IconContext.Provider>
                        </Content>
                    </ContentWrapper>
                </Wrapper>
        </Container>
    )
}

export default Home