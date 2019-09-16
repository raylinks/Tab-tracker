const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy= require('./policies/AuthenticationControllerPolicy');
module.exports = (app) => {
    app.post('/register', 
       AuthenticationController.regisster,
       AuthenticationControllerPolicy)

}