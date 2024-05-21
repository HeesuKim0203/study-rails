import styled from 'styled-components'

const Container = styled.nav`
    display: flex;
    align-self: stretch;

    user-select: none;
`

const Wrapper = styled.div<{
    iconMenu: boolean
}>`
    width: ${props => (props.iconMenu ? '3.5rem' : '13rem')} ;
    transition: width 0.1s ease 0s;

    box-sizing: border-box;
    border-right: 1px solid rgb(233, 231, 231);
    word-break: break-all;
    overflow-y: auto;
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;

    span {
        display: ${props => (props.iconMenu ? 'none' : 'inline-block')};
    }
`

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
`

const Icon = styled.div`
    padding: 1rem; 
    cursor: pointer;
`

const Menu = styled.ul`
    width : 13rem
`

const MenuItem = styled.li<{
    seleted: boolean
}>`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    
    padding : 0.4rem 0.8rem;
    margin: 1rem 0;
    font-size : 1rem;
    ${props => (
        props.seleted ? `
            border-left: 5px solid rgb(40, 100, 240);
            color: rgb(40, 90, 200);
        ` : ` 
            border-left: 5px solid rgba(0, 0, 0, 0);
        `)}

`

const MenuText = styled.span`

    padding-left: 0.6rem; 
`

export {
    Container,
    Wrapper,
    Header,
    Icon,
    Menu,
    MenuItem,
    MenuText
}