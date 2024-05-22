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
} from './CreateStyle'
import { Link } from 'react-router-dom'
import { DEFAULT_DATA, FOREIGN_TAX, HOME_URL, ICON_SIZE, TAX_OPTION, TAX_RESULT_OPTION } from '../../utils/constants'
import { FaPen } from 'react-icons/fa'
import Icon from '../Icon'
import { FontMedium, SubTitle } from '../CommonStyle'
import ListForm from '../ListForm'
import { ListFromType } from '../../utils/type'
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

    const [calculatingTaxes, setCalculatingTaxes] = useState('外税') // false : 内税 true : 外税

    const onChange = (
        event: ChangeEvent<HTMLInputElement>, 
        setState: React.Dispatch<React.SetStateAction<string>>
    ) => setState(event.target.value)

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
                                        fieldId='submit_invoice_customer_information'
                                        required
                                    >
                                        <TextField
                                            name='取引先'
                                            id='submit_invoice_customer_information'
                                            error={error}
                                            value={''}
                                            onChange={(e) => {}}
                                        />
                                        <SelectBox
                                            ml={1}
                                            width='small'
                                            id='submit_invoice_customer_information'
                                            options={[
                                                { name: '御中' },
                                                { name: '様' },
                                                { name: '(空白)' },
                                            ]}
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
                                            fieldId='submit_invoice_billing_information'
                                        >
                                            <TextField
                                                name='請求書番号'
                                                value='保存時に決定します'
                                                id='submit_invoice_billing_information'
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
                                                振込
                                            </RadioButton>
                                            <RadioButton
                                                name='入金方法'
                                            >
                                                振替
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
                                            small={true}
                                            width='xSmall'
                                            options={TAX_RESULT_OPTION}
                                            onChange={(e) => setCalculatingTaxes(e.target.value)}
                                        />
                                        <ColumnBase>
                                            <TableCalcResult>
                                                <Tr>
                                                    <TdCalcName>小計</TdCalcName>
                                                    <TdCalcResult>
                                                        { calculatingTaxes === FOREIGN_TAX 
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
                                                                                calculatingTaxes === FOREIGN_TAX 
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
                                                            { calculatingTaxes === FOREIGN_TAX 
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
                    </Main>
                </Wrapper>
            </Container>
      </>
    )
  }

export default Create