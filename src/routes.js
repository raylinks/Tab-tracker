const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy= require('./policies/AuthenticationControllerPolicy');
const SongsController = require('./controllers/SongsController')
const PostController = require('./controllers/PostController')
const ServiceController = require('./controllers/ServiceController')
const CommentController = require('./controllers/CommentController')
const RoleController = require('./controllers/RoleController')
const CardController = require('./controllers/CardController')
const  multer = require('multer');

module.exports = (app) => {
    // app.post('/register', 
    //    AuthenticationController.register,
    //    AuthenticationControllerPolicy.register)


    // AUTHENTICATION ROUTES HERE
     app.post('/register', 
       AuthenticationController.register)

    app.post('/login', 
       AuthenticationController.login)

   app.get('/all/users',
      AuthenticationController.getUsers)

      app.post('/forget/password', AuthenticationController.forgetPassword)

      app.get('/refering',AuthenticationController.getlink_Userwallet);
      //ENDS HERE


//  SONGS ROUTES HERE
    app.get('/songs',
       SongsController.index)

    app.post('/songs',
       SongsController.post)
       
    app.get('/songs/:songId',
       SongsController.show)

    app.put('/songs/:songId',
       SongsController.put)
//ENDS HERE

//POST ROUTES HERE
    app.post('/post',
        PostController.createPost)

   app.get('/post/:postId',
       PostController.show)


   app.get('/posts',
       PostController.getAll)

       app.get('/post/user/:userId',
       PostController.getPosyByUser)


       //SERVICE ROUTES HERE
   app.post('/flutter', 
    ServiceController.getAccountName) 

   app.post('/card/deposit',
      ServiceController.cardDeposit)

      app.post('/verify/deposit',
      ServiceController.verifyDeposit)

     // app.post('/trustpaybvn', upload.single('image'),
     app.post('/trustpaybvn',
      ServiceController.trustpayBvn)
//ENDS HERE


app.post('/role',
      RoleController.createRole)


//COMMENTS ROUTES HERE
      app.post('/post/:postId/comment', 
      CommentController.postComment)

      
// CARDS ROUTES HERE
      app.post('/card',CardController.upload.single('file'),
      CardController.create)
      
      app.post('/currency',
      CardController.currency)

      app.get('/currency/:',
      CardController.getCardCurrency)

      app.post('/upload', CardController.upload.single('file'),
      CardController.uploadImage)

      app.post('/rate/:cardId/variation/:currencyId',
      CardController.rateVariation)
}