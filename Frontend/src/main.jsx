import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import appStore from './store/index.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Listing from './component/Listing.jsx'
import Show from './component/Show.jsx'
import Bag from './component/Bag.jsx'
import BecomeSeller from './component/BecomeSeller.jsx'
import Login from './component/Login.jsx'
import Signup from './component/Signup.jsx'
import PostItem from './component/PostItem.jsx'
import ProfilePage from './component/ProfilePage.jsx'
import EditListing from './component/EditListing.jsx'


const router = createBrowserRouter([
    {
      path:"/",
      element:<App/>,
      children:[
        {path:"/",element:<Listing/>},
        {path:'/show/:product_id',element:<Show/>},
        {path:'/bag',element:<Bag/>},
        {path:"/seller",element:<BecomeSeller/>},
        {path:"/post",element:<PostItem/>},
        {path:'/login',element:<Login/>},
        {path:'/signup',element:<Signup/>},
        {path:'/profile',element:<ProfilePage/>},
        {path:'/edit',element:<EditListing/>}

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
