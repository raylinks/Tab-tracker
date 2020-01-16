const {User, Role, UserWallet} = require('../models');

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');


function jwtSignUser(user){
  const ONE_WEEK = 60* 60 *  24 * 7 
  return jwt.sign(user, process.env.SECRET_KEY ,{
    expiresIn: ONE_WEEK
  })
}


function creditReferalUser(req, res){
  const referUser = User.findOne({
    where:{
      refer_link:"qmiddn"
    }
  //   include:[
  //     {
  //         model: UserWallet
  //     }
  // ]
  }) 
console.log(referUser);
  // if(!referUser){
  //   res.status(201).json({
      
  //     message:"sorry this link does not exist"
  //    });
  // }else{
  //   console.log(referUser);
  // }
}

module.exports ={


    async  getlink_Userwallet(req,res){
      try{
        const referUser = await User.findOne({
          where:{
            refer_link:"qmiddn"
          },
          include:[
             {
                 model: UserWallet
             }
         ]
        }) 
    //  console.log(referUser.UserWallet.initial_amount);
        if(!referUser){
          res.status(400).json({
            message:"sorry this link does not exist"
           });
        }else{
          res.status(200).json({
          data:referUser.UserWallet.initial_amount,
          message:"this is your initial amount"

        })
         }
      }catch(err){
        console.log(err);

      }
    },


     async register(req, res) {
         try{
      
             const role =await Role.findOne({
               where:{
                 id: 1
               }
             })
          //  //   console.log(role);
          
             
           let token = Math.random().toString(36).substr(0,20);
           req.body['token'] = token;
           req.body['RoleId'] = role.id;
           req.body['refer_link'] = "ammddn";
             const user = await User.create(req.body);
             req.body['initial_amount'] = "300";
             req.body['actual_amount'] = "4000";
             req.body['UserId'] = "7";
             const user_wallet = await UserWallet.create(req.body);
            //console.log(user);
            // const userJson = user.toJSON()
           
            // res.send({
            //   user: userJson ,
            //   token1: jwtSignUser(userJson)
            //  });
            //  console.log(token1);
             return res.status(201).json({
               data:user,
               data1: user_wallet,
               message:"Registration is Successful"
              });
         }catch(err){
           console.log(err);
                //res.status(400).send({
                  //error:' this email address is already in use'  
          //  })
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
         console.log(token2);
        res.send({
          user: user ,
         token1:  token2
         });
     
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

    },


    async forgetPassword(req,res){
      try{
        const token = Math.random().toString(36).substr(0,20);
                console.log(token);
        const {email} = req.body
        let user = await User.findOne({
            where:{
              email:email
            }
        })


        user.password_token = token;
        user.save();

        if(!user){
          res.status(400).json({
            message:" this  email does not exist",

          });
        }else{
          const transporter = nodemailer.createTransport({
            service: "raybaba.org",
            auth:{
                user: 'support@raybaba.org',
                pass: "history99"
            }
        })
        const mailOptions = {
            from: 'raymond@gmail.com',
            to: user.email,
            subject: 'forget password token',
            html:'Click this link to reset your password <a href="http://localhost:8081 /resetpassword?token='+token+'">LINK</a>'
        }
        transporter.sendMail(mailOptions,(err,info)=>{
            console.log(err);
            console.log(info);
        })
        res.json({status:'updated',email:req.body.email})
    }
      }catch(err){
          console.log(err);
      }

    },


    async resetPassword(req,res){
      try{
        var user = jwt.verify(req.headers.authorization, CONFIG.jwtSecret);
        console.log(user);   
         
  
        if(req.body.password === req.body.confirm_password){
          bcrypt.hash(req.body.password, 10, (err, hash)=>{
              user.password = hash
              user.password_token = null
              user.save();
          })
        }else{
          res.json({status:'failed',email:req.body.email})
          }
                
      }catch(err){
        console.log(err);
      }
    }
}