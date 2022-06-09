
const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
       
    },
    location:{
        type:String,
       
    },
    description:{
        type:String,
       
    },
    tags:[String],
    articleImage:{
        type:String,
      
    },
    likecount:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default: new Date()
    }
})

const articlesModel = mongoose.model('newerfullpost', articleSchema)
module.exports = articlesModel;