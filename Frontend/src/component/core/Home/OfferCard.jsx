import React from 'react'

export default function OfferCard({offer}) {
  return (
    <div className='w-[100%] h-[250x] flex justify-center items-center p-x-[5%]'>
       <img src={offer.image} className='h-full w-full object-cover sm:object-fill aspect-[4/2] sm:aspect-[11/3] md:aspect-[11/2]' />
    </div>
  )
}
