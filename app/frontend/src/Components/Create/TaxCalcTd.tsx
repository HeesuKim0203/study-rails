import React from 'react'
import { TdTaxCalcName, TdTaxCalcResult, Tr } from './CreateStyle'
import { formatNumberWithCommas, getTax } from '../../utils/util'

interface TaxCalcTdProps {
    name: string
    tax: number
    targetAmount: number
}

const TaxCalcTd = ({
    name,
    tax,
    targetAmount,
}: TaxCalcTdProps) => {
    return (
        <>
            <Tr>
                <TdTaxCalcName></TdTaxCalcName>
                <TdTaxCalcResult>{`${name}対象`}&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(targetAmount)}</TdTaxCalcResult>
            </Tr>
            <Tr>
                <TdTaxCalcName></TdTaxCalcName>
                <TdTaxCalcResult>消費税&nbsp;&nbsp;&nbsp;{formatNumberWithCommas(tax)}</TdTaxCalcResult>
            </Tr>
        </>
    )
}

export default TaxCalcTd