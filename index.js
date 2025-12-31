require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/routing')
require('./config/db')

// create server using express
const thrifterserver = express()
// enbale cors in express server
thrifterserver.use(cors())
// add json parser to server
thrifterserver.use(express.json())
// create a port where server should listen in web
// use router in server
thrifterserver.use(router)
const PORT = 3000

// server listen to that port
thrifterserver.listen(PORT,()=>{
    console.log(" thrifter server started");
    
})

// resolve http get request to http://localhost:3000/ using server
thrifterserver.get('/',(req,res)=>{
res.status(200).send('<h1>thrifter server started...And waiting for client request</h1>')

})

