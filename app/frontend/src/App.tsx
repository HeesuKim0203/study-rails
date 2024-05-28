import React, { useState } from 'react'
import Router from './Components/Router'
import { Bill, MyCompany } from './utils/type'

import testBill from './testBill.json'
import testMyCompany from './testMyCompany.json'

type Props = {
  bills?: string  
  mycompany?: string
}

const App = ({ mycompany }: Props) => {

  const mycompanyJson = mycompany && JSON.parse(mycompany)

  return (
    <Router
      mycompany={mycompanyJson.length !== 0 ? mycompanyJson[0] : mycompanyJson} 
    />
  )
}

export default App
