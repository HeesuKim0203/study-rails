
import React, { ChangeEvent, useState } from 'react'
import { MdAdd, MdFilterList, MdSearch } from 'react-icons/md'
import {
    Container,
    ContentsBase,
    MarginBase,
    Button,
    SelectBox,
    Paragraph,
    WithSideContent,
    ListTable,
    HeadlineArea,
    DropdownButton,
    Pagination,
    Pager,
    Digits,
    FormControl,
    FormControlGroup,
    TextField,
    DigitsInput,
    DateInput,
    ColumnBase,
    SectionTitle,
    VisuallyHidden,
    SearchField,
    FormActions,
    FloatingMessageBlock,
  } from '@freee_jp/vibes'

export type Order = 'asc' | 'desc' | 'init'

type ListElm = {
    title: string
    user: string
    amount: number
    status: string
    date: string
}

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
    ]

    const [sortKey, setSortKey] = useState<keyof ListElm>('date')
    const [sortOrder, setSortOrder] = useState<Order>('desc')
    const [statuses, setStatuses] = useState<boolean[]>(
        Array(data.length).fill(false)
    )

    const nextOrder: { [key in Order]: Order } = {
        asc: 'desc',
        desc: 'init',
        init: 'asc',
    }

    const sort = (newKey: keyof ListElm) => {
        if (sortKey === newKey) {
            setSortOrder((prev) => nextOrder[prev])
        } else {
            setSortKey(newKey)
            setSortOrder('asc')
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
        sortOrder === 'init'
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

    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)

    const [title, setTitle] = useState('')
    const [userName, setUserName] = useState('')
    const [amount, setAmount] = useState(0)

    const [newDataDisplay, setNewDataDisplay] = useState(false) 

    const onChange = (
        event: ChangeEvent<HTMLInputElement>, 
        setState: React.Dispatch<React.SetStateAction<string>>
    ) => setState(event.currentTarget.value)

    return (
        <Container width='wide'>
            <ContentsBase>
                <HeadlineArea pageTitle='Study Rails'>
                    以下はRailsを学習するために作成したフロントエンドです。 
                </HeadlineArea>
                <MarginBase mb={1}>
                    <Button IconComponent={MdAdd} mr={1} onClick={(_) => setNewDataDisplay(!newDataDisplay)}>
                        新規追加
                    </Button>
                </MarginBase>

                {newDataDisplay && 
                    <ColumnBase paddingSize="small" mb={2}>
                        <FormControlGroup>
                            <FormControl
                                mb={1}
                                mr={1}
                                label="ユーザ名前"
                                fieldId="horizontal-form__account"
                                help="ユーザ名前を入力します。"
                                required
                            >
                                <TextField
                                    id="submit-error-interaction__name-from"
                                    error={error}
                                    value={userName}
                                    onChange={(e) => onChange(e, setUserName)}
                                />
                            </FormControl>
                            <FormControl
                                mb={1}
                                mr={1}
                                label="タイトル"
                                required
                                help="タイトルを書きます。"
                                fieldId="horizontal-form__partner"
                            >
                                <TextField
                                    id="submit-error-interaction__name-from"
                                    error={error}
                                    value={title}
                                    onChange={(e) => onChange(e, setTitle)}
                                />
                            </FormControl>
                            <FormControl
                                mb={1}
                                mr={1}
                                label="金額"
                                required
                                fieldId="horizontal-form__amount"
                            >
                                <DigitsInput
                                    id="submit-error-interaction__amount"
                                    required
                                    error={error}
                                    value={amount}
                                    onChange={(e) => setAmount(e ? e : 0)}
                                />
                            </FormControl>
                        </FormControlGroup>
                        <FormActions>
                            <Button 
                                appearance="primary"
                                onClick={() => {
                                    setMessage('')
                                    setTimeout(() => {
                                        if( !userName || !title || !amount ) {
                                            setError(true)
                                            setMessage(
                                                '入力内容にエラーがあります。修正のうえ、再度お試しください'
                                            )
                                        }else {
                                            setError(false)
                                            setMessage('保存しました')
                                            setTitle('')
                                            setUserName('')
                                            setAmount(0)
                                        }
                                    }, 600)
                                }}
                            >登録</Button>
                            {message && <FloatingMessageBlock error={error} success={!error} message={message} />}
                        </FormActions>
                    </ColumnBase>
                }

                <MarginBase mb={2}>
                    <SearchField
                        width='large'
                        placeholder='タイトル、ユーザー名、メールアドレスなどで検索'
                        marginRight
                        marginSize='small'
                    />
                    <Button IconComponent = { MdSearch } mr = { 1 }>
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
                            rowsPerPageOptions={[
                                { value: '10' },
                                { value: '20' },
                                { value: '50' },
                                { value: '100' },
                                { value: '200' },
                            ]}
                            rowsPerPageValue={20}
                            currentPage={1}
                            rowCount={999}
                            mr={1}
                        />
                        <DropdownButton
                            buttonLabel='エクスポート'
                            dropdownContents={[
                                {
                                    type: 'selectable',
                                    text: 'CSV形式でエクスポート',
                                },
                                {
                                    type: 'selectable',
                                    text: 'JSON形式でエクスポート',
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
                            {statuses.filter((e) => e).length}件を選択中
                        </Paragraph>
                    )}
                </WithSideContent>
                <ListTable
                    mr={-1.5}
                    ml={-1.5}
                    headers={[
                        {
                            value: 'タイトル',
                            minWidth: 15,
                            onClick: () => sort('title'),
                            ordering: (sortKey == 'title' && sortOrder) || 'init',
                        },
                        {
                            value: 'ユーザー',
                            minWidth: 10,
                            onClick: () => sort('user'),
                            ordering: (sortKey == 'user' && sortOrder) || 'init',
                        },
                        {
                            value: '金額',
                            minWidth: 5,
                            alignRight: true,
                            onClick: () => sort('amount'),
                            ordering: (sortKey == 'amount' && sortOrder) || 'init',
                        },
                        {
                            value: 'ステータス',
                            onClick: () => sort('status'),
                            ordering: (sortKey == 'status' && sortOrder) || 'init',
                        },
                        {
                            value: '作成日',
                            onClick: () => sort('date'),
                            ordering: (sortKey == 'date' && sortOrder) || 'init',
                        },
                        { value: '操作' },
                    ]}
                    onChangeHeaderCheckBox={(e) => changeAllStatus(e.target.checked)}
                    rows={sortedData.map((row, i) => ({
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
                    }))}
                    withCheckBox
                ></ListTable>
                <Pager
                    currentPage={1}
                    pageCount={99}
                    onPageChange={() => {
                    /* 2ページ目以降作ってないので許して */
                    }}
                />
            </ContentsBase>
        </Container>
    )
}

export default Home