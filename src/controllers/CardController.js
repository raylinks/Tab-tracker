const  {Card, Card_currency,Rate_variation} = require('../models')
const uuidv1 = require('uuid/v1');
const  multer = require('multer');
const fs = require('fs');
//const gcsUpload = require('../helpers/helpers')
const path = require('path');

const util = require('util')
const gc = require('../config/')
const bucket = gc.bucket('ray_image_bucket') // should be your bucket name




//Set Storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,  './uploads/');
    },
    filename: function (req,file,cb) {
        //cb(null, new Date().toISOString() + file.originalname);
        cb(null, new Date().getTime() + '-' + file.originalname);
        //cb(null,file.fieldname +  '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter  = (req, file, cb)=> {
    //reject a file
    if(file.mimetype  ===  'image/jpeg' || file.mimetype  ===  'image/png'){
        cb(null,true);
    }else{
        cb(null, false);
    }
};
//Init upload
const upload =  multer({
    storage:storage,
    limits: {
        fileSize:1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const gcsUpload = async function(file){
    try{
        console.log("hii man");
        const { originalname, buffer } = file
    
        const blob =  bucket.file(originalname.replace(/ /g, "_"))
        const blobStream = await  blob.createWriteStream({
          resumable: false
        })
        blobStream.on('finish', () => {
          const publicUrl =
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        //   res.status(200).json(publicUrl);
         // resolve(publicUrl)
        })
        .on('error', (err) => {
            console.log(err);
        //   reject(`Unable to upload image, something went wrong`)
        })
        .end(buffer)
    }catch(err){
        console.log(err);
    }
};


module.exports = {
    //upload images to goggle cloud storage
    async uploadImage(req,res,next){
        try {
            const myFile = req.file;
          //  console.log(myFile);
            const imageUrl = await gcsUpload(myFile)
            res
              .status(200)
              .json({
                message: "Picture Upload was successful",
                data: imageUrl
              })
          } catch (error) {2
            next(error)
          }
     },

    
     async create(req,res){
         try{
             console.log("baby");
           const myFile = req.file;
                console.log(myFile);
             const imageUrl = await gcsUpload(myFile)
            req.body['uuid'] = uuidv1();
           req.body['picture'] = myFile.originalname
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
            const card = await Card.findOne({  
                where:{
                        id:req.params.cardId,
                      }  
            });
           // console.log(card.uuid);
            const card_currency = await Card_currency.findOne({  
                where:{
                        id:req.params.currencyId,
                      }  
            });
           // console.log(card_currency);
            req.uuid =  uuidv1();
            req.body.CardId = card.id,
            req.body.CardCurrencyId = card_currency.id
            const rate_variation = await Rate_variation.create(req.body)
            res.status(200).json(rate_variation);

         }catch(err){
             console.log(err);
             res.status(500).json(err);
             
         }
     },




    


     async cardBuy(req,res){
         try{
            
         }catch(err){

         }
     },
    upload
   
}

