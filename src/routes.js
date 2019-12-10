const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy= require('./policies/AuthenticationControllerPolicy');
const SongsController = require('./controllers/SongsController')
const PostController = require('./controllers/PostController')
const HistoriesController = require('./controllers/HistoriesController')


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


   // app.get('/bookmarks',
   //     BookmarksController.index)

   // app.post('/bookmarks',
   //     BookmarksController.post)

    app.post('/post',
        PostController.createPost)

   app.get('/post/:postId',
       PostController.show)

   app.get('/posts',
       PostController.getAll)


}