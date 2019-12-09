const {User} = require('../models');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

function jwtSignUser(user){
  const ONE_WEEK = 60* 60 *  24 * 7 
  return jwt.sign(user, process.env.SECRET_KEY ,{
    expiresIn: ONE_WEEK
  })
}

module.exports ={
     async register(req, res) {
         try{
             
           let token = Math.random().toString(36).substr(0,20);
           req.body['token'] = token;
             const user = await User.create(req.body);
            console.log(user);
            // const userJson = user.toJSON()
           
            // res.send({
            //   user: userJson ,
            //   token1: jwtSignUser(userJson)
            //  });
            //  console.log(token1);
             return res.status(201).json(user);
         }catch(err){
                res.status(400).send({
                  error:' this email address is already in use'  
            })
         }
    },

    async sendConfirmMail(req,res){
      var transporter = nodemailer.createTransport({ 
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: { 
            user: '9c301e9bfbf54e', 
            pass: '	1e1b635adb4ee8'
                   } 
        });
        const mailOptions = { 
      from: 'no-reply@yourwebapplication.com', 
      to: newUser.email, 
      subject: 'Account Verification Token', 
    text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user' + '\/confirmation\/' + token.token + '.\n' };
    transporter.sendMail(mailOptions, function (err) { 
        if(err){
            return res.status(500).json({ 
                msg: err.message 
            });
        }else{
            res.status(200).json('A verification email has been sent to ' + newUser.email + '.');
        }
        }); // transporter.sendMail ends
    },

    async login(req, res) {
           
      try{
       // console.log(config.authentication.jwtSecret);
        const {email, password}=  req.body;

          const user = await User.findOne({
            where: {
              email: email
            }
          })
        res.json(user);
          if (user){
           
          
            const isPasswordValid = await user.comparePassword(password)
           // console.log( isPasswordValid);
            if (!isPasswordValid){
            
              return res.status(403).send({
                error:'ha the login information was incorrect'
              })
            }
          }
           //  const userJson = user.toJSON()
             const token2 = jwt.sign(user.toJSON(), CONFIG.jwtSecret,{
              expiresIn:"1h"
          });
        //  console.log(token2);
        // res.send({
        //   //user: userJson ,
        //  token1:  token2
        //  });
     
     res.end({
          message: 'Auth Successful',
          //token: token2,
          //user: user
      });

      }catch(err){
        console.log(err);
             res.status(500).send({
               error:'An error has occured trying to login'   
             })
      }
   
    },

    async getUsers(req,res){
      try{
        const getUsers = await User.findAll()
        //console.log(getUsers);

        res.status(200).json(getUsers);

      }catch(err){

      }

    }
}