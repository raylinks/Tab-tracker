const {Role} = require('../models')


module.exports = {
    async createRole(req,res){
        try{
            const role = await Role.create(req.body)
            console.log(role);
            res.status(200).json(role);
        }catch(err){
            console.log(err);
        }
    },


    async getRoles(req,res){
        try{
            const roles = await Role.findAll()
            res.status(200).json(roles);
        }catch(err){
            console.log(err);
        }
    }

    
}