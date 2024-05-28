import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CREATE_URL, HOME_URL, INVOICES_URL, SHOW_INVOICES_URL } from '../utils/constants'
import Home from './Home'
import Header from './Header'
import styled from 'styled-components'
import SideNavigator from './SideNavigator/SideNavigator'
import Create from './Create'
import { Bill, MyCompany, PropsForRailsData } from '../utils/type'

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

const Router = ({ bills, mycompany }: PropsForRailsData) => {
    return (
        <BrowserRouter>
            <Header mycompany={mycompany} />
            <Wrapper>
                <SideNavigator />
                <Main>
                    <Routes>
                        <Route path = { HOME_URL } element={<Navigate to={ INVOICES_URL } />} />
                        <Route path = { INVOICES_URL } element = { <Home bills={bills} mycompany={mycompany} /> } />
                        <Route path = { `${INVOICES_URL}${CREATE_URL}` } element = { <Create /> } />
                        <Route path = { `${SHOW_INVOICES_URL}` } element = { <Create /> } />
                        {/* <Route path = { CREATE_URL } element = { <Create /> } /> */}
                        <Route path = "*" element={<Navigate to={ HOME_URL } />} />
                    </Routes>
                </Main>
            </Wrapper>
        </BrowserRouter>
    )
} 

export default Router