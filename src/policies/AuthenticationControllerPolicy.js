const Joi = require('joi');

 module.exports = {
     register(req,res,next)  {
         const schema = {
             email: Joi.string().email(),
             password: Joi.string().regex(
                 new RegExp()
             ),
             

         }
         const {error, value} = Joi.validate(req.body, schema)

         if (error){
             switch(error.details[0].context.key){
                 case 'email':
                     res.status(400).send({
                         error: 'you must provide a valid email address'
                     })
                     break
                 case 'password':
                     res.status(400).send({
                         error:`the password provided does not match the following rules
                         <br>
                         it must ....`
                     })
                     break
                     default:
                     res.status(400).send({
                        error: 'Invalid registration INFO'
                    })
                 
             }
         }else{
            next();
         }
       
     }
     
 }