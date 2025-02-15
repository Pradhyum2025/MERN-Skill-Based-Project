import axios from "axios";
import toast from "react-hot-toast";

export const createOrder = async (orderList,token) => {
  try {
    const res = await axios.post(`http://localhost:8080/order`,{orderList},{
      headers: {
        'Authorisation':`Bearer ${token}`
      }
    });
    if (res.data && res.data.success) {
      console.log("CREATE ORDER RESPONSE --->>>", res)
      toast.success(res?.data?.message, { position: 'right-bottom', duration: 2000 });
    }
  } catch (error) {
    console.log('CREATE ORDER ERROR :',error?.message)
    toast.error(error?.response?.data?.message, { position: 'right-bottom', duration: 2000 });
    
  }

}