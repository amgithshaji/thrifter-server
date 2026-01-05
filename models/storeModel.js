const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({

    storename:{
        type:String,
        required:true
    },
    storetagline:{
        type:String,
        required:true

    },
    storedetails:{
        type:String,
        required:true

    },
    storedescription:{
        type:String,
        required:true

    },

     ownermail:{
        type:String,
        required:true
       },

    uploadimages:{
        type:Array,
        required:true

    },

})

const stores = mongoose.model("stores",storeSchema)

module.exports = stores