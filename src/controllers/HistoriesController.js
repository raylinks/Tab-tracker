const {Bookmark,User, Song} = require('../models');

module.exports = {
    async  index(req, res){
        try{
            const {userId} = req.query
            const histories = await History.findAll({
                where:{
                    UserId:userId
                },
                include:[
                    {
                        model: Song
                    }
                ]
            }).map(history => history.JSON())
            .map(history => _.extends(
                {}, history.Song,
               //id: bookmark.id,
                history
            ))
            res.send(histories)
        }catch(err){
            res.status(500).send({
                error:"an error occurred trying to get bookmarks"
            })
        }

    },

    async  post(req, res){
        try{
            const {songId, userId}=  req.body
            const history = await History.create({
                where:{
                    SongId:songId,
                    UserId:userId
                }
            })
               res.send(history)
        }catch(err){
            res.status(500).send({
                error:"an error occurred trying to create historys"
            })
        }

    },

    async  delete(req, res){
        try{
            const {bookmarkId} = req.params
            const bookmark =  await Bookmark.findById(bookmarkId)
            await bookmark.destroy();
            res.send(bookmark)
        }catch(err){
            res.status(500).send({
                error:"an error occurred trying to delete bookmark"
            })
        }

    },
   
}