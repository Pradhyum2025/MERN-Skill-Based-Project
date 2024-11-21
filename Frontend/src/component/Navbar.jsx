import React from 'react'
import { FaHeart } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { authSliceAction } from '../store/auth';
import { MdSell } from "react-icons/md";

export default function Navbar() {
   
  const dispatch = useDispatch();
  const  currUser = useSelector(store=>store.auth);
  const bagItemsCount = useSelector(store=>store.bag); 
 
  return (

    <div className={`navbar bg-white flex justify-around md:px-3   px-0 w-full bg-base-100 border-b-2 sticky top-0 z-10 
    `}>
<div className="navbar-start lg:w-2/4 flex-1">
  <div className="dropdown">
    <div tabIndex={0} role="button" className="btn btn-ghost text-black lg:hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h8m-8 6h16" />
      </svg>
    </div>
    <ul
      tabIndex={0}
      className="menu bg-white text-base font-semibold menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black">
    
    <li>WishLait</li>
    <li>{(currUser && currUser.role=='buyer')?"Sell Items":"Become a seller"}</li>
    </ul>
  </div>

  <Link to='/' >
  <img 
    className='h-[4rem] w-[4rem] ml:0 md:ml-3'
      src=".\public\logo_updated_color.jpg"
      alt="Shoes" />
  </Link>
</div>


<div className="navbar-center  hidden lg:flex  md:w-2/6 justify-end">
  <ul className="menu text-black text-base font-bold gap-4 menu-horizontal px-1 ">
  <li className='px-2 flex'> 
 <span className='bg-slate-100'><FaHeart className='text-2xl text-[#ecba3d]'/>wishList</span></li>
 {currUser &&
  <li className='px-2'> <span className='bg-slate-100'>{(currUser && currUser.role=='seller')?
     <Link to='/post' className='flex justify-center items-center gap-2 '><MdSell className='text-2xl'/><span>Sell items</span></Link> :
    <Link to='/seller'>Become a seller</Link> }</span></li>
}
  </ul>
</div>

<div className="flex-none gap-2 sm:gap-1 md:gap-0 lg:gap-9 lg:w-1/6 lg:ml-05 w-2/4 ml-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
      <Link to='/bag'> 
        <div className="indicator">
         <FaCartShopping className='text-xl text-black'/>
          <span className="badge badge-sm indicator-item">{bagItemsCount}</span>
        </div>
        </Link> 
      </div>

    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost h-[40px] min-h-[40px]">
         <span className='flex text-black justify-center items-center font-bold text-base gap-1'><FaRegUserCircle className='text-2xl text-black'/> Account</span>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-zinc-100 text-black font-semibold rounded-box z-[1] mt-3 w-52 p-2 shadow">
          {currUser?
          <li>
          <Link to='/profile' className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        :<li>
          <span onClick={()=>document.getElementById('my_modal_3').showModal()}>Login</span>
          <Login/>
        </li> }
        {currUser?
          <li>
          <a className="justify-between">
            Setting
            <span className="badge">New</span>
          </a>
        </li>
        :<li><Link to='/signup'>Signup</Link></li>}
        {currUser?
        <li><Link to={'/'} onClick={()=>dispatch(authSliceAction.deInializeAuter())}>Logout</Link></li>
        :""}


      </ul>
    </div>
  </div>

</div>
  )
}
