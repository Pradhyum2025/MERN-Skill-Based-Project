import { User } from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Listing } from "../models/listing.js";
import { SellerDetail } from "../models/sellerDetails.js";
import { Address } from "../models/address.js";

dotenv.config();


//signup --------------------- >>>>>>>>>>>>
export const signup = async(req,res)=>{
  try{
    const {firstname,lastName,email,contact,password} = req.body;

    let currUser = await User.findOne({email});
    
    //check user exist
    if(currUser){
      return res.status(405).json({
        success:false,
        message:'User Already Exist! Please Login'
      })
    }
 
    //Secure password
    let hashPassword = '';
    try{
        hashPassword = await bcrypt.hash(password,10);
    }catch(err){
      res.status(503).json({
        success:false,
        message:'Failed to hash password'
      }) 
    }
    //create newUser 
    let userPayload = new User({
      firstname,
      lastName,
      email,
      password:hashPassword,
    })
   
    let contactList = [];
    contactList.push(contact);
   
    userPayload.contact = contactList;
    
    //save newUser
    currUser = await userPayload.save();
    
    //login newUser via send JWT token
    const payload ={
      id:currUser._id,
      email:currUser.email,
      role:currUser.accountType
    }
    
    let token = jwt.sign(payload,process.env.JWT_SECRET,{
      expiresIn:'2h'
    });
    
    currUser =currUser.toObject();
    currUser.token = token;
    currUser.password=undefined
    currUser.bag=undefined
    
    let options = {
      expiresIn:new Date(Date.now()+3*24*60*60*1000),
      httpOnly:true
    }

    res.cookie('token',token,options).json({
      success:true,
      message:'Signup seccussfully!',
      token,
      currUser
    })
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      success:false,
      message:'Internal server error!'
    })
  }
}

// login --------------------------->>
export const login =  async(req,res)=>{
  try{
    let{email,password}= req.body;
    
    let currUser = await User.findOne({email});
    
    //check user exist
    if(!currUser){
      return res.status(404).json({
        success:false,
        message:'User Not Exist! Please Signup'
      })
    }

    // match password
    const hashPassword = currUser.password;

    try{
      let match = await bcrypt.compare(password,hashPassword);
      if(match){

        //sign JWT token
        const payload = {
          id:currUser._id,
          email:currUser.email,
          role:currUser.accountType
        }
        let token  = jwt.sign(payload,process.env.JWT_SECRET,{
          expiresIn:'2h'  
        })

        currUser = currUser.toObject();
        currUser.token = token;
        currUser.password = undefined;
        
        let options = {
          expire:new Date(Date.now()+3*24*60*60*1000),
          httpOnly:true
        }
    
        return res.cookie('token',token,options).json({
          success:true,
          message:'login seccussfully!',
          token,
          currUser
        })
      }else{
        return res.status(203).json({
          success:false,
          message:'Incorrect Password!'
        })
      }

    }catch(err){
      console.log(err.message)
      res.status(503).json({
        success:false,
        message:'Failed to compare password!'
      })
    }

  }catch(error){
    res.status(500).json({
      success:false,
      message:'Internal server error!'
    })
  }
}

//get user
export const getUser =async(req,res)=>{
  try{
   let currUser = await User.findById(req.user.id).populate('listing');
    return res.status(200).json({
    success:true,
    message:'get user successfully',
    currUser
   })

  }catch(err){
    res.status(500).json({
      success:false,
      message:'Internal Server Error'
     })
  }
}


// //get bag
// export const getBag =async(req,res)=>{
//   try{
//     let currUser = await User.findById(req.user.id).populate('bag');

//     const bag = currUser.bag;
//     res.status(200).json({
//       success:true,
//       message:"Welocome on bag!",
//       bag
//     })
//   }catch(err){
//     console.log(err.message)
//     res.state(500).json({
//       success:false,
//       message:"Internal server error",
//       bag
//     })
//   }
// }
// //add to bag ----------------->>>
// export const addToBag =  async(req,res)=>{

//   try{
//     let {product_id} = req.params;
//     let currListing = await Listing.findById(product_id);
    
//     //check listing exist or NOT
//     if(currListing){
      
//       let currUser = await User.findById(req.user.id);
      
//       //check listiing alredy exist in user bag
//       for(let list of currUser.bag){
        
//         if(list._id.equals(currListing._id)){
//           return res.status(201).json({
//             success:false,
//             message:'Item is aready exist in bag',
//           }) 
//         }
//       }
//       currUser.bag.unshift(currListing._id);
//       currUser = await currUser.save();
      
//       return res.status(200).json({
//         success:true,
//         message:'Successfully add to bag!',
//         currListing
//       })
      
//     }else{
//       return res.status(400).json({
//         success:true,
//         message:'cannot add to bag!'
//       })
//     }

//   }catch(error){
//     console.log(error.message)
//     return res.status(500).json({
//       success:false,
//       message:'Internal server error!'
//     })
//   }
// }

// //remove from bag
// export const removeFrombag =  async(req,res)=>{
//   try{
//     let {product_id} = req.params;

//     let currListing = await Listing.findById
//     (product_id);

//     //check listing exist or NOT
//     if(currListing){

//       let currUser = await User.findById(req.user.id);

//       //check listiing alredy exist in user bag
//       for(let list of currUser.bag){

//         if(list._id.equals(currListing._id)){

//           currUser.bag = currUser.bag.filter(items=>!items._id.equals(currListing._id));

//           currUser = await currUser.save();

//           return res.status(200).json({
//             success:true,
//             message:'Successfully remove from bag!'
//           })
//         }
//       }

//       return res.status(400).json({
//             success:false,
//             message:'listing not exist in bag!',
//       }) 

//     }
    
//   }catch(error){
//     console.log(error.message)
//     return res.status(500).json({
//       success:false,
//       message:'Internal server error!'
//     })
//   }
// }

//become a seller
export const becomeSeller = async(req,res)=>{
  try{
    //and save it into currUser schema
    let {companyName,contact,about,state,city,postalCode,country,landMark,streetAddress} = req.body;
  
    if( !companyName|| !contact|| !about|| !state|| !city|| !postalCode|| !country|| !landMark|| !streetAddress){
    
      return res.status(400).json({
        success:false,
        message:'All feilds are reuire!'
      })

    }

   const userId= req.user.id;
    let newSeller = new SellerDetail( {companyName,about,contact});

    const addressPayload = {
      state,
      city,
      postalCode,
      country,
      landMark,
      streetAddress
    }

    const currAddress = await Address.create(addressPayload);

    // Push address in seller details
    newSeller.companyAddress.unshift(currAddress._id);

    newSeller = await newSeller.save();

    //save new seller info user schema
    let currUser = await User.findById(userId);
    
    currUser.accountType ='Seller'; //change role
    currUser.sellerDetails = newSeller._id;

    currUser = await currUser.save(); //save user

    //sign JWT token again because we can change role of the current user which use for next request for authorization
    const payload = {
      id:currUser._id,
      email:currUser.email,
      role:currUser.accountType
    }
    let token  = jwt.sign(payload,process.env.JWT_SECRET,{
      expiresIn:'2h'  
    })

    currUser = currUser.toObject();
    currUser.token = token;
    currUser.password = undefined;
    currUser.username=undefined;
    currUser.email=undefined;
    
    let options = {
      expire:new Date(Date.now()+3*24*60*60*1000),
      httpOnly:true
    }

    return res.cookie('token',token,options).json({
      success:true,
      message:'Successfully upgrade your account into seller account!',
      token,
      currUser
    })
    
  }catch(err){
    console.log("Seller account upgradation error",err.message)
    res.status(500).json({
      success:false,
      message:'Internal server error!'
    })
  }
}