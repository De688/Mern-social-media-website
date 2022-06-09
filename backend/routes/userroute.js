const router = require('express').Router()
const userModel = require('../schema/userSchema.js')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//validation using joi
// joi schema

const schema = Joi.object({
    name:Joi.string().min(4).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().required()
})

// register part 
router.post('/register',async(req,res)=>{
    //joi verification
    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const {name,email,password} = req.body

    //harsh user password
   const salt  =await bcrypt.genSalt(10)
   const hashedpassword = await bcrypt.hash(password, parseInt(salt))
   // pass the info to the new user including te hashed password
    const user = new userModel({
        name:name,
        email:email,
        password:hashedpassword,
        
    })
    //check if user arleady exist
    const userExist = await userModel.findOne({email:email})
    if(userExist) return res.status(404).send('user arleady exist!')

    try {
        await user.save()
        res.status(201).json({
            id:user._id,
            name:user.name,
            password:user.password,
            token:generateToken(user._id),
            created_at:user.date
        })
    } catch (error) {
        res.status(501).send('user not registered')
    }
})

// login part

//verification of log in info using joi

const loginschema = Joi.object({
    email:Joi.string().min(6).required().email(),
    password:Joi.string().required()
})


router.post('/login',async(req,res)=>{
   const {error} = loginschema.validate(req.body);
   if(error) return res.status(400).send(error.details[0].message);
    
   //get use from database
   const user =await userModel.findOne({email:req.body.email});

   //check if user exist using email
   if(!user) res.status(404).send('user does not exist!')

   //compare user 
   const validuser = await bcrypt.compare(req.body.password, user.password)
   if(!validuser) res.status(404).send('wrong infomation!');

   //return data with token after login 
   res.status(201).json({
    id:user._id,
    name:user.name,
    token:generateToken(user._id),
    created_at:user.date
   })
})


//update user
//verify updated data

const updateuserschema = Joi.object({
    name:Joi.string().min(4).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().required()
})

router.put('/update/:id',async(req,res)=>{
    const {error} = updateuserschema.validate(req.body)
    const user =await userModel.findById(req.params.id);
    if(!user) return res.status(404).send('user not found');
    try {
        updateduser = await userModel.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json(updateduser)
    } catch (error) {
        res.status(400).send('request failed!')
    }

})

// delete user

router.delete('/delete/:id', async(req,res)=>{
    const user =await userModel.findById(req.params.id);
    if(!user) return res.status(404).send('user not found!')

    await user.remove()
    res.status(200).json({id:req.params.id})
})

const generateToken = (userid)=>{
   return jwt.sign({_id:userid}, process.env.TOKEN_SECRET);
}

module.exports = router