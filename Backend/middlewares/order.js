import { Listing } from "../models/listing.js";

export const isOutOfStock = async (req, res, next) => {
  const { orderList } = req.body;
  const listingObj = await Listing.find({ _id: { $in: orderList.map(listing => listing.product) } }, { productName: true, stock: true })

  for (let i = 0; i < listingObj.length; i++) {
    const stock = listingObj[i].stock;
    const productName = listingObj[i].productName
    const quantity = orderList[i].quantity;

    if (stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `${productName} is out of stock`,
      })
    }

  }

  return next();
}