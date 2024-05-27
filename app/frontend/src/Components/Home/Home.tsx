
import React, { useState } from 'react'
import { GoTriangleDown } from 'react-icons/go'
import { IoIosSettings } from 'react-icons/io'
import { MdMenuOpen } from 'react-icons/md'
import {
    Button,
    ListTable,
    DropdownButton,
    Pager,
    Digits,
    TableHeader,
    IconOnlyButton,
  } from '@freee_jp/vibes'
import { BILL_KEY, CREATE_URL, DEFAULT_PAGE, HAEDER_DROPDOWN_LABEL, ICON_SIZE, LIST_TABLE_HEADER, OPTIONS, ORDER, ROWS_OPTION, SIDE_MENU_TITLE } from '../../utils/constants'
import { Bill, ListElm, Order, PropsForRailsData } from '../../utils/type'
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

// Todo : Data -> BackEnd
const useData = (data: Bill[]) => {

    const [sortKey, setSortKey] = useState<keyof Bill>(BILL_KEY.ID)
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

const Home = ({ bills, mycompany }: PropsForRailsData) => {
    const {
      sort,
      sortKey,
      sortOrder,
      statuses,
      sortedData,
      changeAllStatus,
      changeRowStatus,
    } = useData(bills)

    const filter = filterData()
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
                            display={sideMenuDisplay ? 1 : 0}
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
                                                    key={index}
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
                                            //if(onClick) result.onClick = () => sort(typeCastingsortValue)
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
                                                { value: row[BILL_KEY.BUSINESS_PARTNER] },
                                                { value: `${row[BILL_KEY.ID]} ${row[BILL_KEY.BRANCH_NUMBER]}` },
                                                // { value: Digits.formalize(row.amount), alignRight: true },
                                                // { value: row.status },
                                                // { value: row.date },
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