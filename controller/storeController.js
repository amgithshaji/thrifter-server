 const stores = require('../models/storeModel')
 const clothes = require('../models/clothModel')
 

// add store
exports.addStoreController = async (req,res)=>{
console.log("inside addStoreController");
console.log(req.body);
const{storename,storetagline,storedetails,storedescription}=req.body

const uploadimages = req.files.map(item=>item.filename)
const ownermail = req.payload
console.log(storename,storetagline,storedetails,storedescription,uploadimages,ownermail);

try {
    const existingstore = await stores.findOne({ownermail})
if (existingstore) {
            res.status(401).json("you already created a store") 
}else{

const newStore = await stores.create({storename,storetagline,storedetails,storedescription,uploadimages,ownermail})
res.status(200).json(newStore)
}

} catch(error){
    console.log(error);
    res.status(500).json(error)
    
}
}


// get store

exports.getStoreDetialsController = async (req,res)=>{
    console.log("inside getStoreDetialsController ");
    //    get seller from req
    const {sellermail} = req.params
    const storedetails = await stores.findOne({ownermail:sellermail})
    res.status(200).json(storedetails)
    try {
        
    } catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

// get store clothes

exports.getStoreClothesController = async (req,res)=>{
    console.log("inside getStoreClothesController ");
    //    get seller from req
    const {sellermail} = req.params
    const storeclothes = await clothes.find({sellermail:sellermail})
    res.status(200).json(storeclothes)
    try {
        
    } catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}


// get all store - admin
 exports.getAllStoreController = async (req,res)=>{
    console.log("inside getAllStoreController");
  

try {
    const allStore = await stores.find()
    res.status(200).json(allStore)
    
}catch(error){
    console.log(error);
    res.status(500).json(error)
}
}

// Get total stores count
exports.getTotalStoresController = async (req, res) => {
  console.log("inside getTotalStoresController ");
  
  try {
    const totalStores = await stores.countDocuments();
    res.status(200).json(totalStores);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


// get last added 4 clothes
exports.getLatestStoresController = async (req, res) => {
  console.log("inside getLatestStoresController");

  try {
    const latestStores = await stores.find().sort({ createdAt: -1 }).limit(3);

    res.status(200).json(latestStores);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};