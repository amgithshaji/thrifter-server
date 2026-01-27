const clothes = require('../models/clothModel')
const stripe = require('stripe')(process.env.STRIPESECRET);
const cart = require('../models/cartModel')



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
    const allCloth = await clothes.find({sellermail:{$ne:loginUsermail},buyermail: { $ne: loginUsermail },clothname:{$regex:searchKey,$options:'i'}})
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
  const loginUserMail = req.payload   
  try{
    const clothDetailsView = await clothes.find({_id:{$ne:id}, buyermail: { $ne: loginUserMail },sellermail: { $ne: loginUserMail }})
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

// get all clothes - admin
 exports.getAllClothController = async (req,res)=>{
    console.log("inside getAllClothController");
  

try {
    const allCloth = await clothes.find()
    res.status(200).json(allCloth)
    
}catch(error){
    console.log(error);
    res.status(500).json(error)
}
}

// update book status  - admin: login user

exports.updateClothStatusBooksController = async (req,res)=>{
  console.log("inside updateClothStatusBooksController");
  // get _id of the book
  const{id} = req.params
  try {
    // get  clothes details from db
    const clothDetails = await clothes.findById({_id:id})
    clothDetails.status = "approved"
    // save changes to mongodb
    await clothDetails.save()
    res.status(200).json(clothDetails)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
    
  }
}

// payment 
// exports.clothPaymentController= async (req,res)=>{
//   console.log("inside clothPaymentController");
// // const {title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category,_id,uploadImages,sellerMail} = req.body
// const email = req.payload
// const {id} = req.params
// try {
// const clothDetails = await clothes.findById({_id:id})
// clothDetails.status = "sold"
// clothDetails.buyermail = email
// await clothDetails.save()
// const {clothname,price,clothcolor,productid,clothdetails,clothdescription,size,mainfabric,secondaryfabric,gender,category,_id,buyermail,uploadimages,} = clothDetails
// // checkout secssion
//   const line_items = [{
//     price_data:{
//       currency:'usd',
//       product_data:{
//         name: clothname,
//         description:`${productid} | ${clothdetails} `,
//         images:uploadimages,
//         metadata:{
//           clothname,productid,clothcolor,price,uploadimages
//         }
//       },
//       unit_amount:Math.round(price*100)

//     },
//     quantity:1
//   }]
//   const session = await stripe.checkout.sessions.create({
//   line_items,
//   mode: 'payment',
//   success_url: 'http://localhost:5173/user/payment-success',
//   cancel_url:'http://localhost:5173/user/payment-failed',
//   payment_method_types:["card"]
// });
// console.log(session);
// res.status(200).json({checkoutURL:session.url})


// } catch(error){
//   console.log(error);
//   res.status(500).json(error)
  
  
// }
// }




exports.cartCheckoutController = async (req, res) => {
  console.log("inside cartCheckoutController")

const userEmail = req.payload

  try {
    // 1️⃣ get cart items
const cartItems = await cart.find({ userMail: userEmail }).populate("clothId")

    if (!cartItems.length) {
  return res.status(400).json("Cart is empty")
}


    // 2️⃣ mark clothes as sold
    for (let item of cartItems) {
      await clothes.findByIdAndUpdate(
        item.clothId._id,
        {
          // status: "sold",
          buyermail: userEmail
        }
      )
    }

    // 3️⃣ build stripe line items
    const line_items = cartItems.map(item => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.clothId.clothname,
          description: `${item.clothId.size} | ${item.clothId.clothcolor}`,
          images: item.clothId.uploadimages?.length
            ? item.clothId.uploadimages.map(
                img => `http://localhost:3000/uploads/${img}`
              )
            : []
        },
        unit_amount: Math.round(item.clothId.price * 100)
      },
      quantity: item.quantity
    }))

    // 4️⃣ create stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: "http://localhost:5173/user/payment-success",
      cancel_url: "http://localhost:5173/user/payment-failed"
    })

    // 5️⃣ clear cart
await cart.deleteMany({ userMail: userEmail })

    // 6️⃣ send checkout url
    res.status(200).json({ checkoutURL: session.url })

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


// Get total clothes count
exports.getTotalClothesController = async (req, res) => {
  console.log("inside getTotalClothesController ");
  
  try {
    const totalClothes = await clothes.countDocuments();
    res.status(200).json(totalClothes);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


// get last added 4 clothes
exports.getLatestClothesController = async (req, res) => {
  console.log("inside getLatestClothesController");

  try {
    const latestClothes = await clothes.find().sort({ createdAt: -1 }).limit(4);

    res.status(200).json(latestClothes);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
