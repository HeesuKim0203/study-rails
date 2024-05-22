import styled from 'styled-components'

const TextButton = styled.span`
    display: flex;
    font-size: 1rem;
    font-weight: 600;
    line-height: 0.5rem;

    justify-content: center;
    align-items: center;

    cursor: pointer;

    border-radius: 0.5rem;
`

const FontArea = styled.span`
    font-family: "Noto Sans JP", sans-serif;
`

const SubTitle = styled.h3`
    color: #6f6b62;
    font-size: 1rem;
    font-weight: 500;
`

export {
    TextButton,
    FontArea,
    SubTitle
}