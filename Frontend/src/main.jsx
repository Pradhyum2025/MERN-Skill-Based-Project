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
import AllListings from './component/core/Listings/Admin/AllListings.jsx'
import MyProfile from './component/core/Listings/Seller/MyProfile.jsx'
import BecomeSeller from './component/core/User/BecomeSeller.jsx'
import AllSeller from './component/core/User/AllSeller.jsx'
import Listing from './component/core/Listings/ListingMainPage/Listing.jsx'
import AddressForm from './component/core/Address/AddressForm.jsx'
import BagCardSection from './component/core/BagPage/BagCardSection.jsx'
import AddressStatus from './component/core/order/AddressStatus.jsx'
import OrderSummary from './component/core/order/OrderSummary.jsx'
import PaymentOptions from './component/core/order/PaymentOptions.jsx'
import { BuyerOrderHistory } from './component/core/order/Buyer/BuyerOrderHistory.jsx'
import BuyerOrderDetails from './component/core/order/Buyer/BuyerOrderDetails.jsx'
import { SellerOrderHistory } from './component/core/order/seller/SellerOrderHistory.jsx'
import SellerOrderDetails from './component/core/order/seller/SellerOrderDetails.jsx'
import isUserAAdmin from './loader/loader.js'
import { OrderHistory } from './component/core/order/Admin/OrderHistory.jsx'
import OrderDetailsForAdmin from './component/core/order/Admin/OrderDetailsForAdmin.jsx'
import OTP from './component/core/order/Admin/OTP.jsx'

const router = createBrowserRouter([
    {
      path:"/",
      element:<App/>,
      children:[
        {path:"/",element:<HomePage/>},
        {path:'/signup',element:<Signup/>},
        {path:'/become-seller',element:<BecomeSeller/>},
        {path:'/listings/:categoryId',element:<Listing/>},
        {path:'/show/:listingId',element: <ListingDetails/>},
        {path:'/address',element: <AddressForm/>},
        {path:'/my-order',element: <BuyerOrderHistory/>},
        {path:'/my-order/:orderId',element: <BuyerOrderDetails/>},
        
      ]
    },
    {
      path: '/dashbord',
      element: <DashBoardRoute />,
      children:[
        {path:'/dashbord/',element: <MyListing/>,loader:isUserAAdmin} ,
        {path:'/dashbord/createCategory',element: <CategoryCreation/>},
        {path:'/dashbord/categories',element: <Categories/>} ,
        {path:'/dashbord/create-listing',element: <ListingCreation/>} ,
        {path:'/dashbord/show/:listingId',element: <ListingDetails/>} ,
        {path:'/dashbord/edit/:listingId',element: <ListingUpdation/>},
        {path:'/dashbord/admin/all-listings',element: <AllListings/>},
        {path:'/dashbord/my-profile',element: <MyProfile/>} ,
        {path:'/dashbord/all-sellers',element: <AllSeller/>},
        {path:'/dashbord/my-orders',element: <SellerOrderHistory/>},
        {path:'/dashbord/my-orders/:orderId',element: <SellerOrderDetails/>},
        {path:'/dashbord/admin/all-orders/',element: <OrderHistory/>},
        {path:'/dashbord/admin/orderDetails/:orderId',element: <OrderDetailsForAdmin/>},
        {path:'/dashbord/otp/:orderId',element: <OTP/>}
      ] 
    },
    {
      path: '/bag',
      element: <BagPage />,
      children:[
        {path:'/bag',element: <BagCardSection/>} , 
        {path:'/bag/delivery-address',element: <AddressStatus/>} ,   
        {path:'/bag/order-summary',element: <OrderSummary/>} ,      
        {path:'/bag/payment-options',element: <PaymentOptions/>} ,      
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
