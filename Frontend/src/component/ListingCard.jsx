import React from 'react'
import ListingCardBtn from './ListingCardBtn';
import ListingCardImage from './ListingCardImage';
import ListingCardDescription from './ListingCardDescription';


export default function ListingCard({ listing }) {

  return (
    <div className="card card-compact bg-zinc-200 w-[25rem] lg:h-[25rem] lg:w-[21rem] shadow-xl">

      <ListingCardImage listing={listing}/>
      <div className="card-body">
      <ListingCardDescription listing={listing}/>
      <ListingCardBtn listing={listing} />
      </div>

    </div>
  )
}
