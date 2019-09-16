const {User} = require('../models')

module.exports ={
     async register(req, res) {
         try{
             const user = await User.Create(req.body);
             res.send(user.JSON())
         }catch(err){
                res.status(400).send({
                  error:'this email address is already in use'  
                })
         }
      
    }
}