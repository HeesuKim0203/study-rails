import styled from 'styled-components'


const Container = styled.header`
    box-sizing: border-box;
    width: 100%;
    padding: 1rem 1.5rem;
    

    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    border-bottom: var(--primary-border);

    user-select: none;
`

const Title = styled.h1`
    display: block;
    height: 100%;
    width: auto;
`

const UserMenu = styled.div`
    display: flex ;
`

const User = styled.span`
    display: flex ;
    align-items: center;
    justify-content: center;
    font-size: 1rem ;
    margin-right: 1rem ;
    cursor: pointer;
`
const UserName = styled.span`
    display: block;
    margin-left: 0.3rem;
    font-weight: 600;

    font-size: 0.8rem;
`

const Menu = styled.span`
    display: flex ;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

export {
    Container,
    Title,
    UserMenu,
    User,
    UserName,
    Menu
}