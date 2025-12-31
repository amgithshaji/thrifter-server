const users = require('../models/userModel')
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


 