import { redirect } from "react-router-dom";
import appStore from "../store/reducer";

export default function isUserAAdmin() {
   const currUser= appStore.getState().auth;

   if(currUser.accountType==='Admin'){
    return redirect('/dashbord/admin/all-listings')
   }else if(currUser.accountType==='Buyer'){
    return redirect('/');
   }else{
    return null;
   }
}
