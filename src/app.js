const express = require('express');
const cors = require('cors');
const bodyParser = rrequire('body-parser');
const {sequelize} = require('./models');
const config =require(',/config/config')

const app = express();
app.use(morgan('combined'));
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


