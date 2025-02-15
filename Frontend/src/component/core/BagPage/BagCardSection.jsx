import React from 'react'
import { BagCard } from './BagCard';
import { useSelector } from 'react-redux';

export default function BagCardSection() {
  const userBag = useSelector(store => store.bag);
  return (
    <>
      {userBag?.map((bagItem) => (
        <BagCard key={bagItem._id} bagItem={bagItem} />
      ))}
    </>
  )
}
