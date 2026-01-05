 const stores = require('../models/storeModel')

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