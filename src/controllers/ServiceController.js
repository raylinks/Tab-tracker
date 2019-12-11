//const {Flutterwave} = require('../services/Flutterwave');
const request = require('request');

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
            var deposit = await request.post('https://api.ravepay.co/v2/flwv3-pug/getpaidx/api/v2/hosted/pay',
            {
                json:{
                    amount  : "1000",
                    PBFPubKey : "FLWPUBK-c0e49026605f0a79006796e3dd68ff79-X",
                    txref : "8uyhjkhj",
                    redirect_url : "iuhgbji",
                    currency :'NGN',
                    meta : "87",
                    customer_email : "ghb@gmail.com",
                    customer_phone : "09099911111"
                }
            }, (err,res,body)=>{
                console.log(res);
            });

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
