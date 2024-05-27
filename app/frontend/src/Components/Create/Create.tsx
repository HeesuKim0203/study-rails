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
    Message,
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
import { BILL_KEY, DEFAULT_BILL, DEFAULT_DATA, HOME_URL, ICON_SIZE, METHOD_OF_DEPOSIT, METHOD_OF_TAX, TAX_OPTION, TAX_RESULT_OPTION, today } from '../../utils/constants'
import { FaPen } from 'react-icons/fa'
import Icon from '../Icon'
import { FontMedium, SubTitle } from '../CommonStyle'
import ListForm from '../ListForm'
import { Bill, BillValueUnionType, ListFromType, MethodOfTaxType } from '../../utils/type'
import { extractNumber, formatNumberWithCommas, getAmount, getTax, getTaxAmount, getValueAmount } from '../../utils/util'
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
        onChange(values, BILL_KEY.PARTICULARS)
    }, [values])

    useEffect(() => {
        setTaxResult(getTaxAmount(values, calculatingTaxes))
        setAmount(getAmount(values))
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
                                            value={bill[BILL_KEY.BUSINESS_PARTNER]}
                                            onChange={(e) => (onChange(e.target.value, BILL_KEY.BUSINESS_PARTNER))}
                                        />
                                        <SelectBox
                                            ml={1}
                                            width='small'
                                            id='submit_invoice_customer_name'
                                            value={bill[BILL_KEY.TAIL_STR]}
                                            options={[
                                                { name: '御中' },
                                                { name: '様' },
                                                { name: '(空白)', value: '' },
                                            ]}
                                            onChange={(e) => (onChange(e.target.value, BILL_KEY.TAIL_STR))}
                                        />
                                        {error && (
                                            <Message ml={1} error>
                                                取引先を入力してください。
                                            </Message>
                                        )}
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
                                                value={bill[BILL_KEY.BRANCH_NUMBER]}
                                                onChange={(e) => (onChange(e.target.value, BILL_KEY.BRANCH_NUMBER))}
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
                                            <DateInput 
                                                name='請求日' 
                                                id='submit_invoice_date' 
                                                value={bill[BILL_KEY.INVOICE_DATE]}
                                                onChange={(e) => (onChange(new Date(e), BILL_KEY.INVOICE_DATE))}
                                            />
                                        </FormControl>
                                        <FormControl 
                                            mb={1} 
                                            mr={1} 
                                            label='入金方法'
                                            fieldId='submit_invoice_method_of_deposit'
                                            
                                        >
                                            <RadioButton
                                                value={METHOD_OF_DEPOSIT.BANK_TRANSFER}
                                                checked={bill[BILL_KEY.METHOD_OF_DEPOSIT] === METHOD_OF_DEPOSIT.BANK_TRANSFER}
                                                onChange={(e) => { 
                                                    onChange(e.target.value, BILL_KEY.METHOD_OF_DEPOSIT)
                                                    bill[BILL_KEY.TRANSFER_DATE]=undefined
                                                }}
                                                name='入金方法'
                                            >
                                                {METHOD_OF_DEPOSIT.BANK_TRANSFER}
                                            </RadioButton>
                                            <RadioButton
                                                value={METHOD_OF_DEPOSIT.TRANSFER}
                                                checked={bill[BILL_KEY.METHOD_OF_DEPOSIT] === METHOD_OF_DEPOSIT.TRANSFER}
                                                onChange={(e) => {
                                                    onChange(e.target.value, BILL_KEY.METHOD_OF_DEPOSIT)
                                                    bill[BILL_KEY.DEPOSIT_DATE]=undefined
                                                }}
                                                name='入金方法'
                                            >
                                                {METHOD_OF_DEPOSIT.TRANSFER}
                                            </RadioButton>
                                        </FormControl>
                                        <FormControl
                                            mb={1}
                                            mr={1}
                                            label={bill[BILL_KEY.METHOD_OF_DEPOSIT] === METHOD_OF_DEPOSIT.BANK_TRANSFER ? '入金期日' : '振替日'}
                                            fieldId={bill[BILL_KEY.METHOD_OF_DEPOSIT] === METHOD_OF_DEPOSIT.BANK_TRANSFER ? 'submit_invoice_date_of_deposit' : 'submit_invoice_transfer_of_deposit'}
                                        >
                                            { bill[BILL_KEY.METHOD_OF_DEPOSIT] === METHOD_OF_DEPOSIT.BANK_TRANSFER ? 
                                                <DateInput
                                                    name={'入金期日'}
                                                    id='submit_invoice_date_of_deposit'
                                                    value={bill[BILL_KEY.DEPOSIT_DATE]}
                                                    onChange={(e) => (onChange(new Date(e), BILL_KEY.DEPOSIT_DATE))}
                                                /> : 
                                                <DateInput
                                                    name={'振替日'}
                                                    id='submit_invoice_transfer_of_deposit'
                                                    value={bill[BILL_KEY.TRANSFER_DATE]}
                                                    onChange={(e) => (onChange(new Date(e), BILL_KEY.TRANSFER_DATE))}
                                                /> 
                                            }
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
                                                    value={bill.title}
                                                    width='large'
                                                    onChange={(e) => (onChange(e.target.value, BILL_KEY.TITLE))}
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
                                                value={bill.representative}
                                                width='large'
                                                onChange={(e) => (onChange(e.target.value, BILL_KEY.REPRESENTATIVE))}
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
                                    // Bill particulars
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
                                        value={bill.remarks}
                                        width='full'
                                        onChange={(e) => (onChange(e.target.value, BILL_KEY.REMARKS))}
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
                                        value={bill.memo}
                                        width='full'
                                        onChange={(e) => (onChange(e.target.value, BILL_KEY.MEMO))}
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
                                    if(bill[BILL_KEY.BUSINESS_PARTNER] && bill[BILL_KEY.INVOICE_DATE]) {
                                        setError(false)
                                        setMessage('保存しました')
                                    }else {                               
                                        setError(true)
                                        setMessage(
                                            '入力内容にエラーがあります。修正のうえ、再度お試しください'
                                        )
                                    }
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
                {message && <FloatingMessageBlock error={error} success={!error} message={message} />}
            </Container>
      </>
    )
}

export default Create