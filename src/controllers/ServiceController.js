//const {Flutterwave} = require('../services/Flutterwave');
const request = require('request');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
var voucher_codes = require('voucher-code-generator');

module.exports={

    async getAccountName(req,res){
        try{
       var flu = await  request.post('https://api.ravepay.co/v2/gpx/transfers/beneficiaries/create',
        {
            json:{
            seckey : "FLWSECK-7c6ca1d3f84c9eda00b4bdb61bbb3de5-X",
            account_number : "0018833921",
            account_bank : "gtb"

        }},(err,res,body)=> {
            if(err){
                return console.log(err);
            }
            console.log(res);
        
        });
    }catch(err){
        console.log(err);

        }
    },

    async cardDeposit(req,res){
        try{
            var user = jwt.verify(req.headers.authorization, CONFIG.jwtSecret);
            var refs = voucher_codes.generate({
                length: 8,
            
            });

            //console.log(refs);
            req.body['UserId'] = user.id,
            req.body['val'] = refs
            var createRef = await Ref.create(req.body);
            console.log(createRef);
            var createRef = await Transaction.create(req.body);
            var createRef = await Deposit.create(req.body);
            var deposit = await request.post('https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/hosted/pay',
            {
                json:{
                    amount  : "1000",
                    PBFPubKey : "FLWPUBK-ddd359cf80fcdae2a4271bf0ac231e5e-X",
                    txref : "8u5yhjkhj",
                    redirect_url : "https://localhost:8080/redirect",
                    currency :'NGN',
                    meta : "87",
                    customer_email : "ghb@gmail.com",
                    customer_phone : "09099911111"
                }
            },(err,res,body)=>{    
          console.log(body.data.link); 
            });
        }catch(err){
            console.log(err);
        }
    },

    async verifyDeposit(){
        try{
            var verify = await request.post("https://api.ravepay.co//flwv3-pug/getpaidx/api/v2/verify")
        }catch(err){

        }
    },

    async trustpayBvn(req,res){
        try{
            var trustpay_bvn = await request.post('https://api.onepipe.io/v1/generic/transact',{
                json:{

                }
            }, (err, res,body)=>{
                console.log(res);
                
            });
        }catch(err){

        }
    }
}
