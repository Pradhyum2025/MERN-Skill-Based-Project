import { User } from "../models/user.js";


// ----------------- get My bag items cart handler ----------------
export const getMyBag = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Userid not found!'
      })
    }

    let currUser = await User.findById(userId,{new:true}).populate('bag');
    
    if(!currUser){
      return res.status(400).json({
        success: false,
        message: 'User not found! Please try again'
      })
    }

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Add successfully into your bag',
      bag:currUser?.bag
    })

  } catch (error) {
    onsole.log('Integrnal server error in login:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error to get bag courses ,Try again',
    })
  }
}

// ----------------- add to cart handler ----------------
export const addToBag = async (req, res) => {
  try {

    const { courseId } = req.params;
    const userId = req.user.id;

    if (!courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'CourseId or userId not found!'
      })
    }

    let currUser = await User.findById(userId);
    
    if(!currUser){
      return res.status(400).json({
        success: false,
        message: 'User not found! Please try again'
      })
    }

    currUser = await User.findByIdAndUpdate(
      {_id:userId},{
      $push:{
        bag:{$each : [courseId] , $position:0}
      }
    });

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Add successfully into your bag',
    })

  } catch (error) {
    onsole.log('Integrnal server error in login:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error!Try again',
    })
  }
}

// ----------------- Remove to cart handler ----------------
export const removeToBag = async (req, res) => {
  try {

    const { courseId } = req.params;
    const userId = req.user.id;

    if (!courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'CourseId or userId not found!'
      })
    }

    let currUser = await User.findById(userId);
    
    if(!currUser){
      return res.status(400).json({
        success: false,
        message: 'User not found! Please try again'
      })
    }

    currUser = await User.findByIdAndUpdate(
      {_id:userId},
      {
      $pull:{ bag:courseId}
      }
      ,{new:true}).populate('bag');

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Remove successfully into your bag',
    })

  } catch (error) {
    onsole.log('Integrnal server error in login:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error!Try again',
    })
  }
}
