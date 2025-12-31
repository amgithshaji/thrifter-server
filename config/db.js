const mongoose = require('mongoose')
// get 
const connectionString = process.env.ATLASDBCONNECTION

mongoose.connect(connectionString).then(res=>{
    console.log("mongoDB connection successfull");
    
}).catch(err=>{
    console.log("database connection failed");
    console.log(err);
    
    
})