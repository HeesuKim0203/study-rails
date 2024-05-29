import React, { useState } from 'react'
import Router from './Components/Router'

type Props = {
  mycompany?: string
}

const App = ({ mycompany }: Props) => {

  const mycompanyJson = mycompany && JSON.parse(mycompany)

  return (
    <div className='study-rails'>
      <Router
        mycompany={mycompanyJson.length !== 0 ? mycompanyJson[0] : mycompanyJson} 
      />
    </div>
  )
}

export default App
