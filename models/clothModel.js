const mongoose = require('mongoose')

const clothSchema = new mongoose.Schema({

    clothname:{
        type:String,
        required:true
    },
      price:{
        type:Number,
        required:true
    }, 
      clothcolor:{
        type:String,
        required:true
    },
      productid:{
        type:Number,
        required:true
    },
      clothdetails:{
        type:String,
        required:true
    },
      clothdescription:{
        type:String,
        required:true
    },
      size:{
        type:String,
        required:true
    },
      mainfabric:{
        type:String,
        required:true
    },
      secondaryfabric:{
        type:String,
        required:true
    },
      gender:{
        type:String,
        required:true
    },
      category:{
        type:String,
        required:true
    },
      uploadimages:{
        type:Array,
        required:true
    },
      sellermail:{
        type:String,
        required:true
    },
      status:{
        type:String,
        default:'pending'
    },
      buyermail:{
        type:String,
        default:''
    },
})

const clothes=mongoose.model("clothes",clothSchema)
module.exports= clothes