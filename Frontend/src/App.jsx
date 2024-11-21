import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer'

import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <Toaster/>
     <Outlet/>
     <Footer/>
    </>
  )
}

export default App
