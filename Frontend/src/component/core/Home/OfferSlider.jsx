
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import OfferCard from './OfferCard';

export default function OfferSlider({}) {
   
  const offers = [
    {
      id: 1,
      image: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/c928b14a5cddaf18.jpg?q=20",
    },
    {
      id: 2,
      image: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/df71df999c4d6023.jpg?q=20",
    },
    {
      id: 3,
      image: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/21c72584989b09a9.jpg?q=20",
    },
    
  ];
  


  let settings = {
    dots: true,
    infinite: true ,
    speed: 600,
    slidesToShow:1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000,
    easing:"ease-in-out",
    arrows:false
    
  }
 
 

  return (
    <div className='w-full'>
      <Slider {...settings} className='w-full'>
      {offers && offers.map(offer =>{
        return <OfferCard offer={offer}/>
      })}
     </Slider>

    </div>
  )
}
