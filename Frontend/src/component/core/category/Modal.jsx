import React from 'react'
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

export default function Modal({ purpose,category}) {
 
  switch (purpose) {
    case "edit":
      return (
        <EditModal category={category}/>
      )

    case "delete":
      return (
       <DeleteModal category={category}/>
      )
    default:
      return null
  }
}
