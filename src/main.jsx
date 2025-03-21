import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AboutUs from './screens/AboutUs.jsx'
import EduEvents from './screens/EduEvents.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <AboutUs/> */}
    <EduEvents/>
  </StrictMode>,
)
