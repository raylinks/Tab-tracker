const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy= require('./policies/AuthenticationControllerPolicy');
const SongsController = require('./controllers/SongsController')
const PostController = require('./controllers/PostController')
const ServiceController = require('./controllers/ServiceController')
const CommentController = require('./controllers/CommentController')
const RoleController = require('./controllers/RoleController')


module.exports = (app) => {
    // app.post('/register', 
    //    AuthenticationController.register,
    //    AuthenticationControllerPolicy.register)

     app.post('/register', 
       AuthenticationController.register)

    app.post('/login', 
       AuthenticationController.login)

   app.get('/all/users',
      AuthenticationController.getUsers)

    app.get('/songs',
       SongsController.index)


    app.post('/songs',
       SongsController.post)
       
    app.get('/songs/:songId',
       SongsController.show)

    app.put('/songs/:songId',
       SongsController.put)

    app.post('/post',
        PostController.createPost)

   app.get('/post/:postId',
       PostController.show)


   app.get('/posts',
       PostController.getAll)

   app.post('/flutter', 
    ServiceController.getAccountName)

   app.post('/card/deposit',
      ServiceController.cardDeposit)

     // app.post('/trustpaybvn', upload.single('image'),
     app.post('/trustpaybvn',
      ServiceController.trustpayBvn)



      app.post('/post/:postId/comment', 
      CommentController.postComment)

      app.post('/role',
      RoleController.createRole)
}