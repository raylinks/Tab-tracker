const {Comment} = require('../models')
const {Post} = require('../models')
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

module.exports ={

    async getComments(req,res){
        try{

        }catch(err){

        }
    },

    async postComment(req,res){
        try{  
           const user = jwt.verify(req.headers.authorization, CONFIG.jwtSecret);
          // res.end(user);
                
        req.body['email'] = user.email;
            req.body['firstname'] = user.firstname;
            req.body['UserId'] = user.id
             const post =await Post.findOne({  
                where:{
                        id:req.params.postId,
                      }  
            })

            req.body['PostId'] = post.id 
            const comment = await Comment.create(req.body)
            res.status(200).json(comment);

        }catch(err){
          
        }
    }

}