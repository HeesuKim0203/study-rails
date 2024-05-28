import React, { Dispatch, useState } from 'react'
import {
    Button,
    CheckBox,
    DateField,
    DateInput,
    DescriptionList,
    DigitsInput,
    FloatingMessageBlock,
    FormActions,
    FormControl,
    FormControlGroup,
    InlineLink,
    ListTable,
    Loading,
    Message,
    MessageBlock,
    MessageIcon,
    NameField,
    Note,
    SelectBox,
    TaskDialog,
    TextField,
    ToggleButton,
    VisuallyHidden,
    WithDescriptionContent,
    WithBalloon,
    RequiredIcon,
    IconOnlyButton,
    DropdownButton,
    Dropdown,
} from '@freee_jp/vibes'
import {
    Summary,
    Index,
    TableHeader,
    Container,
    Amount,
    AmountHeader
} from './ListFormStyle'
import { FaPlus } from 'react-icons/fa6'
import { MdDelete } from 'react-icons/md'
import { IconContext } from 'react-icons'
import { ListFromType } from '../../utils/type'
import { DEFAULT_DATA, TAX_OPTION } from '../../utils/constants'
import { extractNumber, formatNumberWithCommas, getValueAmount } from '../../utils/util'
import { deleteStatement } from '../../api'
import { AxiosResponse } from 'axios'

interface ListFormProps {
    values: ListFromType[]
    setValues: Dispatch<React.SetStateAction<ListFromType[]>>
}

const ListForm = ({
    values,
    setValues
}: ListFormProps) => {

    return (
        <Container>
            <ListTable
                mb={1}
                headers={[
                    { value: ''    },
                    { value: (<TableHeader>摘要</TableHeader>) },
                    { value: '数量', alignRight: true },
                    { value: '単位' },
                    { value: '単価', alignRight: true },
                    { value: '税率' },
                    { value: '源泉徴収' },
                    { value: (<AmountHeader>金額</AmountHeader>), alignRight: true },
                    { value: ''   },
                ]}
                rows={
                    values.map((v, i) => ({
                        cells: [
                            {
                                value: (
                                    <Summary>
                                        <Index>{i + 1}</Index>
                                        <IconContext.Provider value={{size: '1rem'}}>
                                            <IconOnlyButton 
                                                ml={0.5}
                                                label={`${i + 1}行目の追加`}
                                                IconComponent={FaPlus}
                                                onClick={() => setValues([...values, DEFAULT_DATA])}
                                            />
                                        </IconContext.Provider>
                                    </Summary>
                                ),
                            },
                            {
                                value: (
                                    <TextField
                                        value={v.summary}
                                        label={`${i + 1}行目の摘要`}
                                        width='full'
                                        onChange={(e) => (
                                            setValues([
                                                ...values.slice(0, i),
                                                { ...v, summary: e.target.value },
                                                ...values.slice(i + 1),
                                            ])
                                        )}
                                    />
                                ),
                            },
                
                            {
                                value: (
                                    <DigitsInput
                                        value={v.count}
                                        label={`${i + 1}行目の数量`}
                                        width='full'
                                        onChange={(a) => (
                                            setValues([
                                                ...values.slice(0, i),
                                                { ...v, count: a || 0 },
                                                ...values.slice(i + 1),
                                            ])
                                        )}
                                    />
                                ),
                            },
                            {
                                value: (
                                    <TextField
                                        value={v.unit}
                                        label={`${i + 1}行目の単位`}
                                        width='full'
                                        onChange={(e) => (
                                                setValues([
                                                    ...values.slice(0, i),
                                                    { ...v, unit: e.target.value },
                                                    ...values.slice(i + 1),
                                                ])
                                            )
                                        }
                                    />
                                ),
                            },
                            {
                                alignRight: true,
                                value: (
                                    <DigitsInput
                                        value={v.price}
                                        label={`${i + 1}行目の単価`}
                                        width='full'
                                        onChange={(a) => (
                                                setValues([
                                                    ...values.slice(0, i),
                                                    { ...v, price: a || 0 },
                                                    ...values.slice(i + 1),
                                                ])
                                            )
                                        }
                                    />
                                ),
                            },
                            {
                                value: (
                                    <SelectBox
                                        width='small'
                                        label={`${i + 1}行目の税率`}
                                        value={v.tax}
                                        options={TAX_OPTION}
                                        onChange={(e) => {
                                            setValues([
                                                ...values.slice(0, i),
                                                { ...v, tax: e.target.value },
                                                ...values.slice(i + 1),
                                            ])
                                        }}
                                    />
                                ),
                            },
                            {
                                value: (
                                    <CheckBox
                                        name='源泉徴収'
                                        onChange={(e) => {
                                            setValues([
                                                ...values.slice(0, i),
                                                { ...v, withholding: Boolean(e.target.value) },
                                                ...values.slice(i + 1),
                                            ])
                                        }}
                                    >源泉徴収</CheckBox>
                                ),
                            },
                            {
                                value: (
                                    <Amount>
                                        {formatNumberWithCommas(getValueAmount(v))}
                                    </Amount>
                                ),
                            },
                            {
                                value: (
                                    <IconOnlyButton 
                                        ml={0.5}
                                        small={true}
                                        label={`${i + 1}行目の削除`}
                                        IconComponent={MdDelete}
                                        onClick={async () => {
                                            const response = v.id && await deleteStatement(v.id)
                                            if((response as AxiosResponse)?.status === 200) {
                                                setValues([
                                                    ...values.slice(0, i),
                                                    ...values.slice(i + 1, values.length)
                                                ])
                                            }
                                        }}
                                    />
                                ),
                            },
                    ],
            }))}
        />
                {/* <Button
                IconComponent={MdAdd}
                iconPosition='left'
                onClick={() =>
                    setValues([
                    ...values,
                    { date: '2021-04-01', amount: 0, type: 'income', note: '' },
                    ])
                }
                // ListTableと左端を揃えるため、左側に1.5remのマージンを持たせている。
                // 通常の使用では、ListTableの側に-1.5remのネガティブマージンを付けることも多いはず
                ml={1.5}
                >
                行を追加
                </Button> */}
        </Container>
    )
}

export default ListForm