//const {Flutterwave} = require('../services/Flutterwave');
const request = require('request');
const {Ref,Transaction,Deposit} = require('../models')
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
const uuidv1 = require('uuid/v1');
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
            
            var trans = voucher_codes.generate({
                prefix: "TR-",
                postfix: "-REF"
            });


            req.body['UserId'] = user.id,
            
            req.body['val'] = refs[0],
            req.body['reference_code'] = trans[0]
            var createRef = await Ref.create(req.body);
            
               // log to Transaction table
            req.body['uuid'] = uuidv1(),
            req.body['type'] = "deposit",
            req.body['status'] = "pending"
            var transaction = await Transaction.create(req.body);
          
            //log to Deposit table
            req.body['transaction_id'] = transaction.id,
            req.body['deposit_type'] ="flfutterwave", 
            req.body['status'] = "pending",
            req.body['reference_code'] = trans[0]
            var createDeposit = await Deposit.create(req.body);
            
            var deposit = await request.post('https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/hosted/pay',
            {
                json:{
                    amount  : "1000",
                    PBFPubKey : "FLWPUBK-ddd359cf80fcdae2a4271bf0ac231e5e-X",
                    txref :  trans[0],
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
