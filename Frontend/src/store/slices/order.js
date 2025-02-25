import { createSlice } from "@reduxjs/toolkit"

const orderSlice = createSlice({
  name:'orders',
  initialState:[],
  reducers:{
    setOrderData:(state,action)=>{
      return[...action.payload];
    },

    setSingleOrder:(state,action)=>{
      return [action.payload];
    },
    cancleOrder:(state,action)=>{
      return state.map(order=>{
        if(order._id===action.payload){
          return {...order,orderStatus:'Cancelled'}
        }else{
          return order;
        }
      }) 
    },
    setDelivered:(state,action)=>{
      return state.map(order=>{
        if(order._id===action.payload){
          return {...order,orderStatus:'Delivered'}
        }else{
          return order;
        }
      }) 
    },
    changePaymentStatus : (state,action)=>{
      return state.map(order=>{
        const newPaymentStatus = {
          method:'UPI',
          status:'Completed',
          transactionId:action.payload
        }
        order.paymentStatus=newPaymentStatus
        return order;
      })
    },
    setEmptyOrders:(state)=>{
      return [];
    }

    }
})

export const orderSliceAction = orderSlice.actions;
export default orderSlice;