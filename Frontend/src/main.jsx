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
import DashBoardRoute from './DashBoardRoute.jsx'
import CategoryCreation from './component/core/category/CategoryCreation.jsx'
import Categories from './component/core/category/Categories.jsx'
import ListingCreation from './component/core/Listings/Seller/ListingCreation.jsx'
import { MyListing } from './component/core/Listings/Seller/MyListings.jsx'
import ListingDetails from './component/core/Listings/ListingDetails.jsx'
import { ListingUpdation } from './component/core/Listings/Seller/ListingUpdation.jsx'

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
    {
      path: '/dashbord',
      element: <DashBoardRoute />,
      children:[
        {path:'/dashbord/',element: <MyListing/>} ,
        {path:'/dashbord/createCategory',element: <CategoryCreation/>},
        {path:'/dashbord/categories',element: <Categories/>} ,
        {path:'/dashbord/create-listing',element: <ListingCreation/>} ,
        {path:'/dashbord/show/:listingId',element: <ListingDetails/>} ,
        {path:'/dashbord/edit/:listingId',element: <ListingUpdation/>} 
        
      ]
    }
  
  ])

createRoot(document.getElementById('root')).render(

  <StrictMode>

    <Provider store={appStore}>

    <RouterProvider router={router}/>

    </Provider>

  </StrictMode>
)
