const {Bookmark,User, Song} = require('../models');

module.exports = {
    // async  index(req, res){
    //     try{
    //         const {songId, userId} = req.query
    //         const where = {
    //             UserId = userId
    //         }
    //         if (songId){
    //             where.SongId = songId
    //         }
    //         const bookmark = await Bookmark.findAll({
    //             where:where,
    //             include:[
    //                 {
    //                     model: Song
    //                 }
    //             ]
    //         }).map(bookmark => bookmark.JSON())
    //         .map(bookmark => _.extends(
    //             {}, bookmark.Song,
    //            //id: bookmark.id,
    //             bookmark
    //         ))
    //         res.send(bookmark)
    //     }catch(err){
    //         res.status(500).send({
    //             error:"an error occurred trying to get bookmarks"
    //         })
    //     }

    // },

    // async  post(req, res){
    //     try{
    //         const {songId, userId}=  req.body
    //         const bookmark = await Bookmark.findOne({
    //             where:{
    //                 SongId:songId,
    //                 UserId:userId
    //             }
    //         })

    //         if(bookmark){
    //             return res.status(400).send({
    //                 error:'You  already have this set of bookmark'
    //             })
    //         }
            
    //         const newBookmark = await Bookmark.create({
    //             SongId:songId,
    //             UserId:userId
    //         })
    //         res.send(newBookmark)
    //     }catch(err){
    //         res.status(500).send({
    //             error:"an error occurred trying to create bookmarks"
    //         })
    //     }

    // },

    // async  delete(req, res){
    //     try{
    //         const {bookmarkId} = req.params
    //         const bookmark =  await Bookmark.findById(bookmarkId)
    //         await bookmark.destroy();
    //         res.send(bookmark)
    //     }catch(err){
    //         res.status(500).send({
    //             error:"an error occurred trying to delete bookmark"
    //         })
    //     }

    // },
   
}