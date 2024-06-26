import styled from 'styled-components'
import { TextButton } from '../CommonStyle'

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
`

const DropdownToggle = styled.button`
    display: flex;

    -webkit-box-align: center;
    align-items: center;

    justify-content: center;
    
    cursor: pointer;
    padding: 0.2rem 1rem ;
    height: 2.2rem ;
    background-color: #ffffff;
    border: var(--primary-border);
    border-radius: 0.5rem ;

    font-weight: 600;

    font-family: "Noto Sans JP", sans-serif ;

    &:hover {
        color: var(--button-hover-color);
        background-color: var(--primary-button-hover-bg);
        border-color: var(--button-hover-color);
    }
`

const DropdownToggleText = styled.span`
    font-size: 1rem;
    line-height: 0.5rem;
`

const DropdownMenu = styled.div<{
    options: number
}>`
    position: absolute;
    border: var(--primary-border);
    width: 15rem;
    z-index: 2000;
    display: flex;
    flex-direction: column;

    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.2);
    
    padding: 1.2rem 0.8rem;
    
    background-color: var(--white);
    border-radius: 1rem;

    min-height: ${props => props.options ? '30rem' : '4rem'};
    overflow-x: auto;
    overflow-y: auto;
`

const DropdownInput = styled.input<{
    options: number
}>`
    padding: 0.6rem 0.6rem 0.6rem ${props => props.options ? '2.4rem' : '0.6rem'};
    border: var(--primary-border);
    width: 100%;
    box-sizing: border-box;
    border-radius: 0.5rem;

    font-size: 1rem;
    margin-bottom: 0.5rem;
`

const DropdownItem = styled.div`
    padding: 0.4rem 0.4rem;
    cursor: pointer;

    font-size: 0.9rem;

    &:hover {
        background-color: var(--primary-menu-item-bg);
    }
`

const Icon = styled.span`
    display: inline-block;
    position: absolute;
    left: 1.5rem;
    top: 2.6rem;
    transform: translateY(-50%);
    pointer-events: none;
    color: #ccc;
`

const FilterOptionArea = styled.div`
    display: flex;
`

const FilterOptionControllerButton = styled(TextButton)`
    &:not(:last-child) {
        margin-right: 0.5rem;
    }

    padding: 0.7rem 0.5rem;

    &:hover {
        color: var(--primary-button-hover-color);
        background-color: var(--primary-button-hover-bg);
    }
`

export {
    DropdownContainer,
    DropdownToggle,
    DropdownToggleText,
    DropdownMenu,
    DropdownInput,
    DropdownItem,
    Icon,
    FilterOptionArea,
    FilterOptionControllerButton
}