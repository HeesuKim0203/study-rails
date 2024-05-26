import styled from 'styled-components'

const Container = styled.nav`
    display: flex;
    align-self: stretch;

    user-select: none;
`

const Wrapper = styled.div<{
    iconMenu: boolean
}>`
    width: ${props => (props.iconMenu ? '3.8rem' : '13rem')} ;
    transition: width 0.1s ease 0s;

    box-sizing: border-box;
    border-right: 1px solid rgb(233, 231, 231);
    word-break: break-all;
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;

    span {
        display: ${props => (props.iconMenu ? 'none' : 'inline-block')};
    }

    ul {
        width: ${props => (props.iconMenu ? '3.8rem' : '13rem')} ;
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
        color: #1e46aa;
        background-color: #dce8ff;
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
            border-left: 5px solid rgb(40, 100, 240);
            color: rgb(40, 90, 200);
        ` : ` 
            border-left: 5px solid rgba(0, 0, 0, 0);
        `)}

    cursor: pointer;

    &:hover {
        background-color: rgb(247, 245, 245);
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