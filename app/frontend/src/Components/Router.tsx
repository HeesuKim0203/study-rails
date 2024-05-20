import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HOME_URL } from '../utils/text'
import Home from './Home'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = { HOME_URL } element = { <Home /> } />
            </Routes>
        </BrowserRouter>
    )
} 

export default Router