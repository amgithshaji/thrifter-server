// register api request
exports.registerController = async (req,res)=>{
    console.log("inside registerController");
    // res.status(200).json("request recevied")
       const  {username,email,password} = req.body
    console.log(username,email,password);
//  console.log(req.body);
 try {
    // check mail in the model
    
 } catch(error){
    console.log(error);
    res.status(500).json(error)
        
 }
}