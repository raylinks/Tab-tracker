const {Token} = require('../models');
const CONFIG = require('../config/config');

module.exports ={
    async VerifyEmail(req, res){
        try{
            console.log("welcome");
            const VerifyToken = await Token.findOne({
                where: {userToken: req.body.token}
            })
            

        let timestamp = Date.now();
                if(!VerifyToken){
                    res.status(403).send('success:false', 'sorry, this token doesnt exist anymore ');
                   // console.log("doesnt exist");
                }
                const url = CONFIG.frontend + '\/welcome';
                   VerifyToken.userToken =  null
                   VerifyToken.save();
                   console.log("hallle");
                    verified_at = timestamp;
                    res.redirect(url);

        }catch(errors){
             console.log(errors);
        }
    },
} 
