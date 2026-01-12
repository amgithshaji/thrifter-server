// import express
const express = require('express')
const userController = require('../controller/userController')
const clothController = require('../controller/clothController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const storeController = require('../controller/storeController')
const cartController = require('../controller/cartController')
 

// create router object
const router = new express.Router()
// define path of client api request
// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.logincontroller)
// login
router.post('/google/sign-in',userController.googleLoginController)

//------------------- authorised user------------------------

// add cloth
router.post('/user/clothes/add',jwtMiddleware,multerMiddleware.array('uploadimages',7),clothController.addClothController)
// get all clothes
router.get('/clothes/all',jwtMiddleware,clothController.getUserAllClothController)
// view cloth
router.get('/cloth/:id/view',jwtMiddleware,clothController.viewClothController)
// add store
router.post('/user/store/add',jwtMiddleware,multerMiddleware.array('uploadimages',4),storeController.addStoreController)
// get store
router.get('/seller/:sellermail/details',jwtMiddleware,storeController.getStoreDetialsController)
// get store clothes
router.get('/seller/:sellermail/clothes',jwtMiddleware,storeController.getStoreClothesController)
// get store in cloth details
router.get('/clothdetails/:id/view',jwtMiddleware,clothController.clothdetailsViewcontroller)
// add to wishlist
router.post('/wishlist/add', jwtMiddleware,userController.addToWishlistController)
// get wishlist
router.get('/wishlist', jwtMiddleware, userController.getWishlistController)
// delete wishlist item
router.delete('/wishlist/:clothId/delete', jwtMiddleware,userController.removeFromWishlistController)
// add to cart
router.post('/cart/add', jwtMiddleware, cartController.addToCartController)
// get cart items
router.get('/cart', jwtMiddleware, cartController.getCartController)
// remove cart item
router.delete('/cart/:clothId/delete', jwtMiddleware, cartController.removeFromCartController)
// decrease cart item
router.put('/cart/decrease/:clothId', jwtMiddleware, cartController.decreaseCartQuantityController)
// update user profile
 router.put('/user/:id/edit',jwtMiddleware,userController.updateUserProfileController)
// get user upload cloth
router.get('/user-cloth/all',jwtMiddleware,clothController.getuserUploadprofileClothController)
// delete book
router.delete('/cloth/:id',jwtMiddleware,clothController.deleteClothController)


module.exports = router