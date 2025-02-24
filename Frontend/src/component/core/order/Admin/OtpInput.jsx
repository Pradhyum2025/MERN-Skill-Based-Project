import React, { useState } from 'react'

export default function OtpInput({ length, setCurrOtp }) {

  let [otp, setOtp] = useState(new Array(length).fill(''));

  //----------------- Handle onChange function ---------------
  const handleOnChange = (element, index) => {

    //get the input value
    const value = element.value;
    if (!value) return "None action";
    // Update the otp state
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    //Move focus to the next input
    if (index < otp.length - 1 && value) {
      element.nextSibling.focus();
    }
    //upadte the parent component
    setCurrOtp(newOtp.join(""));
  }

  //  ------------ Handle backSpace function ----------------
  const handleBackspace = (element, index) => {
    // clear the current input field
    let newOtp = [...otp];
    newOtp[index] = '';
    setOtp(newOtp);
    //Focus to the prevoius field
    if (index >= 1) {
      element.previousSibling.focus();
    }
    setCurrOtp(newOtp.join(""));
  }


  return (
    <div className='w-[100%] m-auto  flex justify-center'>
      {otp.map((data, index) => {
        return <input
          className='text-[1.2rem] font-[700] rounded-[6px]  m-1 p-[1.5px]  border-[3px] border-indigo-400 bg-white outline-none w-[50px] h-[50px] focus:border-indigo-600 focus:shadow text-center'
          onChange={(e) => handleOnChange(e.target, index)}
          onKeyDown={(e) => {
            if (e.key === 'Backspace') {
              handleBackspace(e.target, index);
            }
          }}
          name={'index'}
          key={index}
          type='text'
          value={data}
          maxLength='1'
          id={index}
          required
        />
      })}

    </div>
  )
}
