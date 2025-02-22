import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { profileSliceAction } from "../../../store/profile";
import { loadingSliceAction } from "../store/loading";
import SellerListingCard from "./SellerListingCard";
import { Toaster } from "react-hot-toast";

const ProfilePage = () => {
  
  // const [curruser, setUser] = useState({
  //   _id: "645f1234abcd5678ef901234",
  //   username: "tech_guru",
  //   email: "techguru@example.com",
  //   password: "hashed_password_here",
  //   role: "seller",
  //   sellerDetails: "645f6789abcd1234ef905678", // Reference to SellerDetails
  //   listing: [
  //     {
  //       _id: "64671234abcd5678ef901234",
  //       image: "https://via.placeholder.com/150",
  //       nameWithModel: "Smartphone X200",
  //       price: 799,
  //       features: ["5G Enabled", "128GB Storage", "6.5-inch OLED Display"],
  //       warranty: "12 months",
  //       catagory: "smartphone",
  //       seller: "645f1234abcd5678ef901234",
  //     },
  //     {
  //       _id: "64678901abcd5678ef902345",
  //       image: "https://via.placeholder.com/150",
  //       nameWithModel: "Smartwatch Pro",
  //       price: 249,
  //       features: ["Heart Rate Monitor", "GPS", "Waterproof"],
  //       warranty: "6 months",
  //       catagory: "smartwatch",
  //       seller: "645f1234abcd5678ef901234",
  //     },
  //     {
  //       _id: "64689012abcd5678ef903456",
  //       image: "https://via.placeholder.com/150",
  //       nameWithModel: "Smart TV 55-inch Ultra HD",
  //       price: 1200,
  //       features: ["4K Resolution", "HDR", "Voice Control"],
  //       warranty: "24 months",
  //       catagory: "smartTv",
  //       seller: "645f1234abcd5678ef901234",
  //     },
  //   ],
  //   bag: [
  //     {
  //       _id: "64671234abcd5678ef901234",
  //       image: "https://via.placeholder.com/150",
  //       nameWithModel: "Smartphone X200",
  //       price: 799,
  //       features: ["5G Enabled", "128GB Storage", "6.5-inch OLED Display"],
  //       warranty: "12 months",
  //       catagory: "smartphone",
  //       seller: "645f1234abcd5678ef901234",
  //     },
  //   ],
  // }
  // );

  const dispatch = useDispatch();
  //token
  let token = localStorage.getItem('token');
  // // Fetch user details
  useEffect(()=>{

    let fetchUser = async()=>{
      dispatch(loadingSliceAction.initializeLoading());
      let response = await axios.get('http://localhost:8080/user/profile',{
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}` // Include token as a Bearer token
        }})
      if(response.data){
        dispatch(profileSliceAction.initializeProfile(response.data.currUser));
        dispatch(loadingSliceAction.deinitalizeLoading());
      }
      
    }
   fetchUser();
  },[])
  
  let user = useSelector(store=>store.profile);
  let loading = useSelector(store => store.loading);

  if(loading){
    
    return( <div className="flex justify-center items-center h-screen">Loading...</div>);

  }else{


  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      <Toaster/>
      {/* Left Section: User Info */}
      <div className="md:w-1/3 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-[#ecba3d]">{user.username}</h2>
        <p className="text-gray-700 mb-2 font-bold">
          <strong className="text-blue-600 font-[700]">Email:</strong> {user.email}
        </p>
        <p className="text-gray-700 mb-2 font-bold">
          <strong className="text-blue-600 font-[700]">Role:</strong> {user.role}
        </p>
        {user.role === "seller" && (
          <p className="text-gray-700 mb-2 font-bold">
            <strong className="text-blue-600 font-[700]">Seller Details ID:</strong> {user.sellerDetails}
          </p>
        )}
      </div>

      {/* Right Section: Listings */}
      <div className="md:w-2/3">
        <h3 className="text-xl font-bold text-black mb-4 ">Your Products for selling</h3>
        {user.listing.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.listing.map((item) =>{
              return <SellerListingCard key={item._id} item={item}/>
            })}
          </div>
        ) : (
          <p className="text-gray-700">No listings available.</p>
        )}
      </div>
    </div>
  );
};
    
}

export default ProfilePage;

