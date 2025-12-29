// import express
const express = require('express')
const userController = require('../controller/userController')


// create router object
const router = new express.Router()
// define path of client api request
// register
router.post('/register',userController.registerController)

module.exports = router