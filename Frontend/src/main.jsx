import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import appStore from './store/reducer/index.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './component/core/Home/HomePage.jsx'
import { BagPage } from './component/core/BagPage/BagPage.jsx'
import Signup from '../src/component/core/Auth/Signup.jsx'

const router = createBrowserRouter([
    {
      path:"/",
      element:<App/>,
      children:[
        {path:"/",element:<HomePage/>},
        {path:'/bag',element:<BagPage/>},
        {path:'/signup',element:<Signup/>},

      ]
    },
  
  ])

createRoot(document.getElementById('root')).render(

  <StrictMode>

    <Provider store={appStore}>

    <RouterProvider router={router}/>

    </Provider>

  </StrictMode>
)
