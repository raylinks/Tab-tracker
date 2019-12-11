const request = require('request');

module.exports = {


    async getAccountName(req,res){
        try{
            request('https://api.ravepay.co/v2/gpx/transfers/beneficiaries/create', {json:true},(err,res,body)=> {
                if(err){
                    return console.log(err);
                }
                console.log(body.url);
                console.log(body.explanation);
            });
        }catch(err){
            console.log(err);

        }
    }
}