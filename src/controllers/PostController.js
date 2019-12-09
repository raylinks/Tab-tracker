const {Post} = require('../models');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');


module.exports = {
    async createPost(req,res){
        try{
           var user = jwt.verify(req.headers.authorization, CONFIG.jwtSecret);
            req.body['UserId'] = user.id;
             const post = await Post.create(req.body);
             return res.status(200).json(post);
        }catch(err){
            console.log(err);
            res.status(400).send({
                error: "unable to create post"
            })
        }
    }

}