import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Form from './form.tsx'
import { GlobalProvider } from './globalProvider.tsx'
import DivisaInformation from './divisaInfromation.tsx'
import { BrowserRouter } from 'react-router-dom'
//import ForexChart from './graphic.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <BrowserRouter>
   <App/>

   </BrowserRouter>

   
  </React.StrictMode>
)
//<GlobalProvider>
//<Form/>
//</GlobalProvider>
