const {Comment} = require('../models/Comment')

module.exports ={



    async getComments(req,res){
        try{

        }catch(err){

        }
    },

    async postComment(req,res){

        try{
          //  console.log("i am here");
            let post_id = Post.findOne({  
                // include: [
                //     {
                //       model: Post,
                //       as: 'children'
                //     }
                // ]
                where:{
                        id:songId,
                     }  

            })
            const comment = await Comment.create(postId)
            res.status(200).json(comment);

        }catch(err){

        }
    }

}