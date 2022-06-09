const router = require('express').Router()
const articlesModel = require('../schema/articleSchema.js')
const verified = require('../verifyuser/verifyuser.js')

// posting article functionalities
router.post('/sendarticle',async(req,res)=>{
    const {title,location,tags, description,articleImage,likecount} = req.body;
    const articles = new articlesModel({
        title,
        location,
        description,
        tags,
        articleImage,
        likecount
    })
    try {
        await articles.save()
        res.status(200).json(articles)
    } catch (error) {
        res.status(400).send(error)
    }
})
//get articles from database
router.get('/getarticles',verified,(req,res)=>{
    articlesModel.find({},(err,result)=>{
        if(err){
            res.status(400).json(err)
        }else {
            res.status(200).json(result)
        }
    })
})
//update articles from database
router.put('/updatearticle/:id', async(req,res)=>{
    const article = await articlesModel.findById(req.params.id)
    if(!article)return res.status(404).json('article not found')
    const updatedarticle = await articlesModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedarticle)
})
//delete article from database

router.delete('/delete/:id', async(req,res)=>{

    const user = await articlesModel.findById(req.params.id)
    if(!user){
        res.status(400)
        throw new Error('user not found')
    }
    await user.remove()
    res.status(200).json({id:req.params.id})
})
   
//like article
router.put('/like/:id',async(req,res)=>{
    const likedarticle = await articlesModel.findById(req.params.id)
    if(!likedarticle)return res.status(404).json('article not found')
    const likearticle = await articlesModel.findByIdAndUpdate(req.params.id,{likecount:likedarticle.likecount + 1},{new:true})
    res.status(200).json(likearticle)
})

module.exports = router;

