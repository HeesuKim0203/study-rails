import React, { ChangeEvent, useEffect, useState } from 'react'
import {
    DateInput,
    FormControl,
    FormControlGroup,
    MessageBlock,
    SelectBox,
    TextField,
    RadioButton,
    ColumnBase,
    Stack,
    TextArea,
    Loading,
    FloatingMessageBlock,
    Button,
    FormActions,
} from '@freee_jp/vibes'
import {
    Container,
    Wrapper,
    Header,
    Title,
    BackHomeButtonArea,
    BackHomeButton,
    Main,
    SectionRow,
    Section,
    SectionArea,
    SectionTitle,
    SectionUserInformationUpdate,
    SectionUserInformationUpdateText,
    Table,
    Tr,
    TdName,
    TdData,
    SectionRowBlock,
    SectionAreaMarginRight,
    CalcResultContainer,
    CalcResultArea,
    TdCalcResult,
    TableCalcResult,
    TdCalcName,
    SubmitFiexd,
    Footer,
} from './CreateStyle'
import { Link } from 'react-router-dom'
import { DEFAULT_BILL, DEFAULT_DATA, HOME_URL, ICON_SIZE, METHOD_OF_DEPOSIT, METHOD_OF_TAX, TAX_OPTION, TAX_RESULT_OPTION } from '../../utils/constants'
import { FaPen } from 'react-icons/fa'
import Icon from '../Icon'
import { FontMedium, SubTitle } from '../CommonStyle'
import ListForm from '../ListForm'
import { Bill, BillValueUnionType, ListFromType, MethodOfTaxType } from '../../utils/type'
import { extractNumber, formatNumberWithCommas, getTax, getValueAmount } from '../../utils/util'
import TaxCalcTd from './TaxCalcTd'

const Create = () => {
    const [message, setMessage] = useState('')
    const [sending, setSending] = useState(false)
    const [error, setError] = useState(false)

    const [title, setTitle] = useState('')
    const [userName, setUserName] = useState('')

    const [values, setValues] = useState<ListFromType[]>([DEFAULT_DATA])
    const [taxResult, setTaxResult] = useState(0)
    const [amount, setAmount] = useState(0)

    const [calculatingTaxes, setCalculatingTaxes] = useState<MethodOfTaxType>(METHOD_OF_TAX.FOREIGN)
    const [bill, setBill] = useState<Bill>(DEFAULT_BILL)

    const onChange = (
        value: BillValueUnionType,
        key: keyof Bill
    ) => {
        setBill({
            ...bill,
            [key] : value
        })
    }

    useEffect(() => {
        const taxResult = TAX_OPTION.reduce((prev, { name }) => {
            const tax = extractNumber(name)
            const amount = values.filter((value) => value.tax === name).reduce((prev, value) => {
                return prev + value.count * value.price 
            }, 0)
            return prev + getTax(amount, tax, calculatingTaxes) 
        }, 0)

        const amount = values.reduce((prev, value) => {
            return prev + value.count * value.price
        }, 0)

        setTaxResult(taxResult)
        setAmount(amount)

    }, [values, calculatingTaxes])

    return (
      <>
        {message && <MessageBlock error={error} success={!error} mb={1} message={message} />}
            <Container>
                <Wrapper>
                    <Header>
                        <BackHomeButtonArea>
                            <Link to={HOME_URL}>
                                <BackHomeButton>
                                    ⇐ 一覧に戻る
                                </BackHomeButton>
                            </Link>
                        </BackHomeButtonArea>
                        <Title>請求書作成</Title>
                    </Header>
                    <Main>
                        <SectionRow>
                            <Section>
                                <SectionArea>
                                    <SectionTitle>取引先情報</SectionTitle>
                                    <FormControl
                                        mb={1}
                                        mr={1}
                                        label='取引先'
                                        fieldId='submit_invoice_customer_name'
                                        required
                                    >
                                        <TextField
                                            name='取引先'
                                            id='submit_invoice_customer_name'
                                            error={error}
                                            value={bill.businessPartner}
                                            //onChange={(e) => (onChange(e.target.value, ))}
                                        />
                                        <SelectBox
                                            ml={1}
                                            width='small'
                                            id='submit_invoice_customer_name'
                                            options={[
                                                { name: '御中' },
                                                { name: '様' },
                                                { name: '(空白)', value: '' },
                                            ]}
                                            onChange={(e) => (onChange(e.target.value, 'tailStr'))}
                                        />
                                    </FormControl>
                                </SectionArea>
                                <SectionArea>
                                    <SectionTitle>請求情報</SectionTitle>
                                    <FormControlGroup>
                                        <FormControl
                                            mb={1}
                                            mr={1}
                                            label='請求書番号'
                                            fieldId='submit_invoice_id'
                                        >
                                            <TextField
                                                name='請求書番号'
                                                value='保存時に決定します'
                                                id='submit_invoice_id'
                                                onChange={(e) => {}}
                                                borderless
                                            />
                                        </FormControl>
                                        <FormControl
                                            mb={1}
                                            mr={1}
                                            label='枝番'
                                            fieldId='submit_invoice_branch_number'
                                        >
                                            <TextField
                                                name='枝番'
                                                error={error}
                                                value={''}
                                                onChange={(e) => {}}
                                                width='xSmall'
                                                id='submit_invoice_branch_number'
                                            />
                                        </FormControl>
                                    </FormControlGroup>
                                    <FormControlGroup>
                                        <FormControl 
                                            label='請求日' 
                                            mr={1} 
                                            mb={1}
                                            required
                                            fieldId='submit_invoice_date'
                                        >
                                            <DateInput name='請求日' id='submit_invoice_date' />
                                        </FormControl>
                                        <FormControl 
                                            mb={1} 
                                            mr={1} 
                                            label='入金方法'
                                            fieldId='submit_invoice_method_of_deposit'
                                        >
                                            <RadioButton
                                                name='入金方法'
                                            >
                                                {METHOD_OF_DEPOSIT.BANK_TRANSFER}
                                            </RadioButton>
                                            <RadioButton
                                                name='入金方法'
                                            >
                                                {METHOD_OF_DEPOSIT.TRANSFER}
                                            </RadioButton>
                                        </FormControl>
                                        <FormControl
                                            mb={1}
                                            mr={1}
                                            label='入金期日'
                                            fieldId='submit_invoice_date_of_deposit'
                                        >
                                            <DateInput
                                                name='入金期日'
                                                id='submit_invoice_date_of_deposit'
                                                onChange={(e) => {}}
                                            />
                                        </FormControl>
                                    </FormControlGroup>
                                        <FormControlGroup>
                                            <FormControl 
                                                label='件名' 
                                                mr={1} 
                                                mb={1}
                                                fieldId='submit_invoice_name'
                                            >
                                                <TextField
                                                    name='件名'
                                                    error={error}
                                                    value={''}
                                                    width='large'
                                                    onChange={(e) => {}}
                                                    id='submit_invoice_name'
                                                />
                                            </FormControl>
                                    </FormControlGroup>
                                </SectionArea>
                            </Section>
                            <Section>
                                <SectionAreaMarginRight>
                                    <SectionTitle>自社情報</SectionTitle>
                                    <FormControlGroup>
                                        <FormControl 
                                            label='自社担当者' 
                                            mr={1} 
                                            mb={1}
                                            fieldId='submit_invoice_representative'
                                        >
                                            <TextField
                                                name='自社担当者'
                                                error={error}
                                                value={''}
                                                width='large'
                                                onChange={(e) => {}}
                                                id='submit_invoice_representative'
                                            />
                                        </FormControl>
                                    </FormControlGroup>
                                    <ColumnBase>
                                        <Stack
                                            direction='horizontal'
                                        >
                                            <SubTitle>帳票の表示</SubTitle>
                                            <SectionUserInformationUpdate>
                                                <Icon size={ICON_SIZE.SMALL} IconComponent={FaPen} />
                                                <SectionUserInformationUpdateText>編集</SectionUserInformationUpdateText>
                                            </SectionUserInformationUpdate>
                                        </Stack>
                                        <Table>
                                            {/* Server Data */}
                                            <Tr>
                                                <TdName>自社名</TdName>
                                                <TdData>事業所名(未設定)</TdData>
                                            </Tr>
                                            <Tr>
                                                <TdName>登録番号</TdName>
                                                <TdData>未設定</TdData>
                                            </Tr>
                                            <Tr>
                                                <TdName>自社情報</TdName>
                                                <TdData>未設定</TdData>
                                            </Tr>
                                            <Tr>
                                                <TdName>振込先</TdName>
                                                <TdData>未設定</TdData>
                                            </Tr>
                                        </Table>
                                    </ColumnBase>
                                </SectionAreaMarginRight>
                            </Section>
                        </SectionRow>
                        <SectionRowBlock>
                            <SectionAreaMarginRight>
                                <SectionTitle>明細</SectionTitle>
                                <ListForm 
                                    values={values}
                                    setValues={setValues}
                                />
                                <CalcResultContainer>
                                    <CalcResultArea>
                                        <SelectBox
                                            mb={1}
                                            small={true}
                                            width='xSmall'
                                            options={TAX_RESULT_OPTION}
                                            onChange={(e) => setCalculatingTaxes((e.target.value as MethodOfTaxType))}
                                        />
                                        <ColumnBase>
                                            <TableCalcResult>
                                                <Tr>
                                                    <TdCalcName>小計</TdCalcName>
                                                    <TdCalcResult>
                                                        { calculatingTaxes === METHOD_OF_TAX.FOREIGN 
                                                            ? formatNumberWithCommas(amount) 
                                                            : formatNumberWithCommas(amount - taxResult)
                                                        }
                                                    </TdCalcResult>
                                                </Tr>
                                                <Tr>
                                                    <TdCalcName>消費税</TdCalcName>
                                                    <TdCalcResult>{formatNumberWithCommas(taxResult)}</TdCalcResult>
                                                </Tr>
                                                    {
                                                        TAX_OPTION.map(({name}) => {
                                                            const tax = extractNumber(name)
                                                            const amount = values.filter((value) => value.tax === name).reduce((prev, value) => {
                                                                return prev + value.count * value.price
                                                            }, 0)

                                                            const taxResult = getTax(amount, tax, calculatingTaxes)

                                                            return (
                                                                <>
                                                                    { amount ? 
                                                                        <TaxCalcTd
                                                                            name={name}
                                                                            tax={taxResult}
                                                                            targetAmount={
                                                                                calculatingTaxes === METHOD_OF_TAX.FOREIGN  
                                                                                ? amount 
                                                                                : amount - taxResult
                                                                            }
                                                                        /> : <></>
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }
                                                <Tr>
                                                    <TdCalcName>
                                                        <FontMedium>合計</FontMedium>
                                                    </TdCalcName>
                                                    <TdCalcResult>
                                                        <FontMedium>
                                                            { calculatingTaxes === METHOD_OF_TAX.FOREIGN  
                                                                ? formatNumberWithCommas(amount + taxResult) 
                                                                : formatNumberWithCommas(amount)
                                                            }
                                                        </FontMedium>
                                                    </TdCalcResult>
                                                </Tr>
                                            </TableCalcResult>
                                        </ColumnBase>
                                    </CalcResultArea>
                                </CalcResultContainer>
                            </SectionAreaMarginRight>
                        </SectionRowBlock>
                        <SectionRowBlock>
                            <SectionAreaMarginRight>
                                <SectionTitle>備考</SectionTitle>
                                <FormControl 
                                    mr={1} 
                                    mb={1}
                                    fieldId='submit_invoice_description'
                                >
                                    <TextArea
                                        error={error}
                                        value={''}
                                        width='full'
                                        onChange={(e) => {}}
                                        id='submit_invoice_description'
                                    />
                                </FormControl>
                            </SectionAreaMarginRight>
                        </SectionRowBlock>
                        <SectionRowBlock>
                            <SectionAreaMarginRight>
                                <SectionTitle>社内メモ</SectionTitle>
                                <FormControl 
                                    mr={1} 
                                    mb={1}
                                    fieldId='submit_invoice_memo'
                                >
                                    <TextArea
                                        error={error}
                                        value={''}
                                        width='full'
                                        onChange={(e) => {}}
                                        id='submit_invoice_memo'
                                    />
                                </FormControl>
                            </SectionAreaMarginRight>
                        </SectionRowBlock>
                    </Main>
                    <SubmitFiexd>
                        <FormActions>
                            <Button
                                appearance='primary'
                                disabled={sending}
                                onClick={() => {
                                    setMessage('')
                                    setSending(true)
                                    setTimeout(() => {
                                    setMessage('保存しました')
                                    setSending(false)
                                    }, 600)
                                }}
                            >
                                保存
                            </Button>
                            <Button disabled={sending}>キャンセル</Button>
                        </FormActions>
                        <Loading coverAll isLoading={sending} />
                    </SubmitFiexd>
                    <Footer />
                </Wrapper>
                <Loading coverAll isLoading={sending} />
                {message && <FloatingMessageBlock success message={message} />}
            </Container>
      </>
    )
}

export default Create