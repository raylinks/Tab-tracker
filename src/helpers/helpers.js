
const util = require('util')
const gc = require('../config/')
const bucket = gc.bucket('ray_image_bucket') // should be your bucket name

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */


module.exports = {
    async gcsUpload(req,res, file){
        try{
            console.log("hii man");
            const { originalname, buffer } = file

            const blob =  bucket.file(originalname.replace(/ /g, "_"))
            const blobStream = await  blob.createWriteStream({
              resumable: false
            })
            blobStream.on('finish', () => {
              const publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
              )
              resolve(publicUrl)
            })
            .on('error', () => {
              reject(`Unable to upload image, something went wrong`)
            })
            .end(buffer)
        }catch(err){
            console.log(err);
        }
    }
}
//export const uploadImage = (file) => new Promise((resolve, reject) => {
// 
//})


module.exports = {
  async formatText(req,res, file){
      try{
        
      }catch(err){
          console.log(err);
      }
  }
}