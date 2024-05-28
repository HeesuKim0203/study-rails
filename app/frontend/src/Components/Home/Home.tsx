
import React, { useEffect, useState } from 'react'
import { GoTriangleDown } from 'react-icons/go'
import { IoIosSettings } from 'react-icons/io'
import { AiOutlineMenuFold } from 'react-icons/ai'
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import {
    Button,
    ListTable,
    DropdownButton,
    Pager,
    Digits,
    TableHeader,
    IconOnlyButton,
    WithSideContent,
    Pagination,
  } from '@freee_jp/vibes'
import { 
    BILL_KEY, 
    CREATE_URL, 
    DEFAULT_PAGE, 
    DEFAULT_ROWS_OPTIONS, 
    HAEDER_DROPDOWN_LABEL, 
    ICON_SIZE, 
    INVOICES_URL, 
    LIST_TABLE_HEADER, 
    FILTER_OPTIONS, 
    ORDER, 
    ROWS_OPTIONS, 
    SIDE_MENU_TITLE } from '../../utils/constants'
import { Bill, FilterOptions, ListElm, Order, PropsForRailsData } from '../../utils/type'
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
    FilterOptionsArea,
    PagerArea,
} from './HomeStyle'
import { IconContext } from 'react-icons'
import FilterDropDown from '../FilterDropDown'
import { Link } from 'react-router-dom'
import { formatNumberWithCommas } from '../../utils/util'

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
                (sortOrder === ORDER.DESC ? -1 : 1)
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
    const [rowOption, setRowOption] = useState(DEFAULT_ROWS_OPTIONS)
    const [filterOptions, setFilterOptions] = useState<FilterOptions[]>([])

    // Todo : Server Data Record count
    const [pageCount, setPageCount] = useState(Math.ceil(bills.length / DEFAULT_ROWS_OPTIONS))

    useEffect(() => {
        setPageCount(Math.ceil(bills.length / DEFAULT_ROWS_OPTIONS))
    }, [rowOption])

    useEffect(() => {
        console.log(filterOptions)
    }, [filterOptions])

    const [filterSelected, setFilterSelected] = useState(0)
    const [sideMenuDisplay, setSideMenuDisplay] = useState<boolean>(true)

    return (
        <Container>
                <Wrapper>
                    <IconContext.Provider value={{ size: ICON_SIZE.SMALL }} >
                        <Header>
                            <Title>請求書</Title>
                            <Link to={ `${INVOICES_URL}${CREATE_URL}`}>
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
                            <IconContext.Provider value={{size: ICON_SIZE.SMALL}} >
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
                                                    display={sideMenuDisplay ? 1 : 0}
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
                            <IconContext.Provider value={{size: ICON_SIZE.NORMAL}} >
                                <ContentHeader>
                                    <ContentHeaderFilterArea>
                                        <ContentHeaderSideMenuDisplayIcon>
                                            <IconOnlyButton
                                                label='フィルタ設定'
                                                IconComponent={sideMenuDisplay ? AiOutlineMenuFold : AiOutlineMenuUnfold}
                                                onClick={() => setSideMenuDisplay(!sideMenuDisplay)}
                                            />
                                        </ContentHeaderSideMenuDisplayIcon>
                                        <FilterOptionsArea>
                                            {
                                                filterOptions.map((filterOption, index) => {
                                                    return (
                                                        <FilterDropDown
                                                            option={filterOption}
                                                            onOptionClick={(e) => setFilterOptions([
                                                                ...filterOptions.slice(0, index),
                                                                {...filterOption, value:e},
                                                                ...filterOptions.slice(index + 1, filterOptions.length),
                                                            ])}
                                                            onDelete={() => setFilterOptions([
                                                                ...filterOptions.slice(0, index),
                                                                ...filterOptions.slice(index + 1, filterOptions.length),
                                                            ])}
                                                        />
                                                    )
                                                })
                                            }
                                            <FilterDropDown
                                                options={
                                                        FILTER_OPTIONS.filter((filterOption) => 
                                                            filterOptions.findIndex((seletedFilterOptions) => 
                                                                seletedFilterOptions.text === filterOption.text) === -1)
                                                    }
                                                onOptionClick={(e) => setFilterOptions(filterOptions.concat({text:e, value:''}))}
                                            />
                                            <ContentHeaderFilterClear onClick={() => setFilterOptions([])} >クリア</ContentHeaderFilterClear>
                                        </FilterOptionsArea>
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
                                <WithSideContent
                                    mb={1}
                                    sideContent={
                                        <Pagination
                                            rowsPerPageOptions={ROWS_OPTIONS}
                                            rowsPerPageValue={rowOption}
                                            currentPage={1}
                                            rowCount={bills.length + 1}
                                            mr={1}
                                            onChange={(e) => setRowOption(Number(e.target.value))}
                                        />
                                    }
                                />
                                <ListTable
                                    fixedHeader={true}
                                    headers={
                                        LIST_TABLE_HEADER.map(({ 
                                            value,
                                            minWidth,
                                            onClick,
                                            alignRight,
                                            ordering,
                                            sortValue
                                        }): TableHeader => {
                                            let typeCastingsortValue = sortValue as keyof Bill
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
                                            url: `${INVOICES_URL}/${row.id}`,
                                            cells: [
                                                {value: row[BILL_KEY.TITLE] },
                                                {value: row[BILL_KEY.BUSINESS_PARTNER] },
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
                                                {value: `${row[BILL_KEY.ID]} ${row[BILL_KEY.BRANCH_NUMBER]}` },
                                                {value: formatNumberWithCommas(row[BILL_KEY.AMOUNT]), alignRight: true },
                                                {value: row[BILL_KEY.MEMO]},
                                                {value: row[BILL_KEY.REMARKS]},
                                                //Todo: JP Check
                                                {value: row[BILL_KEY.METHOD_OF_DEPOSIT]},
                                                {value: row[BILL_KEY.INVOICE_DATE]},
                                                {value: row[BILL_KEY.DEPOSIT_DATE]},
                                                {value: row[BILL_KEY.REPRESENTATIVE]},
                                            ],
                                        })
                                    )}
                                    withCheckBox
                                ></ListTable>
                                <PagerArea>
                                    <Pager
                                        mr={2}
                                        currentPage={currentPage}
                                        pageCount={pageCount}
                                        onPageChange={(e) => {
                                            // Todo : Server Data <-
                                            setCurrentPage(e)
                                        }}
                                    />
                                </PagerArea>
                             </IconContext.Provider>
                        </Content>
                    </ContentWrapper>
                </Wrapper>
        </Container>
    )
}

export default Home