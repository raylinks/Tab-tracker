const {Token} = require('../models');
const {User} = require('../models');
const CONFIG = require('../config/config');

module.exports ={
    async VerifyEmail(req, res){
        try{
            console.log("welcome");
            const VerifyToken = await Token.findOne({
                where: {userToken: req.body.token},
                include:[
                    {
                        model: User
                    }
                ]
            });
            
           
       let timestamp = Date.now();
                if(!VerifyToken){
                    return res.status(404).send({error : 'sorry, this token doesnt exist anymore '});
                }
                const url = CONFIG.frontend + '\/welcome';
                 VerifyToken.userToken =  null
                 VerifyToken.User.update({
                    verified_at: timestamp
                  })
                   VerifyToken.save();
                   console.log(url);
                    res.redirect(url);

        }catch(errors){
             console.log(errors);
        }
    },
} 
