import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CREATE_URL, HOME_URL } from '../utils/constants'
import Home from './Home'
import Header from './Header'
import styled from 'styled-components'
import SideNavigator from './SideNavigator/SideNavigator'
import Create from './Create'

const Wrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex: 1 1 0%;
    overflow: auto;
`

const Main = styled.main`
    box-sizing: border-box;
    overflow: auto;
    flex: 1 1 0%;
`

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Wrapper>
                <SideNavigator />
                <Main>
                    <Routes>
                        <Route path = { HOME_URL } element = { <Home /> } />
                        <Route path = { CREATE_URL } element = { <Create /> } />
                    </Routes>
                </Main>
            </Wrapper>
        </BrowserRouter>
    )
} 

export default Router