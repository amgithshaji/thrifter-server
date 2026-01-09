const carts = require('../models/cartModel')

// add cart
exports.addToCartController = async (req, res) => {
  console.log("inside addToCartController")

  const userMail = req.payload
  const { clothId } = req.body

  try {
    // check if item already exists in cart
    const existingItem = await carts.findOne({ userMail, clothId })

    if (existingItem) {
      existingItem.quantity += 1
      await existingItem.save()
      return res.status(200).json(existingItem)
    }

    // if not exists, add new
    const newCartItem = new carts({
      userMail,
      clothId,
      quantity: 1
    })

    await newCartItem.save()
    res.status(200).json(newCartItem)

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// get cart
exports.getCartController = async (req, res) => {
  console.log("inside getCartController")

  const userMail = req.payload

  try {
    const cartItems = await carts
      .find({ userMail })
      .populate("clothId")

    res.status(200).json(cartItems)

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// remove cart
exports.removeFromCartController = async (req, res) => {
  console.log("inside removeFromCartController")

  const userMail = req.payload
  const { clothId } = req.params

  try {
    const result = await carts.deleteOne({ userMail, clothId })

    if (result.deletedCount === 0) {
      return res.status(404).json("Item not found in cart")
    }

    res.status(200).json("Item removed from cart")

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


// DECREASE CART QUANTITY
exports.decreaseCartQuantityController = async (req, res) => {
    console.log("inside decreaseCartQuantityController");
    
  const userMail = req.payload
  const { clothId } = req.params

  try {
    const cartItem = await carts.findOne({ userMail, clothId })

    if (!cartItem) {
      return res.status(404).json("Item not found")
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1
      await cartItem.save()
      res.status(200).json(cartItem)
    } else {
      await carts.deleteOne({ userMail, clothId })
      res.status(200).json("Item removed")
    }

  } catch (err) {
    res.status(500).json(err)
  }
}
