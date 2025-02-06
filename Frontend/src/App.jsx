import { useState } from 'react'
import reactLogo from './assets/react.svg'

import Navbar from './component/common/Navbar'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './component/common/Footer'
import Login from './component/core/Auth/Login';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <Toaster/>
     <Login/>
     <Outlet/>
     <Footer/>
    </>
  )
}

export default App
