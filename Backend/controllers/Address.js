import { Address } from "../models/address.js";
import { User } from "../models/user.js";

export const getAddresses = async (req, res) => {
  try {
    const userId = req.user.id;

    const currUser = await User.findById(userId)
    const allAddress  = await Address.find({_id:{$in:currUser.addresses}})

    return res.status(200).json({
      success: true,
      message: 'fetch addresses Successfully!',
      Addresses:allAddress
    })
  } catch (error) {
    console.log("fetch addresses error : ", error.message)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!'
    })
  }
}

export const createNewAddress = async (req, res) => {
  try {

    let {lastName , firstName , contact, alternateContact, state, city, postalCode, country, landMark, streetAddress } = req.body;

    if (!lastName || !firstName || !contact || !alternateContact || !state || !city || !postalCode || !country || !landMark || !streetAddress) {

      return res.status(400).json({
        success: false,
        message: 'All feilds are reuire!'
      })

    }
    let currUser = await User.findById(req.user.id, { addresses: true });
     
    if(currUser.addresses.length>=3){
      return res.status(400).json({
        success: false,
        message: 'Maximum 3 address allowed'
      })
    }

    await Address.updateMany({ _id: { $in: currUser.addresses } }, { isDefault: false })

    // Create Address paload 
    let contactList = [contact, alternateContact];
    const addressPayload = {
      firstName,
      lastName,
      contact: contactList,
      state,
      city,
      postalCode,
      country,
      landMark,
      streetAddress,
      isDefault: true
    }



    const currAddress = await Address.create(addressPayload);

    currUser = await User.findByIdAndUpdate(req.user.id, {
      $push: {
        addresses: [currAddress._id]
      }
    })


    return res.status(200).json({
      success: true,
      message: 'Addresses saved Successfully!',
      address:currAddress
    })

  } catch (error) {
    console.log("Addresses creation error : ", error.message)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!'
    })
  }
}

export const setDefaultAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const userId = req.user.id;

    if(!addressId || !userId ){
      return res.status(400).json({
        success: false,
        message: 'All feilds are reuire!'
      })
    }
    

    const currUser = await User.findById(userId,{addresses:true})

    await Address.updateMany({_id:{$in:currUser.addresses}},{isDefault:false})

    await Address.findByIdAndUpdate(addressId,{isDefault:true})


    return res.status(200).json({
      success: true,
      message: 'Addresses set default Successfully!',

    })

  } catch (error) {
    console.log("Addresses set default error : ", error.message)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!'
    })
  }
}