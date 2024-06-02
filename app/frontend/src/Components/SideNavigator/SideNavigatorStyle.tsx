import styled from 'styled-components'

const Container = styled.nav`
    display: flex;
    align-self: stretch;

    user-select: none;
`

const Wrapper = styled.div<{
    iconmenu: number
}>`
    width: ${props => (props.iconmenu ? '3.8rem' : '13rem')} ;
    transition: width 0.1s ease 0s;

    box-sizing: border-box;
    border-right: var(--primary-border);
    word-break: break-all;
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;

    span {
        display: ${props => (props.iconmenu ? 'none' : 'inline-block')};
    }

    ul {
        width: ${props => (props.iconmenu ? '3.8rem' : '13rem')} ;
    }
`

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
`

const IconArea = styled.div`
    display: flex;

    -webkit-box-align: center;
    align-items: center;

    margin: 0.5rem;
    padding: 0.4rem 0.5rem; 
    cursor: pointer;

    border-radius: 0.5rem;

    &:hover {
        color: var(--button-hover-color);
        background-color: var(--primary-button-hover-bg);
    }
`

const Menu = styled.ul`
    width: 13rem ;
    overflow: hidden ;
`

const MenuItem = styled.li<{
    selected: boolean
}>`
    display: flex;
    -webkit-box-align: center;
    align-items: center;

    width: 100%;
    height: 2.5rem ;
    
    padding : 0.1rem 0.8rem;
    margin: 0.3rem 0;
    font-size : 1rem;
    ${props => (
        props.selected ? `
            border-left: 5px solid var(--primary-button-hover-color);
            color: var(--home-sideBar-hover-color);
        ` : ` 
            border-left: 5px solid rgba(0, 0, 0, 0);
        `)}

    cursor: pointer;

    &:hover {
        background-color: var(--primary-menu-item-bg);
    }
`

const MenuText = styled.span`
    display: block;
    padding-left: 0.6rem; 
`

export {
    Container,
    Wrapper,
    Header,
    IconArea,
    Menu,
    MenuItem,
    MenuText
}