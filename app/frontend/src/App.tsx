import React, { useState } from 'react'
import Router from './Components/Router'
import { Bill, MyCompany } from './utils/type'

type Props = {
  bills?: string  
  mycompany?: string
}

const App = ({ bills, mycompany }: Props) => {

  const billJson = JSON.parse(bills || '')
  const mycompanyJson = JSON.parse(mycompany || '')
  return (
    <Router bills={billJson} mycompany={mycompanyJson[0]} />
  )
}

export default App
