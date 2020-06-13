const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
//const  pg = require('pg');
const morgan = require('morgan');
const { sequelize } = require('./models/index');
const config =require('./config/config')
const {check,validationResult}  = require('express-validator');

 const formatMessage = require('./utils/message')
  const {userJoin, getCurrentUser , userLeaves, getRoomUsers} = require('./utils/users')
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botname = 'Chat';

app.use(morgan('combined'));
//app.use(pg());
app.use(bodyParser.json());
app.use(cors());

io.on('connection', socket =>{
    socket.on('joinRoom', ({ username , room }) => {
        const user = userJoin(socket.id, username , room );
        socket.join(user.room);


    //welcome current  user
    socket.emit('messae', formatMessage( botname , 'Welcome on board'));

    // broadcast when a new user joins
    socket.broadcast.to(user.room).emit('messae',  formatMessage( botname, `${user.username} has joined the chat`));

    //send user room info
    io.to(user.room).emit('roomUsers', {
        room :user.room,
        users: getRoomUsers(user.room)
    });

    });



    //lisen for chat messa
    socket.on('chatMessage' , msg => {
        const user = getCurrentUser(socket.id);
         io.to(user.room).emit('message' , formatMessage( user.username ,msg));
    });


    //runs when client  disconnect
    socket.on('disconnect', () => {
        const user = userLeaves(socket.id)
        if(user){
            io.to(user.room).emit('message' ,  formatMessage( botname, `${user.username} has left chat`));

            //send users room info
            io.to(user.room).emit('roomUsers', {
                room :user.room,
                users: getRoomUsers(user.room)
            });
        }
        

    });

});

app.get('status', (req,res)=>{
    res.send({
        message:'hello africa'
    });
    
});  


require('./routes')(app)
sequelize.sync()
    .then(() => {
        server.listen(config.port)
        console.log(` Server started at ${config.port}`)

    });


