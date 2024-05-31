
import React, { useEffect, useState } from 'react'
import { GoTriangleDown } from 'react-icons/go'
import { AiOutlineMenuFold } from 'react-icons/ai'
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import {
    Button,
    ListTable,
    DropdownButton,
    Pager,
    TableHeader,
    IconOnlyButton,
    WithSideContent,
    Pagination,
    FormControl,
    TextField,
    Message,
    Note,
    FormActions,
    FloatingMessageBlock,
    NoDataCreated,
    NoSearchResults,
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
    SIDE_MENU_TITLE, 
    SUCCESS,
    FILTER_DATA} from '../../utils/constants'
import { Bill, FilterDataType, FilterOptions, GetBillParams } from '../../utils/type'
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
import { deleteBill, getBillsCount, getBillsPagenation } from '../../api'
import { useData } from '../../utils/hooks'
import { AxiosResponse } from 'axios'
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from '../Modal'

const Home = () => {
    
    const [filter, setFilter] = useState<FilterDataType[]>(FILTER_DATA)
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
    const [rowOption, setRowOption] = useState(DEFAULT_ROWS_OPTIONS)
    const [filterOptions, setFilterOptions] = useState<FilterOptions[]>([])

    const [pageCount, setPageCount] = useState<number>(0)
    const [bills, setBills] = useState<Bill[]>([])

    const [filterSelected, setFilterSelected] = useState(0)
    const [sideMenuDisplay, setSideMenuDisplay] = useState<boolean>(true)

    const [loading, setLoading] = useState(true)

    const [modalDisplay, setModalDisplay] = useState<boolean>(false)

    const [filterModalError, setFilterModalError] = useState(false)
    const [filterModalMessage, setFilterModalMessage] = useState('')
    const [filterName, setFilterName] = useState('')
    const [filterUpdate, setFilterUpdate] = useState(false)

    const getData = async() => {

        let paramsOptions: GetBillParams = filterOptions.reduce((prev: any, {text, key, value}: FilterOptions, index) => {
            if(value) {
                prev[key] = value
            }
            return prev
        }, {})

        paramsOptions.page = currentPage
        paramsOptions.per_page = rowOption

        try {    
            const responseCount = await getBillsCount(
                {
                    params: paramsOptions
                }
            )
            const responseBills = await getBillsPagenation(
                {
                    params: paramsOptions
                }
            )
            
            if(responseCount.status !== SUCCESS && responseBills.status !== SUCCESS) {
                throw Error
            }

            setPageCount(Math.ceil((responseCount.data.total_count || 1) / rowOption))
            setBills(responseBills.data)

        } catch (error) {
            
            // Todo : error message logic
            setPageCount(1)

        }finally {
            
            setLoading(false)

        }
    }

    const getFilterRecordNum = async (filterOptions: FilterOptions[]) => {
        let paramsOptions: GetBillParams = filterOptions.reduce((prev: any, {text, key, value}: FilterOptions, index) => {
            if(value) {
                prev[key] = value
            }
            return prev
        }, {})

        try {    
            const responseCount = await getBillsCount(
                {
                    params: paramsOptions
                }
            )

            return responseCount.data.total_count
        }catch {
            return 0
        }
    }

    async function updateFilters(oneFilter?: FilterDataType): Promise<FilterDataType> {

        let updatedFilters: FilterDataType[] | FilterDataType  = []

        if(oneFilter) {
            const recordNum = await getFilterRecordNum(oneFilter.filterOption)
            updatedFilters = { ...oneFilter, recordNum }
            return updatedFilters
        }else {
            updatedFilters = await Promise.all(
                filter.filter((_, index) => index !== 0).map(async (filter, index) => {
                    const recordNum = await getFilterRecordNum(filter.filterOption)
                    return { ...filter, recordNum }
                })
            )
            setFilter([ filter[0], ...updatedFilters ])
        }

        return {text: '', filterOption: [], recordNum : 0}
    }

    useEffect(() => {
        const filterJsonData = localStorage.getItem('study-rail@test1')
        if(filterJsonData) { 
            setFilter(JSON.parse(filterJsonData))
        } 
        updateFilters()
    }, [])
    
    useEffect(() => {
        getData()
    }, [rowOption, currentPage, filterOptions])

    useEffect(() => {
        setCurrentPage(DEFAULT_PAGE)
    }, [rowOption])

    useEffect(() => {
        setFilterOptions(filter[filterSelected]?.filterOption || [])
    }, [filterSelected])

    useEffect(() => {
        localStorage.setItem('study-rail@test1', JSON.stringify(filter))
    }, [filter])

    useEffect(() => {
        if(bills.length === 0) getData()
    }, [bills])
    
    const {
      sort,
      sortKey,
      sortOrder,
      statuses,
      sortedData,
      changeAllStatus,
      changeRowStatus,
    } = useData(bills)

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
                                        {/* Todo: Implement Filter Page */}
                                        {/* <IconOnlyButton 
                                            small={true}
                                            label='フィルタ設定'
                                            IconComponent={IoIosSettings}
                                        /> */}
                                    </ContentSideMenuTitleIcon>
                                </ContentSideMenuHeader>
                                <ContentSideMenuItemWrapper>
                                        { filter.map(({text, filterOption, recordNum}: FilterDataType, index) => {
                                            return (
                                                <ContentSideMenuItem
                                                    key={index}
                                                    display={sideMenuDisplay ? 1 : 0}
                                                    selected={index === filterSelected}
                                                    onClick={() => setFilterSelected(index)}
                                                >
                                                    <ContentSideMenuItemText>{text}</ContentSideMenuItemText>
                                                    {recordNum !== undefined && <ContentSideMenuItemCounter>{recordNum}</ContentSideMenuItemCounter>}
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
                                                            onOptionClick={(e) => {
                                                                console.log(e)
                                                                setFilterOptions([
                                                                    ...filterOptions.slice(0, index),
                                                                    e,
                                                                    ...filterOptions.slice(index + 1, filterOptions.length),
                                                                ])}
                                                            }
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
                                                onOptionClick={(e) => setFilterOptions(filterOptions.concat(e))}
                                            />
                                            <ContentHeaderFilterClear onClick={() => setFilterOptions([])} >クリア</ContentHeaderFilterClear>
                                        </FilterOptionsArea>
                                    </ContentHeaderFilterArea>
                                    <ContentHeaderFilterRightArea>
                                        {filterSelected === 0 ? 
                                            <Button>
                                                <ContentButtonFontArea
                                                    onClick={() => setModalDisplay(!modalDisplay)}
                                                >フィルタ条件の保存</ContentButtonFontArea>
                                            </Button> : 
                                            <DropdownButton
                                                ml={1}
                                                buttonLabel='フィルタ条件の保存'
                                                dropdownContents={[
                                                    {
                                                        type: 'selectable',
                                                        text: '新規作成',
                                                        onClick: () => {
                                                            setModalDisplay(!modalDisplay)
                                                            setFilterUpdate(true)
                                                        }
                                                    },
                                                    {
                                                        type: 'selectable',
                                                        text: '選択したもの修正',
                                                        onClick: () => {
                                                            setModalDisplay(!modalDisplay)
                                                            setFilterName(filter[filterSelected].text)
                                                        }
                                                    },
                                                    {
                                                        type: 'selectable',
                                                        text: '選択したもの削除',
                                                        onClick: () => {
                                                            setFilterSelected(0)
                                                            setFilter([
                                                                ...filter.slice(0, filterSelected),
                                                                ...filter.slice(filterSelected + 1, filter.length)
                                                            ])
                                                        }
                                                    },
                                                ]}
                                            />
                                        }
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
                                {bills.length ? <ListTable
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
                                                        <Button 
                                                            mr={0.5} danger small appearance='tertiary'
                                                            onClick={async () => {
                                                                const response = row.id && await deleteBill(row.id)
                                                                if((response as AxiosResponse)?.status === 200) {
                                                                    setBills([
                                                                        ...bills.slice(0, i),
                                                                        ...bills.slice(i + 1, bills.length)
                                                                    ])
                                                                }
                                                            }}
                                                        >
                                                            削除
                                                        </Button>
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
                                    // Todo : Loading
                                >
                                </ListTable> 
                                : filterOptions.length ? 
                                    (
                                        <NoSearchResults mt={1} />
                                    ) : 
                                    (
                                        <NoDataCreated mt={3}>
                                            <Link to={ `${INVOICES_URL}${CREATE_URL}`}>
                                                <Button appearance='primary' mt={1}>
                                                    新規作成
                                                </Button>
                                            </Link>
                                        </NoDataCreated>
                                    )
                                }
                                <PagerArea>
                                    <Pager
                                        mr={2}
                                        currentPage={currentPage}
                                        pageCount={pageCount}
                                        onPageChange={(e) => {
                                            setCurrentPage(e)
                                        }}
                                    />
                                </PagerArea>
                             </IconContext.Provider>
                        </Content>
                    </ContentWrapper>
                </Wrapper>
                <Modal 
                    display={modalDisplay}
                    onClose={() => setModalDisplay(false)}
                    content={(
                        <>
                            <ModalHeader>
                                <ModalTitle>test</ModalTitle>
                            </ModalHeader>
                            <ModalContent>
                                <FormControl
                                    mb={1}
                                    mr={1}
                                    label='フィルタ条件名'
                                    fieldId='invoice_filter'
                                    required
                                >
                                    <TextField
                                        width='large'
                                        name='フィルタ条件名'
                                        id='invoice_filter'
                                        value={filterName}
                                        onChange={(e) => setFilterName(e.target.value)}
                                        mb={0.5}
                                    />
                                    <Note>18文字まで</Note>
                                </FormControl>
                                {filterModalError && (
                                    <Message ml={1} error={filterModalError}>
                                        フィルタ条件名を入力してください
                                    </Message>
                                )}
                            </ModalContent>
                            <ModalFooter>
                                <FormActions>
                                    <Button
                                        appearance='primary'
                                        onClick={async () => {
                                            if(filterName && filterName.length <= 18) {
                                                setFilterModalError(false)
                                                if(filterUpdate) {
                                                    const newFilter = await updateFilters({ ...filter[filterSelected], filterOption: filterOptions, recordNum: 0})
                                                    setFilter([
                                                        ...filter.slice(0, filterSelected),
                                                        newFilter,
                                                        ...filter.slice(filterSelected + 1, filter.length)
                                                    ])
                                                    setFilterUpdate(false)
                                                }else {
                                                    const newFilter = await updateFilters({text: filterName, filterOption: filterOptions, recordNum: 0})
                                                    setFilter([
                                                        ...filter, newFilter
                                                    ])
                                                }
                                                setModalDisplay(false)
                                                setFilterName('')
                                                setFilterSelected(filter.length)
                                            }else {
                                                setFilterModalMessage('入力されたデータに誤りがあります。')
                                                setFilterModalError(true)
                                            }
                                        }}
                                    >OK</Button>
                                    <Button
                                        onClick={() => setModalDisplay(false)}
                                    >キャンセル</Button>
                                </FormActions>
                            </ModalFooter>
                            {filterModalMessage && <FloatingMessageBlock error={filterModalError} success={!filterModalError} message={filterModalMessage} />}
                        </>
                    )}
                />
        </Container>
    )
}

export default Home