import styled from 'styled-components'

const Container = styled.div<{
    display: number
}>`

    position: fixed;

    display: ${(props) => props.display ? 'flex' : 'none'};

    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    top: 0;
    left: 0;

    z-index: 499;

`

const ModalHeader = styled.div`

    border-bottom : 1px solid #eeeeee;
`

const ModalTitle = styled.h4`
    font-size: 2rem;
    font-weight: 600;
    
    padding: 0 0 1rem 0;

`

const ModalContent = styled.div`
    display: flex;
    border-bottom : 1px solid #eeeeee;

    flex-direction: column;
    align-items: start;

    padding: 1.5rem 0;
`

const ModalFooter = styled.div`
    
    padding: 1rem 0 0 0;
`

export {
    Container,
    ModalHeader,
    ModalTitle,
    ModalContent,
    ModalFooter,
}