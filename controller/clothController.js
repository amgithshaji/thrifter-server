const clothes = require('../models/clothModel')


// add clothes
exports.addClothController = async (req,res)=>{
console.log("inside addClothController ");
console.log(req.body);

const {clothname, price, clothcolor, productid, clothdetails, clothdescription, size, mainfabric, secondaryfabric, gender, category} = req.body
const uploadimages = req.files.map(item=>item.filename)
const sellermail = req.payload
console.log(clothname, price, clothcolor, productid, clothdetails, clothdescription, size, mainfabric, secondaryfabric, gender, category, uploadimages,sellermail);
// res.status(200).json("add cloth request recevied")
try {
    const existingCloth = await clothes.findOne({clothname,sellermail})
    if (existingCloth){
        res.status(401).json("uploaded cloth already exists or you already uploaded a cloth using this same name") 
    } else {
        const newCloth = await clothes.create({ clothname, price, clothcolor, productid, clothdetails, clothdescription, size, mainfabric, secondaryfabric, gender, category, uploadimages,sellermail
        })
        res.status(200).json(newCloth)
        
    }
    
} catch(error){
    console.log(error);
    res.status(500).json(error)
    
    
}

}

// get all clothes - user
 exports.getUserAllClothController = async (req,res)=>{
    console.log("inside getUserAllClothController");
    // get query from req
    const searchKey = req.query.search
    console.log(searchKey);
    

    // get login user mail from token
    const loginUsermail = req.payload

try {
    const allCloth = await clothes.find({sellermail:{$ne:loginUsermail},clothname:{$regex:searchKey,$options:'i'}})
    res.status(200).json(allCloth)
    
}catch(error){
    console.log(error);
    res.status(500).json(error)
}
}

// get cloth

exports.viewClothController = async (req,res)=>{
console.log("inside viewClothController ");
// get id from req
  const {id} = req.params
try {
const clothDetails = await clothes.findById({_id:id})
res.status(200).json(clothDetails)

    
} catch(error){
    console.log(error);
    res.status(500).json(error)   
}
}

// get cloth in cloth detials

exports.clothdetailsViewcontroller = async(req,res)=>{
    console.log("inside clothdetailsViewcontroller");
    // get id from req
  const {id} = req.params
  try{
    const clothDetailsView = await clothes.find({_id:{$ne:id}})
    res.status(200).json(clothDetailsView)

  }catch(error){
    console.log(error);
    res.status(500).json(error) 
  }
    
}

// get user uploaded cloth in the profile
exports.getuserUploadprofileClothController = async (req,res)=>{
console.log("getuserUploadprofileClothController");
// get login user mail from token
const loginUsermail = req.payload
  try {
    //get books from db that is uploaded just by this loginded user
    const UserCloth = await clothes.find({sellermail:loginUsermail})
    res.status(200).json(UserCloth) 
  } catch(error){
    console.log(error);
    res.status(500).json(error)  
  }

}

// delete user book 
exports.deleteClothController = async (req,res)=>{
  console.log("inside deleteClothController");
  // get _id of the book
  const{id} = req.params
  try {
    // get  books details from db
    const clothDetails = await clothes.findByIdAndDelete({_id:id})
  
    res.status(200).json(clothDetails)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
    
  }
}

// get my order in profile

exports.getMyOrderCloth = async (req,res)=>{
  console.log("inside getMyOrderCloth ");
  const loginUserMail = req.payload
  try {

    const myOrderClothes = await clothes.find({buyermail:loginUserMail})
    res.status(200).json(myOrderClothes)
    
  } catch(error){
    console.log(error);
    res.status(500).json(error)
    
  }
  

}

