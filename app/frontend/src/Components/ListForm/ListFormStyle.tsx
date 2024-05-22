import styled from 'styled-components'

const Container = styled.div`
    .vb-tableListCell {
        padding: .25rem .25rem ;
    }

    .vb-tableListHeadCell {
        padding: .25rem .25rem ;
    }
`

const Summary = styled.div`
    display: flex;
    justify-content: space-between;

    -webkit-box-align: center;
    align-items: center;

    font-size: 1rem;
`

const Index = styled.span`
    display: block;
    text-align: left;

    margin-right: 0.3rem;
`

const TableHeader = styled.div`
    width: 45rem;
    padding: 0.25rem;
    white-space: nowrap;
`

const Amount = styled.span`
    display: inline-block;
    text-align: right;

    width: 8rem;
`

export {
    Container,
    Summary,
    Index, 
    TableHeader,
    Amount,
}