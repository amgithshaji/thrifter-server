const users = require('../models/userModel')
const wishlists = require('../models/wishlistModel')
const jwt = require('jsonwebtoken')



// register api request
exports.registerController = async (req,res)=>{
    console.log("inside registerController");
    // res.status(200).json("request recevied")
       const  {username,email,password} = req.body
    console.log(username,email,password);
//  console.log(req.body);
 try {
      // check mail in model
        const existingUser = await users.findOne({email})
        if(existingUser){
                res.status(409).json("user already exist.... please login")
        }else{
            const newUser = new users({
            username,email,password

            })
            await newUser.save()
            res.status(200).json(newUser)
         }
 } catch(error){
    console.log(error);
    res.status(500).json(error)
        
 }
}

// login api
 exports.logincontroller = async (req,res)=>{
    console.log("inside loginController");
    const {email,password} = req.body
    console.log(email,password);
    try{
        // check mail in model
        const existingUser = await users.findOne({email})
        if (existingUser) {
            if(password == existingUser.password){
                const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.JWTSECRET)
           res.status(200).json({user:existingUser,token})
            }else{
                res.status(401).json("incorrect email / password")
            }
            
        }else{
            res.status(404).json("account doesnot exists!!")
        }

    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
    
 }


//  google login
 exports.googleLoginController = async (req,res)=>{
    console.log("inside googleLoginController");
    const {email,password,username} = req.body
    console.log(email,password,username);
    try{
        // check mail in model
        const existingUser = await users.findOne({email})
        if (existingUser) {
            //login
              const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.JWTSECRET)
           res.status(200).json({user:existingUser,token})
            
        }else{
            // register
            const newUser = await users.create({
                username,email,password
            })
           const token = jwt.sign({userMail:newUser.email,role:newUser.role},process.env.JWTSECRET)

           res.status(200).json({user:newUser,token})
        }

    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
    
 }

 
// get wishlist
exports.getWishlistController = async (req, res) => {
  console.log("inside getWishlistController");
  
      const userMail = req.payload
      console.log(userMail);
      
  try {

    const wishlistItems = await wishlists
      .find({ userMail })
      .populate("clothId")

    res.status(200).json(wishlistItems)

  } catch (error) {
    res.status(401).json(error)
    console.log(error);
    
  }
}

// add wishlist
exports.addToWishlistController = async (req, res) => {
  console.log(" inside addToWishlistController");
      const userMail = req.payload
      // console.log(userMail);
      
    const { clothId } = req.body

  
  try {

    // prevent duplicate wishlist items
    const exists = await wishlists.findOne({ userMail,clothId })
    if (exists) {
      return res.status(200).json("Product already in wishlist")
    }

    const newWishlist = new wishlists({
      userMail,
      clothId
    })

    await newWishlist.save()
    res.status(200).json("Product added to wishlist")

  } catch (error) {
    res.status(500).json(error)
  }
}

// remove wishlist
exports.removeFromWishlistController = async (req, res) => {
  console.log("inside removeFromWishlistController")

  const userMail = req.payload   
  const { clothId } = req.params



  try {
    const result = await wishlists.deleteOne({ userMail, clothId })

    if (result.deletedCount === 0) {
      return res.status(404).json("Item not found in wishlist")
    }

    res.status(200).json("Product removed from wishlist")
  } catch (error) {
    res.status(500).json(error)
  }
}
