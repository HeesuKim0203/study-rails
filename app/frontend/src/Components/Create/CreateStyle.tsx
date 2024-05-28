import styled from 'styled-components'
import { TextButton } from '../CommonStyle'
import { Link } from 'react-router-dom'

const Container = styled.div`
    overflow-y: auto;
`

const Wrapper = styled.div`
`

const Header = styled.div`
    display: block;
    width: 100%;

    border-bottom: 1px solid rgb(233, 231, 231);

    padding: 1.5rem;
`

const Title = styled.h2`
    font-size: 1.6rem;
    flex: 1;

    font-weight: 600;
`

const BackHomeButtonArea = styled.div`
    margin-bottom: 1.2rem;
`

const BackHomeButton = styled(TextButton)`

    width: 8rem;
    height: 2.5rem;

    &:hover {
        color: #1e46aa;
        background-color: #dce8ff;
    }
`

const TitleLink = styled(Link)`
    display: inline-block;
`

const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const SectionRow = styled.div`
    width: 100%;
    display: flex;
`

const SectionRowBlock = styled.div`
    width: 100%;
`

const Section = styled.section`
    flex: 0 0 50%;
    scroll-margin: 20em;
    margin-top: 0rem;
    overflow: hidden;
`

const SectionTitle = styled.h4`
    font-size: 1.2rem;
    font-weight: 500;

    margin-bottom: 1rem;

    width: 100%;
`

const SectionArea = styled.div`
    outline: none;
    padding: 1rem 0;
    margin: 0 0 0 1.5rem;
    border-bottom: 1px solid rgb(233, 231, 231);
`

const SectionUserInformationUpdate = styled(TextButton)`

    width: 5rem;
    height: 2.5rem;

    margin-left: 1rem;

    &:hover {
        color: #1e46aa;
        background-color: #dce8ff;
    }

`

const SectionAreaMarginRight = styled(SectionArea)`
    margin: 0 1.5rem 0 1.5rem;
`

const SectionUserInformationUpdateText = styled.span`
    display: block;
    margin-left: 0.3rem;
`

const Table = styled.table`
    border-collapse: separate;
	border-spacing: 0 1rem;

    font-size: 0.8rem;
`

const Tr = styled.tr`
`

const TdName = styled.td`
    text-align: left;
    width: 6rem;
`
const TdData = styled.td`
    text-align: left;
    width: 10rem;
`

const TableCalcResult = styled.table`
    font-size: 0.8rem;

    font-weight: 300;
`

const TdCalcName = styled.td`
    text-align: left;
    width: 6rem;
    font-size: 0.9rem;
`

const TdCalcResult = styled.td`
    text-align: right;
    width: 10rem;
    font-size: 0.8rem;
`

const TdTaxCalcName = styled.td`
    text-align: left;
    width: 2rem;
    font-size: 0.9rem;
`

const TdTaxCalcResult = styled.td`
    text-align: right;
    width: 14rem;
    font-size: 0.8rem;
`

const CalcResultContainer = styled.div`
    width: 100%;
    display: flex;
    
    justify-content: end;

`

const CalcResultArea = styled.div`
    display: flex;
    width: 20rem;
    
    flex-direction: column;
    align-items: end;

    margin-top: 2rem;
`

const Footer = styled.div`
    width: 100%;
    height: 4.3rem;
`

const SubmitFiexd = styled.div`
    border-top: 1px solid rgb(233, 231, 231);
    background: rgb(255, 255, 255);
    z-index: 999;
    position: fixed;
    padding: 1rem 1.5rem;
    bottom: 0;
    height: 4.3rem;
    width: 100%;
`

export {
    Container,
    Wrapper,
    Header,
    Title,
    BackHomeButtonArea,
    BackHomeButton,
    TitleLink,
    Main,
    SectionRow,
    SectionRowBlock,
    Section,
    SectionArea,
    SectionTitle,
    SectionUserInformationUpdate,
    SectionUserInformationUpdateText,
    Table,
    TableCalcResult,
    Tr,
    TdName,
    TdData,
    TdCalcName,
    TdCalcResult,
    TdTaxCalcName,
    TdTaxCalcResult,
    SectionAreaMarginRight,
    CalcResultContainer,
    CalcResultArea,
    Footer,
    SubmitFiexd
}