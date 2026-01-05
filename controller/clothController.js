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

    // get login user mail from token
    const loginUsermail = req.payload

try {
    const allCloth = await clothes.find({sellermail:{$ne:loginUsermail}})
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

