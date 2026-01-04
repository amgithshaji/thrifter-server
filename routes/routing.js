// import express
const express = require('express')
const userController = require('../controller/userController')
const clothController = require('../controller/clothController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')


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

// add book
router.post('/user/clothes/add',jwtMiddleware,multerMiddleware.array('uploadimages',7),clothController.addClothController)
// get all books
router.get('/clothes/all',jwtMiddleware,clothController.getUserAllClothController)
// view cloth
router.get('/cloth/:id/view',jwtMiddleware,clothController.viewClothController)




module.exports = router