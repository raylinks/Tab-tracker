const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const  pg = require('pg');
const morgan = require('morgan');
const { sequelize } = require('./models/index');
const config =require('./config/config')
const {check,validationResult}  = require('express-validator');
 
const app = express();
app.use(morgan('combined'));
//app.use(pg());
app.use(bodyParser.json());
app.use(cors());

app.get('status', (req,res)=>{
    res.send({
        message:'hello africa'
    });
    
});  


require('./routes')(app)
sequelize.sync()
    .then(() => {
        app.listen(config.port)
        console.log(` Server started at ${config.port}`)

    });


