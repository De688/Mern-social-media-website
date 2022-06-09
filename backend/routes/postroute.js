const router = require('express').Router()
const userModel = require('../schema/userSchema.js')
const verified = require('../verifyuser/verifyuser.js')

router.get('/post', verified ,(req,res)=>{
    userModel.find({},(err,result)=>{
        if(err){
            res.status(400).json(err)
        }else {
            res.status(200).json(result)
        }
    })
})

module.exports = router