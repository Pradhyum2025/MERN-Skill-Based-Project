import { User } from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { SellerDetail } from "../models/sellerDetails.js";
import { Address } from "../models/address.js";

dotenv.config();


//signup --------------------- >>>>>>>>>>>>
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, contact, password } = req.body;

    let currUser = await User.findOne({ email });

    //check user exist
    if (currUser) {
      return res.status(405).json({
        success: false,
        message: 'User Already Exist! Please Login'
      })
    }

    //Secure password
    let hashPassword = '';
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      res.status(503).json({
        success: false,
        message: 'Failed to hash password'
      })
    }
    //create newUser 
    let userPayload = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      contact,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    })

    //save newUser
    currUser = await userPayload.save();

    //login newUser via send JWT token
    const payload = {
      id: currUser._id,
      email: currUser.email,
      role: currUser.accountType
    }

    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '6h'
    });

    currUser = currUser.toObject();
    currUser.token = token;
    currUser.password = undefined;
    currUser.listing = null;
    currUser.myOrders = null;
    currUser.sellerDetails = null;
    currUser.addresses = null;

    let options = {
      expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    }

    res.cookie('token', token, options).json({
      success: true,
      message: 'Signup seccussfully!',
      token,
      currUser
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'Internal server error!'
    })
  }
}

// login --------------------------->>
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let currUser = await User.findOne({ email });

    //check user exist
    if (!currUser) {
      return res.status(404).json({
        success: false,
        message: 'User Not Exist! Please Signup'
      })
    }

    // match password
    const hashPassword = currUser.password;

    try {
      let match = await bcrypt.compare(password, hashPassword);
      if (match) {

        //sign JWT token
        const payload = {
          id: currUser._id,
          email: currUser.email,
          role: currUser.accountType
        }
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '6h'
        })

        currUser = currUser.toObject();
        currUser.token = token;
        currUser.password = undefined;
        currUser.listing = null;
        currUser.myOrders = null;
        currUser.sellerDetails = null;
        currUser.addresses = null;

        let options = {
          expire: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true
        }

        return res.cookie('token', token, options).json({
          success: true,
          message: 'login seccussfully!',
          token,
          currUser
        })
      } else {
        return res.status(203).json({
          success: false,
          message: 'Incorrect Password!'
        })
      }

    } catch (err) {
      console.log(err.message)
      res.status(503).json({
        success: false,
        message: 'Failed to compare password!'
      })
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error!'
    })
  }
}

//get user
export const getUser = async (req, res) => {
  try {
    let currUser = await User.findById(req.user.id).populate('listing');
    return res.status(200).json({
      success: true,
      message: 'get user successfully',
      currUser
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}


//become a seller
export const becomeSeller = async (req, res) => {
  try {
    //and save it into currUser schema
    let { companyName, contact, alternateContact, about, state, city, postalCode, country, landMark, streetAddress } = req.body;

    if (!companyName || !contact || !about || !state || !city || !postalCode || !country || !landMark || !streetAddress) {

      return res.status(400).json({
        success: false,
        message: 'All feilds are reuire!'
      })

    }

    let currUser = await User.findById(req.user.id, { firstName: true, lastName: true,email:true })

    let contactList = [contact, alternateContact];

    let newSeller = new SellerDetail({ companyName, about, contact: contactList });


    newSeller = await newSeller.save();

    const addressPayload = {
      firstName: currUser.firstName,
      lastName: currUser.lastName,
      contact: contactList,
      state,
      city,
      postalCode,
      country,
      landMark,
      streetAddress
    }

    const currAddress = await Address.create(addressPayload);

    currUser.accountType = 'Seller'; //change role
    currUser.sellerDetails = newSeller._id;
    currUser.addresses = [currAddress._id];

    currUser = await currUser.save(); //save user
    
    //sign JWT token again because we can change role of the current user which use for next request for authorization
    const payload = {
      id: currUser._id,
      email: currUser.email,
      role: currUser.accountType
    }
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '6h'
    })

    currUser = currUser.toObject();
    currUser.token = token;
    currUser.password = undefined;
    currUser.listing = null;
    currUser.myOrders = null;
    currUser.sellerDetails = null;
    currUser.addresses = null;

    let options = {
      expire: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    }

    return res.cookie('token', token, options).json({
      success: true,
      message: 'Become a Seller Seccussfull!',
      token,
      currUser
    })

  } catch (err) {
    console.log("Seller Account Upgradation error", err.message)
    return res.status(500).json({
      success: false,
      message: 'Internal server error!'
    })
  }
}

