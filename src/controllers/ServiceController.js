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
            req.body['reference_code'] = trans[0],
            req.body['amount'] = req.body.amount,
            req.body['status'] = req.body.status
            var createRef = await Ref.create(req.body);
            
               // log to Transaction table
            req.body['uuid'] = uuidv1(),
            req.body['type'] = "deposit",
            req.body['status'] = "pending"
            var transaction = await Transaction.create(req.body);
          
            //log to Deposit table
            req.body['transaction_id'] = transaction.id,
            req.body['deposit_type'] ="paystack", 
            req.body['status'] = "processing",
            req.body['reference_code'] = trans[0]
            var createDeposit = await Deposit.create(req.body);
            
            var deposit = await request.post('https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/hosted/pay',
            {
                json:{
                    amount:"3100",
                    PBFPubKey : "FLWPUBK_TEST-23fe61f1d8b320ff104a0ea53568c053-X",
                    txref :  refs[0],
                    redirect_url : "https://localhost:8080/redirect",
                    currency :'NGN',
                    meta : "87",
                    customer_email : "ghb@gmail.com",
                    customer_phone : "09099911111"
                }
            },(err,res,body)=>{   
                 
                //res.status(200);
         console.log(body.data.link); 
            });
        }catch(err){
            console.log(err);
        }
    },

    async verifyDeposit(req,res){
        try{
         // console.log('man');
            var userRef = await Ref.findOne({
                limit: 1,
                where:{
                    val:req.body.txref
                }
            })
            console.log(userRef.id);
           
            if(userRef.status  == 0)
                var ref = userRef.val;
                var stat = 'error';
                var amount = userRef.amount;
                var currency = 'NGN';
                console.log(ref);
                 var verify = await request.post("https://api.ravepay.co//flwv3-pug/getpaidx/api/v2/verify",
                {
                json:{
                    'SECKEY': "FLWSECK_TEST-074b99cd4b3e6a383693e8f47e8a293e-X",
                    'txref' : ref,
                },
                
             //  verify2()

                //if(verify == 400)
                //   var callback = rr;
                    //return redirect()->away($callback);
                
                
            },
            (err,res,body)=>{    
console.log(body);
            }); 
        }catch(err){
            console.log(err);

        }
    },

    async verify2(req,res){
        console.log("love");
        try{
            var ck = req.body.callback;
            var sta = 'success'
            if(verify.status  == 400)
            var callback = base64_decode(ck) + '?deposit-status=' + sta;
            //return redirect()->away($callback);

            else{
                var txref = verify['data']['data']['txref'];
                var flwref = verify['data']['data']['flwref'];
                var userRef = await Ref.findOne({
                    where:{
                        limit:1 ,
                        val: txref
                    }
                });      
                var paymentStatus = verify['data']['status'];
                var chargeResponsecode = verify['data']['data']['chargecode'];
                var chargeAmount = verify['data']['data']['amount'];
                var chargeCurrency = verify['data']['data']['currency'];

            }

        }catch(err){
            console.log(err);
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
