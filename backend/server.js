const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoute = require('./routes/userroute.js')
const postRoute = require('./routes/postroute.js')
const articlesRoute = require('./routes/articles.js')
const bodyParser = require('body-parser');
const multer = require('multer')
const path =require('path')
require('dotenv').config()

const port = 5000


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
app = express()
app.use('/images', express.static(path.join(__dirname,"/images")))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({limit: '3mb',extended:true}));
app.use(bodyParser.urlencoded({limit: '3mb',extended:true}));




// multer image upload
 const storage = multer.diskStorage({
     destination:(req,file,cb)=>{
         cb(null,'images')
     },
     filename:(req,file,cb)=>{
         cb(null,req.body.name)
     }
 })

 
 const upload = multer({storage:storage})
 app.post('/api/upload',upload.single('file'),(req,res)=>{
     res.status(200).json('File has been uploaded!')
 })

//my routes

app.use('/api/user', userRoute)
app.use('/api/articles', articlesRoute)
app.listen(port, ()=>{
    console.log(`server start successfull on port ${port}`)
})




