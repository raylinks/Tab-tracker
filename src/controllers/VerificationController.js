const {Token} = require('../models');

module.exports ={
    async VerifyEmail(req, res){
        try{
            console.log("welcome");
            const VerifyToken = await Token.findOne({
                where: {userToken: req.params.token}
            })
            
console.log(VerifyToken);
        let timestamp = Dae.now();
                if(!VerifyToken){
                    res.status(403).send('success:false', 'sorry, this token doesnt exist anymore ');
                }
                const url = config('CONFIG.frontend') + '\/welcome';
                   VerifyToken.userToken = null;
                    verified_at = timestamp;
                    res.redirect(url);

        }catch(errors){
             console.log(errors);
        }
    },
}