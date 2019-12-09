const {Songs} = require('../models');

module.exports = {
    async  index(req, res){
        try{
            let songs =  null
            const search = req.query.search
            if(search){
             songs = await  Song.findAll({
                where:{
                    $or:[
                            'title', 'artist','genre', 'album'
                    ].map(key =>({
                        [key]:{
                            $like:`%${search}%`
                        }
                    }))
                }
            })
            }else{
                 songs = await  Song.findAll({
                    limits:10
                })
            }
            res.send(songs);
        }catch(err){
            res.status(500).send({
                error:"an error occurred trying to get songs"
            })
        }

    },

    async  show(req, res){
        try{
            const songs = await Songs.findOne({where: {id: req.params.songId}})
           
            res.send(songs);
        }catch(err){

            res.status(500).send({
                error:"an error occurred trying to get individual songs"
            });
        }
    },

    async  put(req, res){
        try{
            const songs = await  Songs.update(req.body, {
                where:{
                    id:req.params.songId
                }
            })
           
            res.send(req.body);
        }catch(err){
            res.status(500).send({
                error:"an error occurred trying to update the songs"
            })
        }
    },

    async  post(req, res){
        try{
            const song = await Songs.create(req.body)
            res.send(song);
        }catch(err){
            res.status(500).send({
                error:"an error occurred trying to create songs"
            })
        }
    }
}