import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CREATE_URL, HOME_URL, INVOICES_URL, SHOW_INVOICES_URL } from '../utils/constants'
import styled from 'styled-components'
import { PropsForRailsData } from '../utils/type'

import Home from './Home'
import Header from './Header'
import SideNavigator from './SideNavigator/SideNavigator'
import Create from './Create'

const Wrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex: 1 1 0%;
    position: relative;
`

const Main = styled.main`
    box-sizing: border-box;
    overflow: auto;
    flex: 1 1 0%;
`

const Router = ({ mycompany }: PropsForRailsData) => {

    return (
        <BrowserRouter>
            <Header mycompany={mycompany} />
            <Wrapper>
                <SideNavigator />
                <Main>
                    <Routes>
                        <Route path = { HOME_URL } element={<Navigate to={ INVOICES_URL } />} />
                        <Route path = { INVOICES_URL } element = { <Home /> } />
                        <Route path = { `${INVOICES_URL}${CREATE_URL}` } element = { <Create mycompany={mycompany} /> } />
                        <Route path = { `${SHOW_INVOICES_URL}` } element = { <Create mycompany={mycompany} /> } />
                        <Route path = "*" element={<Navigate to={ HOME_URL } />} />
                    </Routes>
                </Main>
            </Wrapper>
        </BrowserRouter>
    )
} 

export default Router