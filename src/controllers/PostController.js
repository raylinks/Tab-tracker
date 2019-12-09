const {Post} = require('../models');


module.exports = {
    async createPost(req,res){
        try{
            req.body['userId'] = token;
             const post = await Post.create(req.body);
             return res.status(200).json(post);

        }catch(err){
            res.status(400).send({
                error: "unable to create post"
            })
        }
    }

}