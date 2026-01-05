// import express
const express = require('express')
const userController = require('../controller/userController')
const clothController = require('../controller/clothController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const storeController = require('../controller/storeController')

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


module.exports = router