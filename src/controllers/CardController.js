const  {Card, Card_currency} = require('../models')
const uuidv1 = require('uuid/v1');
module.exports = {
     async create(req,res){
         try{
         req.body['uuid'] = uuidv1();
         const card =  await Card.create(req.body);
         res.status(200).json(card);
         }catch(err){
             console.log(err);
         }
     },


     async currency(req,res){
         try{
            const card = await Card.findOne({  
                where:{
                        id:req.body.card_id,
                      }  
            })
         
            req.body['uuid'] = uuidv1();
            req.body['CardId'] =  card.id;
            const currency = await Card_currency.create(req.body)
            res.status(200).json(currency);
           
         }catch(err){
             console.log(err);

         }
     },

     async getCardCurrency(req,res){
         try{

         }catch(err){

         }
     },

     async rateVariation(req,res){
         try{

         }catch(err){
             
         }
     }
   
}

