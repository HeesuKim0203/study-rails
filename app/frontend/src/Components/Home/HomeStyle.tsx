import styled from 'styled-components'
import { FontArea, TextButton } from '../CommonStyle'

const Container = styled.div`

    .vb-listTable {
        overflow-x: auto;
    }

    @media screen and (max-width: 1086px) {
        width: calc(850px + var(--home-sideBar-width));
        overflow-x: scroll;
    }
`

const Wrapper = styled.div`
    width: 100%;
`

const Header = styled.div`
    display: flex;
    width: 100%;
    -webkit-box-align: center;
    align-items: center;

    border-bottom: var(--primary-border);

    padding: 1.5rem;
`

const Title = styled.h2`
    font-size: 1.6rem;
    flex: 1;

    font-weight: 600;
`

const ContentWrapper = styled.div`
    display: flex;
`

const Content = styled.div`
    display: block;

    flex: 1 1 0% ;

    width: calc(100% - var(--home-sideBar-width));
`

const ContentSideMenu = styled.div<{
    display: number
}>`
    display: block;
    min-height: calc(-8.56rem + 100vh);
    
    overflow-x: hidden;

    box-sizing: border-box;

    border-right: ${props => props.display ? 'var(--primary-border)' : 'none'};
    width: ${props => props.display ? 'var(--home-sideBar-width)' : '0rem'};
    transition: width 0.1s ease 0s;
    word-break: break-all;
`

const ContentSideMenuHeader = styled.div`
    display: flex;
    width: var(--home-sideBar-width);

    -webkit-box-align: center;
    align-items: center;

    margin-top: 1.5rem;
    margin-bottom: 0.8rem
`

const ContentSideMenuTitle = styled.h3`
    color: #6f6b62;
    font-size: 1rem;
    font-weight: 500;
    padding-left: 1rem;
`

const ContentSideMenuTitleIcon = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;

    margin-left: 0.5rem;
`

const ContentSideMenuItemWrapper = styled.ul`
    width: var(--home-sideBar-width);
`

const ContentSideMenuItem = styled.li<{
    selected: boolean
    display: number
}>`
    display: flex;
    font-size: 0.8rem;

    width: 100%;
    
    padding: 0.3rem 0.8rem;
    margin: 0.4rem 0;
    
    font-size: 0.9rem;

    ${props => (
        props.selected && props.display ? `
            border-left: 5px solid var(--primary-button-hover-color);
            color: var(--home-sideBar-hover-color);
        ` : ` 
            border-left: 5px solid rgba(0, 0, 0, 0);
        `)}

    cursor: pointer;
    justify-content: space-between;

    &:hover {
        background: rgb(235, 243, 255);
        fill: var(--primary-button-hover-color);
        transition-duration: 0.2s;
    }
`

const ContentSideMenuItemText = styled.span`

`

const ContentSideMenuItemCounter = styled.span`
    display: block;
    white-space: nowrap;
    background-color: rgb(240, 237, 237);
    border-radius: 1rem;
    padding: 0px 0.5rem;
    font-weight: normal;
    color: rgb(50, 50, 50);
    text-align: center;
`

const ContentHeader = styled.div`
    display: flex;
    padding: 1.2rem 0;

    -webkit-box-pack: justify;
    justify-content: space-between;

    width: 100%;
`

const ContentHeaderSideMenuDisplayIcon = styled.div`
    
    display: flex;
    align-items: center;
    margin-right: 1rem;
    button {
        border-left:none ;
        border-radius: 0 0.5rem 0.5rem 0 ;
    }
`

const ContentHeaderFilterArea = styled.div`
    display: flex;

    align-items: flex-start;

`

const ContentHeaderFilterClear = styled(TextButton)`

    width: 5rem;
    height: 2.5rem;

    &:hover {
        color: var(--button-hover-color);
        background-color: var(--primary-button-hover-bg);
    }

`
const ContentHeaderFilterRightArea = styled.div`
    margin-right: 1rem ;
`

const ContentButtonFontArea = styled(FontArea)`
    font-family: "Noto Sans JP", sans-serif;
    font-size: 1rem;
`

const FilterOptionsArea = styled.div`
    display : flex;
    flex-wrap: wrap;

    align-items: center;

    gap: 1rem 0.5rem;

    max-width: 80rem;
`

const PagerArea = styled.div`
    display: flex;
    justify-content: end;
`

export {
    Container,
    Wrapper,
    Header,
    Title,
    ContentWrapper,
    Content,
    ContentSideMenu,
    ContentSideMenuHeader,
    ContentSideMenuTitle,
    ContentSideMenuTitleIcon,
    ContentSideMenuItemWrapper,
    ContentSideMenuItem,
    ContentSideMenuItemText,
    ContentSideMenuItemCounter,
    ContentHeader,
    ContentHeaderSideMenuDisplayIcon,
    ContentHeaderFilterArea,
    ContentHeaderFilterClear,
    ContentHeaderFilterRightArea,
    ContentButtonFontArea,
    FilterOptionsArea,
    PagerArea
}
