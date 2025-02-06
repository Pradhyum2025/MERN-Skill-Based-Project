import React from 'react'

export default function OfferCard({offer}) {
  return (
    <div className='w-[100%] h-[250x] flex justify-center items-center p-x-[5%]'>
       <img src={offer.image} className=' h-full' />
    </div>
  )
}
