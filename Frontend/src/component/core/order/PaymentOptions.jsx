import React from 'react'
import { useSelector } from 'react-redux'

export default function PaymentOptions() {
  const currUser = useSelector(store=>store.auth);
  
  return (
    <div>
      
    </div>
  )
}
