const  { UserWallet}  = require('../models')
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
module.exports = {

    async debitUserWallet(req,res){
        const { amount} = req.body;

        var user = jwt.verify(req.headers.authorization, CONFIG.jwtSecret);
        const result  = user.id
    }
}