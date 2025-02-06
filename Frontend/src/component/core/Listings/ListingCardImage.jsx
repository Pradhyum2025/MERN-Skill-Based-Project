import React from 'react'

export default function ListingCardImage({listing}) {
  return (
    <figure>
    <img
      className='h-[17rem] w-full'
      src={listing.image}
      alt="Shoes" />
  </figure>
  )
}
