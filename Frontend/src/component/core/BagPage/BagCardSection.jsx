import React from 'react'
import { BagCard } from './BagCard';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function BagCardSection() {
  const currPath = useLocation().pathname;
  const userBag = useSelector(store => store.bag);
  return (
    <>
      {userBag?.map((bagItem) => {
        if(currPath==='/bag/order-summary' && bagItem.product.stock!== 0){
          return <BagCard key={bagItem._id} bagItem={bagItem} />
        }else if(currPath!=='/bag/order-summary'){
          return <BagCard key={bagItem._id} bagItem={bagItem} />
        }})
        }
    </>
  )
}
