import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
//load env files
dotenv.config();

// check seller authenticity
export const isAuth = (req,res,next)=>{
  
  try{
    const token = req.cookies?.token
    || req?.body?.token
    || req.header('authorisation').replace('Bearer ',"");

  //  let token = req.headers.token;
  
    if (!token){
      return res.status(422).json({
        success:false,
        message:'Token missing'
      })
    }

    // varify token
    let payload={};
    try{
      payload = jwt.verify(token,process.env.JWT_SECRET);

      // console.log('payload',payload)
    }catch(err){
      console.log(err.message); 
      return res.status(400).json({
        success:false,
        message:'Failed to verify token'
      })
    }

    req.user = payload;

    return next();

  }catch(error){
    console.log("isAuth middleware error ",error.message)
    return res.status(401).json({
      success:false,
      message:'Somethin Went Wrong'
    })
  }

}

// check user is seller or NOT
export const isSeller = (req,res,next)=>{
  
  try{
    let payload = req.user;
    
    if(payload.role!=='Seller'){
      return res.status(401).json({
        success:false,
        message:'Protected route for sellers'
      })
    }
    return next();

  }catch(error){
    console.log("isSeller  middleware error ",error.message)
    res.status(500).json({
      success:false,
      message:'Somethin Went Wrong'
    })
  }
}

// check user is seller or NOT
export const isBuyer= (req,res,next)=>{
  
  try{
    let payload = req.user;
    if(payload.role!=='Buyer'){
      return res.status(401).json({
        success:false,
        message:'Protected route for buyers'
      })
    }
    return next();

  }catch(error){
    console.log("isBuyer  middleware error ",error.message)
    res.status(500).json({
      success:false,
      message:'Somethin Went Wrong'
    })
  }
}

// check user is seller or NOT
export const isAdmin = (req,res,next)=>{
  
  try{
    let payload = req.user;
    
    if(payload.role!=='Admin'){
      return res.status(401).json({
        success:false,
        message:'Protected route for admins'
      })
    }
    return next();

  }catch(error){
    console.log("isAdmin  middleware error ",error.message)
    return res.status(500).json({
      success:false,
      message:'Somethin Went Wrong'
    })
  }
}

// check user is Multiroll or NOT
export const isMultiRoll = (req,res,next)=>{
  
  try{
    let payload = req.user;
    console.log(payload.role)
    if(payload.role!=='Seller' && payload.role!=='Buyer' && payload.role!=='Admin' ){
      return res.status(401).json({
        success:false,
        message:'Protected route for Authentic Admin'
      })
    }
    return next();

  }catch(error){
    console.log("isMultiRoll  middleware error ",error.message)
    return res.status(500).json({
      success:false,
      message:'Somethin Went Wrong'
    })
  }
}

export const isBuyerOrSelller = (req,res,next)=>{
  
  try{
    let payload = req.user;
 
    if(payload.role!=='Seller' && payload.role!=='Buyer'){
      return res.status(401).json({
        success:false,
        message:'Protected route for sellers or buyers'
      })
    }
    return next();

  }catch(error){
    console.log("isMultiRoll  middleware error ",error.message)
    return res.status(500).json({
      success:false,
      message:'Somethin Went Wrong'
    })
  }
}