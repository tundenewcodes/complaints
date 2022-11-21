//import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
//import { createRoot } from 'react-dom/client'
import './index.css'
import AppContextProvider from './store/appReducers'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
// import { BrowserRouter } from 'react-router-dom'
// const rootElement = document.getElementById('root')
// const root = createRoot(rootElement)

// root.render(
//     <StrictMode>
//         < AppContextProvider >
//             <App /></AppContextProvider>
//     </StrictMode>
// )

ReactDOM.render(
  <BrowserRouter>
    {' '}
    <AppContextProvider>
      {' '}
      <App />{' '}
    </AppContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
