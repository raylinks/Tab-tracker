const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy= require('./policies/AuthenticationControllerPolicy');
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
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

   // app.get('/bookmarks/:bookmarkId',
   //     BookmarksController.delete)

   app.post('/histories',
       HistoriesController.post)

   app.get('/histories',
       HistoriesController.index)


}