import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/App'
import '../src/index.scss'

const element = document.getElementById('root')

ReactDOM.createRoot(element!).render(
  <React.StrictMode>
    <App {...element?.dataset} />
  </React.StrictMode>
)