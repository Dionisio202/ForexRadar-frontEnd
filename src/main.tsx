import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { GlobalProvider } from './globalProvider.tsx'

import { BrowserRouter } from 'react-router-dom'
//import ForexChart from './graphic.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <BrowserRouter>
   <GlobalProvider>
   <App/>
   </GlobalProvider>
   

   </BrowserRouter>

  </React.StrictMode>
)

