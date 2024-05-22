import styled from 'styled-components'
import { TextButton } from '../CommonStyle'

const Container = styled.div`
    
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

const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const SectionRowDiv = styled.div`
     width: 100%;
     display: flex;
`

const Section = styled.section`
    flex: 0 0 50%;
    scroll-margin: 20em;
    margin-top: 0rem;
    overflow: hidden;
`

const SectionTitle = styled.h4`
    font-size: 1.2rem;
    font-weight: 600;

    margin-bottom: 1rem;
`

const SectionArea = styled.div`
    outline: none;
    padding: 1rem 0px;
    margin: 0px 0rem 0px 1.5rem;
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

const SectionUserInformationUpdateText = styled.span`
    display: block;
    margin-left: 0.3rem;
`

const Table = styled.table`
    border-collapse: separate;
	border-spacing: 0 1rem;
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

export {
    Container,
    Wrapper,
    Header,
    Title,
    BackHomeButtonArea,
    BackHomeButton,
    Main,
    SectionRowDiv,
    Section,
    SectionArea,
    SectionTitle,
    SectionUserInformationUpdate,
    SectionUserInformationUpdateText,
    Table,
    Tr,
    TdName,
    TdData
}