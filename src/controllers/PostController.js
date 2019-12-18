const {Post} = require('../models');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');


module.exports = {
    async createPost(req,res){
        try{
           var user = jwt.verify(req.headers.authorization, CONFIG.jwtSecret);
           console.log(user);   
            req.body['UserId'] = user.id;
             const post = await Post.create(req.body);
             return res.status(200).json(post);
        }catch(err){
            console.log(err);
            res.status(400).send({
                error: "unable to create post"
            })
        }
    },

    async show(req,res){
        try{
            var post  =  await Post.findOne({
                where: {id: req.params.postId}
            })
            
            res.status(200).json(post);
        }catch(err){
            res.status(400).send({
                error:"unable to find the post"
            })
        }
    },

    async getAll(req,res){
        try{
            const posts = await Post.findAll()
            res.status(200).json(posts);

        }catch(err){

        }
    },

    async getPosyByUser(req,res){
        try{
            const userPost = await Post.findOne({
                where:{
                    UserId: req.params.userId
                }
               
            })
            res.status(200).json(userPost)
        }catch(err){}

    },


    async uploadImage(req,res){
        try{
           await cloudinary.uploader.upload(req.body.image, function(result) {
                var image = req.body.image;
                image = result.secure_url;
                req.body['image'] = timage;
                const product = Post.create();
                res.status(200).json(product);
            });
        }catch(err){

        }
    }
}

