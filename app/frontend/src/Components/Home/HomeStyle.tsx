import styled from 'styled-components'


// Todo : 10rem Code duplication
const Container = styled.div`
    
`

const Wrapper = styled.div`
    
`

const Header = styled.div`
    display: flex;
    width: 100%;
    -webkit-box-align: center;
    align-items: center;

    border-bottom: 1px solid rgb(233, 231, 231);

    padding: 1.5rem;
`

const Title = styled.h2`
    font-size: 1.6rem;
    flex: 1;

    font-weight: 600;
`

const ContentWrapper = styled.div`
    display: flex;
    overflow-y: auto;
`

const Content = styled.div`
    display: block;
`

const ContentSideMenu = styled.div<{
    display: boolean
}>`
    display: block;
    min-height: calc(-8.56rem + 100vh);

    border-right: 1px solid rgb(233, 231, 231);
    width: ${props => props.display ? '10rem' : '0'};
    overflow-y: hidden;
    transition: width 0.1s ease 0s;
    word-break: break-all;

    h3 {
        display: ${props => (props.display ? 'block' : 'none')};
    }

    span {
        display: ${props => (props.display ? 'flex' : 'none')};
    }
`

const ContentSideMenuHeader = styled.div`
    display: flex;
    width: 10rem;

    -webkit-box-align: center;
    align-items: center;

    margin-top: 1.5rem;
    margin-bottom: 0.8rem
`

const ContentSideMenuTitle = styled.h3`
    color: #6f6b62;
    font-size: 0.9rem;
    font-weight: 500;
    padding-left: 1rem;
`

const ContentSideMenuTitleIcon = styled.div`
    margin-left: 0.5rem;
`

const ContentSideMenuItemWrapper = styled.ul`
    width: 10rem;
`

const ContentSideMenuItem = styled.li<{
    selected: boolean
}>`
    display: flex;
    font-size: 0.8rem ;

    width: 100%;
    
    padding: 0.3rem 0.8rem;
    margin: 0.4rem 0;
    font-size: 0.8rem ;
    ${props => (
        props.selected ? `
            border-left: 5px solid rgb(40, 100, 240);
            color: rgb(40, 90, 200);
        ` : ` 
            border-left: 5px solid rgba(0, 0, 0, 0);
        `)}

    cursor: pointer;
    justify-content: space-between;

    &:hover {
        background: rgb(235, 243, 255);
        fill: rgb(40, 100, 240);
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
`

const ContentHeaderSideMenuDisplayIcon = styled.div`
    button {
        border-left:none ;
        border-radius: 0 0.5rem 0.5rem 0 ;
    }
`

const ContentHeaderFilterArea = styled.div`
    display: flex;
    margin-left: 1rem;

    -webkit-box-align: center;
    align-items: center;
`

const ContentHeaderFilterClear = styled.span`
    display: inline-block;
    font-size: 0.9rem;
    font-weight: 500;
    margin-left: 0.8rem;

    padding: 0.4rem 0.5rem; 
    cursor: pointer;

    border-radius: 0.5rem;

    &:hover {
        color: #1e46aa;
        background-color: #dce8ff;
    }
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
    ContentHeaderFilterClear
}